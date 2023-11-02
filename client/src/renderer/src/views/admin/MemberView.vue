<template>
  <div class="handle">
    <el-button @click="dialogFormVisible = true">注册用户</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" table-layout='fixed'>
    <!-- <el-table-column label="数据库ID" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column> -->

    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column 
      label="用户类型" 
      width="180"
      :filters='[
        { text: "医生", value: "医生" },
        { text: "普通用户", value: "普通用户"}
      ]'
      :filter-method="filterHandler"
    >
      <template #default="scope">
        <el-tag>{{ scope.row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="openEditDialog(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">注销用户</el-button>
      </template> 
    </el-table-column>
  </el-table>


  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
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

  <el-dialog v-model="dialogEditVisible" title="Shipping address">
    <el-form :model="editForm">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户类型" :label-width="formLabelWidth">
        <el-select v-model="editForm.type" placeholder="选择用户类型" disabled>
          <el-option label="医生" value="医生" />
          <el-option label="普通用户" value="普通用户" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import api from '../../http/api/crud';
const { userApi, doctorApi } = api;

function getApi(row) {
  if(!row) {
    throw new Error("缺少用于确定请求器的用户");
  }

  if(!row.type) {
    throw new Error("用户类型不能为空");
  }

  return row.type === "普通用户" ? userApi : doctorApi;
}

const editForm = ref(null);
const currentIndex = ref(-1);

function openEditDialog(index, row) {
  dialogEditVisible.value = true; 
  editForm.value = {
    name: row.name,
    type: row.type,
  };
  currentIndex.value = index;
}

const handleEdit = () => {
  dialogEditVisible.value = false;
  const api = getApi(editForm.value);
  const type = editForm.value.type;
  delete editForm.value.type;
  editForm.value.id = tableData.value[currentIndex.value].id;
  if(!editForm.value.id) {
    throw new Error("缺少id");
  }
  api.update(editForm.value).then(() => {
    ElMessage({
      showClose: true,
      message: '信息更新成功',
      type: 'success',
    })
    editForm.value.type = type;
    tableData.value.splice(currentIndex.value, 1, editForm.value);
  }).catch((err) => {
    ElMessage({
      showClose: true,
      message: "信息更新失败",
      type: 'error',
    })
  })
  
}

const handleDelete = (index, row) => {
  // 弹框提示是否删除用户
  ElMessageBox.confirm('确定删除该用户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then((res) => {
    // 确定请求器
    const api = getApi(row);
    // 发送删除请求
    return api.delete(row.id)
  }).then((res) => {
    // 提示用户删除成功
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success',
    })
    // 将数据从表格中移除
    tableData.value.splice(index, 1);
  }).catch(() => {
    // 提示用户删除失败
    ElMessage({
      showClose: true,
      message: '删除失败',
      type: 'error',
    })
  })
  
}

const dialogFormVisible = ref(false)
const dialogEditVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  type: '',
  password: '000000'
})

const addItem = async () => {
  if(form.value.name === '' || form.value.type === '') {
    ElMessage({
      showClose: true,
      message: '用户名为空或用户类型未选择',
      type: 'error',
    })
    return;
  }
  // 选择请求器
  const reg = getApi(form.value);
  // 发送请求并等待结果
  const result = await reg.create(form.value);
  // 补全类型
  result.type = form.value.type;
  // 关闭弹窗
  dialogFormVisible.value = false;
  // 向表格追加数据
  tableData.value.push(result);
  // 提示用户添加成功
  ElMessage({
    showClose: true,
    message: '用户添加成功',
    type: 'success',
  })
}

const tableData = ref([])

const filterHandler = (value, row, column) => {
  const type = row['type']
  return type === value
}

async function initTableData() {
  const userList = await userApi.findAll();
  const doctorList = await doctorApi.findAll();
  userList.forEach(item => {
    item.type = "普通用户";
  })
  doctorList.forEach(item => {
    item.type = "医生";
  })
  tableData.value = userList.concat(doctorList);
}

onMounted(() => {
  initTableData();
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

/* 隐藏滚动条 */
/* :deep .el-scrollbar::-webkit-scrollbar {
  display: none;
} */
</style>
