<template>
  <el-table :data="logList" style="width: 100%">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="体检人ID" prop="user.id"></el-table-column>
    <el-table-column label="体检人名称" prop="user.name"></el-table-column>
    <el-table-column label="预约时间" prop="createTime"></el-table-column>
    <el-table-column label="花费">
      <template #default="scope"> 
        <el-tag>￥{{ scope.row.pay }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="当前状态">
      <template #default="scope">
        <MedRecordStatus :status="scope.row.status"></MedRecordStatus>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="showDetail(scope.$index, scope.row)">详情</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除项目</el-button
        > 
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="体检项目详情" width="30%" draggable>
    <MedRecordDetail v-for='o in records' :o="o"></MedRecordDetail>
  </el-dialog>
</template>

<script setup>
import { doctorApi, logApi } from '../../http/api/crud'
import { useDoctor } from '../../store/doctor'

const doctorStore = useDoctor()

const logList = ref([])

const dialogVisible = ref(false)
const records = ref({})

function showDetail(index, row) {
  dialogVisible.value = true;
  records.value = row.records;
}

async function initTableData() {
  logList.value = await logApi.findAll();
  console.log(logList.value);
}

async function handleDelete(index, row) {
  try {
    await ElMessageBox.confirm('确认要删除这条记录吗？', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await logApi.delete(row.id)
    logList.value.splice(index, 1);
    ElMessage.success('删除成功');
  } catch {
    ElMessage.error('删除失败')
  }
}

onMounted(async () => {
  const doctorList = await doctorApi.findAll()
  doctorList.forEach((item) => {
    doctorStore.addItem(item.id, item.name)
  })
  // doctorStore.addItem()
  initTableData()
})
</script>

<style scoped>
.handle {
  width: 100vw;
  display: flex;
  margin: 10px;
}

:deep(tbody) {
  overflow-y: scroll !important;
}

li {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin: 3px;
}
</style>
