<template>
  <div class="content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="createTime" label="日期" />
      <el-table-column fixed prop="pay" label="花费" />
      <el-table-column fixed label="状态">
        <template #default="scope">
          <med-record-status :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="showDetail(scope.$index, scope.row)"
          >
            详情
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="cancel(scope.$index, scope.row)"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer v-model="drawer" title="详情信息" size="700">
      <div class="pay">本次花费：￥{{ tableData[current].pay }}</div>
      <div class="status">
        <span>状态：</span>
        <MedRecordStatus :status="tableData[current].status" />
      </div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>体检项目清单</span>
            <span>
              <el-button @click="showReport(tableData[current])">体检报告</el-button>
              <el-button @click="showInvoices(tableData[current])">收费单据</el-button>
            </span>
          </div>
        </template>
        <med-record-detail v-for="o in list" :o="o"></med-record-detail>
      </el-card>
    </el-drawer>
  </div>

  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { user_getUserLogs, cancelBook } from '../../http/api/sp'

import MedRecordDetail from '@renderer/components/MedRecordDetail.vue'
import MedRecordStatus from '@renderer/components/MedRecordStatus.vue'
import { preview } from 'vue3-image-preview';

onMounted(async () => {
  tableData.value = await user_getUserLogs(localStorage.getItem('userId'))
})

const tableData = ref([])
const drawer = ref(false)
const current = ref(-1)
const list = ref([])

function showDetail(index) {
  current.value = index
  list.value = tableData.value[index].records
  drawer.value = true
}

async function cancel(index, row) {
  await ElMessageBox.confirm('确认要取消吗？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  // 判断是否可以取消
  for (let i = 0; i < list.value.length; i++) {
    if (list.value[i].status !== 0) {
      can = false;
      ElMessage.info("体检已经开始，无法取消");
      return;
    }
  }

  try {
    await cancelBook(row.id)
    tableData.value[index].status = 2
    tableData.value[index].records.forEach((item) => (item.status = 2))
    ElMessage.success('取消成功')
  } catch {
    ElMessage.error('服务器错误')
  }
}

const imageUrl = ref('');
const showReport = (value) => {
  if(value.status === 0) {
    ElMessage.info("体检还未开始，无法查看报告")
    return;
  }
  if(value.status === 2) {
    ElMessage.info("体检已取消，无法查看报告")
    return;
  }
}

const canvas = ref(null);
const showInvoices = async (value) => {
  // if(value.status === 0) {
  //   ElMessage.info("体检还未开始，无法查看收费单")
  //   return;
  // }
  // if(value.status === 2) {
  //   ElMessage.info("体检已取消，无法查看收费单")
  //   return;
  // }
  canvas.value.width = 1150;
  canvas.value.height = 700;
  const ctx = canvas.value.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 1150, 700);
  // 绘制背景图像\
  console.log(value);
  const backgroundImage = new Image();
  const InvoiceMode = await import('@renderer/assets/收费单据模板.png');
  backgroundImage.src = InvoiceMode.default;
  backgroundImage.onload = () => {
    console.log("图像加载完成");
    ctx.drawImage(backgroundImage, 0, 0, 1150, 700);
    // 客户名称
    ctx.font = '35px 宋体';
    ctx.fillStyle = '#000';
    ctx.fillText(value.user.name, 180, 150)
    // 体检时间
    ctx.fillText(_timeFormate(value.createTime), 830, 150)
    // 体检项目
    let total = 0
    for(let i = 0; i < value.records.length; i++) {
      const record = value.records[i];
      ctx.fillText(record.item.name, 200, 250 + i * 55);
      ctx.fillText(record.item.price, 660, 250 + i * 55);
      total += record.item.price;
    }
    // 合计
    ctx.fillText(value.pay, 950, 600);
    ctx.fillText(_convertToWords(value.pay), 250, 600);
    // 备注
    if(value.pay < total) {
      ctx.fontSize = '20px';
      ctx.fillText(`优惠：${total - value.pay}`, 800, 300);
    }
    ctx.fillText
    // 预览
    imageUrl.value = canvas.value.toDataURL()
    preview({
      images: [imageUrl]
    })
  }
  
  function _timeFormate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return year + '年' + month + '月' + day + '日';
  }

  function _convertToWords(amount) {
    const units = ['   ', ' 一', ' 二', ' 三', ' 四', ' 五', ' 六', ' 七', ' 八', ' 九'];
    const scales = ['', '十', '百', '千', '万'];

    if (amount === 0) {
      return '零元';
    }

    let numStr = amount.toString();

    if (numStr.length > 5) {
      throw new Error('超出转换范围');
    }

    numStr = '0'.repeat(5 - numStr.length) + numStr;
    const digits = numStr.split('').map(Number);
    console.log(digits);

    const result = `${units[digits[0]] ?? '  '}万${units[digits[1]] ?? '  '}千${units[digits[2]] ?? '  '}百${units[digits[3]] ?? '  '}十${units[digits[4]] ?? '  '}元`

    return result;
  }
}
</script>

<style>
.content {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  display: flex;
}

.box-card {
  margin-top: 20px;
}

canvas {
  background-color: white;
  display: none;
}
</style>
