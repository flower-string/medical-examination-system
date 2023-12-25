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
              <el-button>体检报告</el-button>
              <el-button>收费单据</el-button>
            </span>
          </div>
        </template>
        <med-record-detail v-for="o in list" :o="o"></med-record-detail>
      </el-card>
    </el-drawer>
  </div>
</template>

<script setup>
import { user_getUserLogs, cancelBook } from '../../http/api/sp'

import MedRecordDetail from '@renderer/components/MedRecordDetail.vue'
import MedRecordStatus from '@renderer/components/MedRecordStatus.vue'

onMounted(async () => {
  tableData.value = await user_getUserLogs(localStorage.getItem('userId'))
  console.log(list)
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
</style>
