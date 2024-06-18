<template>
  <div class="content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="time" label="日期" />
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
  tableData.value.forEach(item => item.time = tools._timeFormate(item.createTime));
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
    await ElMessageBox.confirm(`确认要支付吗？，共消费${row.pay}元`, 'Warning', {
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
  imageUrl.value = tools._drawReport(canvas.value, value)
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
  imageUrl.value = await tools._drawInvoices(canvas.value, value);
  preview({
    images: [imageUrl]
  })
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
