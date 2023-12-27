<template>
  <div class="handle">
    <el-button @click="dialogFormVisible = true">注册用户</el-button>
    <el-button @click="renewalDialogVisible = true">用户充值</el-button>
  </div>
  <el-tabs type="border-card" @tab-change="tabChange">
    <el-tab-pane label="用户管理"></el-tab-pane>
    <el-tab-pane label="医生管理"></el-tab-pane>
  </el-tabs>

  <el-table :data="tableList" style="width: 100%" table-layout="fixed">
    <el-table-column label="ID" width="180" prop="id"> </el-table-column>
    <el-table-column v-if="tabName === '普通用户'" label="账户余额" width="180" prop="balance"> </el-table-column>
    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="openEditDialog(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >注销用户</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="renewalDialogVisible" title="充值">
    <el-form :model="renewalForm">
      <el-form-item label="用户ID" :label-width="formLabelWidth">
        <el-input v-model="renewalForm.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="充值金额" :label-width="formLabelWidth">
        <el-input-number v-model="renewalForm.value"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="renewalDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="renewal">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisible" title="新建用户">
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
import { userApi, doctorApi } from '../../http/api/crud'
import { userEenewal } from '../../http/api/sp.js'

const formLabelWidth = ref(null)

// 续费功能
const renewalDialogVisible = ref(false)
const renewalForm = ref({
  id: 0,
  value: 0
})

async function renewal() {
  try {
    const id = renewalForm.value.id;
    const value = renewalForm.value.value
    await ElMessageBox.confirm(`确认为用户${id}充值${value}元吗？`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await userEenewal(id, value);
    ElMessage.success("充值成功！")
    // 更新表格中的user
    userList.value.find(item => item.id === +id).balance += value;
  } catch (error) {
    ElMessageBox.alert("充值失败！")
  } finally {
    renewalForm.value = {id: 0, value: 0};
    renewalDialogVisible.value = false;
  }
}

function getApi(row) {
  if (!row) {
    throw new Error('缺少用于确定请求器的用户')
  }

  if (!row.type) {
    throw new Error('用户类型不能为空')
  }

  return row.type === '普通用户' ? userApi : doctorApi
}

// 修改用户信息的表单
const editForm = ref(null)

// 当前操作的用户的索引
const currentIndex = ref(-1)

// 打败修改用户信息的窗口
function openEditDialog(index, row) {
  dialogEditVisible.value = true
  editForm.value = {
    id: row.id,
    name: row.name,
    type: row.type
  }
  currentIndex.value = index
}

// 更新用户信息
const handleEdit = async () => {
  const api = getApi(editForm.value);
  if (!editForm.value.id) {
    throw new Error('缺少id')
  }
  try {
    const type = editForm.value.type
    delete editForm.value.type
    await api.update(editForm.value);
    dialogEditVisible.value = false;
    ElMessage.success('信息更新成功');
    if (type === '普通用户') {
      userList.value[currentIndex.value].name = editForm.value.name;
    } else {
      doctorList.value[currentIndex.value].name = editForm.value.name;
    }
  } catch {
    ElMessage.error('信息更新失败');
  }
}

// 删除用户
const handleDelete = async (index, row) => {
  // 弹框提示是否删除用户
  try {
    await ElMessageBox.confirm('确定删除该用户吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    // 确定删除用户
    const api = getApi(row);
    // 发送删除请求
    await api.delete(row.id);
    ElMessage.success('删除成功');
    // 将数据从表格中移除
    if(tabName.value === '普通用户') {
      userList.value.splice(index, 1);
    } else {
      doctorList.value.splice(index, 1);
    }
  } catch {
    ElMessage.error('删除失败')
  }
}

const dialogFormVisible = ref(false)
const dialogEditVisible = ref(false)

// 注册用户所需表单
const form = ref({
  name: '',
  type: '',
  password: '000000'
})

// 注册新用户
const addItem = async () => {
  if (form.value.name === '' || form.value.type === '') {
    ElMessage({
      showClose: true,
      message: '用户名为空或用户类型未选择',
      type: 'error'
    })
    return
  }
  // 选择请求器
  const reg = getApi(form.value)
  // 发送请求并等待结果
  const result = await reg.create(form.value)
  // 关闭弹窗
  dialogFormVisible.value = false
  // 向表格追加数据
  if (form.value.type === '普通用户') {
    userList.value.push(result)
  } else {
    doctorList.value.push(result)
  }
  // 提示用户添加成功
  ElMessage({
    showClose: true,
    message: '用户添加成功',
    type: 'success'
  })
}

const doctorList = ref([])
const userList = ref([])
const tabName = ref('普通用户')
const tableList = computed(() => {
  return tabName.value === '普通用户' ? userList.value : doctorList.value
})

function tabChange(tab) {
  if (tab == 0) {
    tabName.value = '普通用户'
  } else {
    tabName.value = '医生'
  }
}

async function initTableData() {
  userList.value = await userApi.findAll()
  doctorList.value = await doctorApi.findAll()
  userList.value.forEach((item) => {
    item.type = '普通用户'
  })
  doctorList.value.forEach((item) => {
    item.type = '医生'
  })
}

onMounted(() => {
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
</style>
