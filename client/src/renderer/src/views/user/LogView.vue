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
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="pay(scope.$index, scope.row)"
            v-if="scope.row.status === 3"
          >
            缴费
          </el-button>
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
            v-if="scope.row.status === 3 || scope.row.status === 0"
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
  <div id="report">
    <h1>体检报告</h1>
  </div>
</template>

<script setup>
import { user_getUserLogs, cancelBook, user_pay } from '../../http/api/sp'

import MedRecordDetail from '@renderer/components/MedRecordDetail.vue'
import MedRecordStatus from '@renderer/components/MedRecordStatus.vue'
import { preview } from 'vue3-image-preview'
import domToImage from 'dom-to-image'
import { useUserStore } from '@renderer/store/user'
import tools from '@renderer/utils/tools'

const userStore = useUserStore()

onMounted(async () => {
  tableData.value = await user_getUserLogs(localStorage.getItem('userId'))
  tableData.value.forEach(item => item.createTime = tools._timeFormate(item.createTime));
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

const pay = async (index, row) => {
  try {
    await ElMessageBox.confirm('确认要支付吗？', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    if (userStore.balance < row.pay) {
      ElMessage.error('余额不足')
      return
    }
    await user_pay(row.id)
    row.status = 0
  } catch {}
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
      can = false
      ElMessage.info('体检已经开始，无法取消')
      return
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

const imageUrl = ref('')
const showReport = async (value) => {
  if(value.status !== 1) {
    ElMessage.info("体检还未完成，无法查看报告")
    return;
  }
  console.log(value)
  const width = 1150
  const height = 100 + 60 + 100 + value.records.length * 200;
  canvas.value.width = width
  canvas.value.height = height
  const ctx = canvas.value.getContext('2d')
  let currentHeight = 0
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#31869B'
  ctx.fillRect(currentHeight, 0, width, 100)
  ctx.fillStyle = '#000'
  ctx.font = '50px Arial'
  ctx.fillText('体检报告', 450, currentHeight + 70)
  currentHeight += 100

  ctx.font = '30px Arial'
  ctx.strokeStyle = '#000'
  for (let i = 0; i < 6; i++) {
    ctx.strokeRect((width / 6) * i, currentHeight, width / 6, 60)
  }
  ctx.fillText('姓名', (width / 6) * (1 - 1) + 20, currentHeight + 40);
  ctx.fillText(value.user.name, (width / 6) * (2 - 1) + 20, currentHeight + 40);
  ctx.fillText('年龄', (width / 6) * (3 - 1) + 20, currentHeight + 40)
  ctx.fillText('性别', (width / 6) * (5 - 1) + 20, currentHeight + 40)
  currentHeight += 60;

  for (let i = 0; i < value.records.length; i++) {
    ctx.strokeRect(0, currentHeight, width / 4, 200)
    ctx.strokeRect(width / 4, currentHeight, (width / 4) * 3, 100)
    ctx.strokeRect(width / 4, currentHeight + 100, (width / 4) * 3 - 150, 100)
    ctx.strokeRect(width - 150, currentHeight + 100, 150, 100);
    ctx.fillText(value.records[i].item.name, 20, currentHeight + 40);
    ctx.fillText(value.records[i].result, (width / 4) + 20, currentHeight + 40);
    ctx.fillText(value.records[i].advice, (width / 4) * (3 - 1) + 20, currentHeight + 140);
    ctx.fillText(value.records[i].doctor.name, width - 150, currentHeight + 140);
    currentHeight += 200
  }

  ctx.strokeRect(0, currentHeight, width, 100)
  ctx.fillText('体检时间' + tools._timeFormate(value.updataTime), 20, currentHeight + 40)
  currentHeight += 100;
  imageUrl.value = canvas.value.toDataURL('image/png')
  preview({
    images: [imageUrl]
  })
}

const canvas = ref(null)
const showInvoices = async (value) => {
  if (value.status === 2) {
    ElMessage.info('体检已取消，无法查看收费单')
    return
  }
  if (value.status === 3) {
    ElMessage.info('未付费，无法查看收费单')
    return
  }
  canvas.value.width = 1150
  canvas.value.height = 700
  const ctx = canvas.value.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, 1150, 700)
  // 绘制背景图像\
  console.log(value)
  const backgroundImage = new Image()
  const InvoiceMode = await import('@renderer/assets/收费单据模板.png')
  backgroundImage.src = InvoiceMode.default
  backgroundImage.onload = () => {
    console.log('图像加载完成')
    ctx.drawImage(backgroundImage, 0, 0, 1150, 700)
    // 客户名称
    ctx.font = '35px 宋体'
    ctx.fillStyle = '#000'
    ctx.fillText(value.user.name, 180, 150)
    // 体检时间
    ctx.fillText(tools._timeFormate(value.createTime), 830, 150)
    // 体检项目
    let total = 0
    for (let i = 0; i < value.records.length; i++) {
      const record = value.records[i]
      ctx.fillText(record.item.name, 200, 250 + i * 55)
      ctx.fillText(record.item.price, 660, 250 + i * 55)
      total += record.item.price
    }
    // 合计
    ctx.fillText(value.pay, 950, 600)
    ctx.fillText(tools._convertToWords(value.pay), 250, 600)
    // 备注
    if (value.pay < total) {
      ctx.fontSize = '20px'
      ctx.fillText(`优惠：${total - value.pay}`, 800, 300)
    }
    ctx.fillText
    // 预览
    imageUrl.value = canvas.value.toDataURL()
    preview({
      images: [imageUrl]
    })
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

canvas,
#report {
  background-color: white;
  display: none;
}
</style>
