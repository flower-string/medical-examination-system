<template>
  <div class="handle">
    <el-button @click="dialogFormVisible = true">注册用户</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="数据库ID" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="身份症号" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.IDNumber }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="用户类型" width="180">
      <template #default="scope">
        <el-tag>{{ scope.row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">注销用户</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号" :label-width="formLabelWidth">
        <el-input v-model="form.IDNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="选择用户类型">
          <el-option label="医生" value="医生" />
          <el-option label="普通用户" value="普通用户" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addItem">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const handleEdit = (index, row) => {
  // console.log(index, row)
}
const handleDelete = (index, row) => {
  tableData.value.splice(index, 1);
}

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  type: '',
  IDNumber: '',
  id: 0,
})

const addItem = () => {
  dialogFormVisible.value = false;
  tableData.value.push(form.value)
  ElMessage({
    showClose: true,
    message: '体检项目添加成功',
    type: 'success',
  })
}

const tableData = ref([
  {
    id: '1',
    name: 'chao',
    IDNumber: 30,
    type: '普通用户'
  },
])
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

/* 隐藏滚动条 */
/* :deep .el-scrollbar::-webkit-scrollbar {
  display: none;
} */
</style>
