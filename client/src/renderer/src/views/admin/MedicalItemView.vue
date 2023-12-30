<template>
  <div class="handle">
    <el-button @click="dialogFormVisible = true">新增项目</el-button>
    <el-button @click="groupAddDialogVisible = true">新增套餐</el-button>
    <!-- <el-button>Canvas面板</el-button> -->
  </div>

  <el-tabs type="border-card" @tab-change="tabChange">
    <el-tab-pane label="项目管理">
      <el-table :data="itemList" style="width: 100%">
        <el-table-column label="项目ID" prop="id" fixed></el-table-column>
        <el-table-column label="体检项目名称" prop="name" fixed></el-table-column>
        <el-table-column label="负责医生" prop="doctor.name" fixed></el-table-column>
        <el-table-column label="项目介绍" prop="desc" fixed></el-table-column>
        <el-table-column label="费用">
          <template #default="scope">
            <el-tag>￥{{ scope.row.price }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >删除项目</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="套餐管理">
      <el-table :data="groupList" style="width: 100%">
        <el-table-column label="项目ID" prop="id" fixed></el-table-column>
        <el-table-column label="体检项目名称" prop="name" fixed></el-table-column>
        <el-table-column label="项目介绍" prop="desc" fixed></el-table-column>
        <el-table-column label="费用">
          <template #default="scope">
            <el-tag>￥{{ scope.row.price }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- <el-button size="small" @click="groupDetail(scope.$index, scope.row)">详情</el-button> -->
            <el-button size="small" @click="editGroup(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteGroup(scope.$index, scope.row)"
              >删除项目</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="dialogFormVisible" title="新增体检项目">
    <el-form :model="form">
      <el-form-item label="体检名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input-number v-model="form.price" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item label="负责医生" :label-width="formLabelWidth">
        <el-select v-model="form.doctorId">
          <el-option v-for="item in doctorList" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="体检介绍" :label-width="formLabelWidth">
        <el-input v-model="form.desc" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addItem">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogEditVisible" title="体检项目编辑">
    <el-form :model="EditForm">
      <el-form-item label="体检ID" :label-width="formLabelWidth">
        <el-input v-model="EditForm.id" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="体检名称" :label-width="formLabelWidth">
        <el-input v-model="EditForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input-number v-model="EditForm.price" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item label="负责医生" :label-width="formLabelWidth">
        <el-select v-model="EditForm.doctor">
          <el-option v-for="item in doctorList" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="体检介绍" :label-width="formLabelWidth">
        <el-input v-model="EditForm.desc" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="editItem">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="groupAddDialogVisible" title="新增体检套餐">
    <el-form :model="groupAddForm">
      <el-form-item label="套餐名称" :label-width="formLabelWidth">
        <el-input v-model="groupAddForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input-number v-model="groupAddForm.price" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item label="介绍" type="textarea" :label-width="formLabelWidth">
        <el-input v-model="groupAddForm.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="包含项目" :label-width="formLabelWidth">
        <el-select 
          v-model="groupAddForm.itemIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option v-for="item in itemList" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="groupAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createGroup">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="groupUpdataDialogVisible" title="编辑体检套餐">
    <el-form :model="groupUpdataForm">
      <el-form-item label="套餐名称" :label-width="formLabelWidth">
        <el-input v-model="groupUpdataForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input-number v-model="groupUpdataForm.price" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item label="介绍" type="textarea" :label-width="formLabelWidth">
        <el-input v-model="groupUpdataForm.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="包含项目" :label-width="formLabelWidth">
        <el-select 
          v-model="groupUpdataForm.itemIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option v-for="item in itemList" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="groupUpdataDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updataGroup">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { itemApi, doctorApi, groupApi } from '../../http/api/crud'
import { useDoctor } from '../../store/doctor'

const doctorStore = useDoctor()
let editCurrent = ref(-1)

const formLabelWidth = ref(null)
const tabName = ref('项目管理')
const tabChange = (tab) => {
  if (tab == 0) {
    tabName.value = '项目管理'
  } else {
    tabName.value = '套餐管理'
  }
}

const EditForm = ref({
  id: null,
  name: null,
  price: null,
  doctor: {},
  desc: null
})
const handleEdit = (index, row) => {
  dialogEditVisible.value = true
  editCurrent.value = index
  EditForm.value = {
    id: row.id,
    name: row.name,
    price: row.price,
    doctor: row.doctor.id,
    desc: row.desc
  }
}

async function editItem() {
  if(EditForm.value.doctor == null) {
    ElMessage.error("请选择医生");
    return;
  }
  if(EditForm.value.name == null) {
    ElMessage.error("请输入项目名称");
    return;
  }
  if(EditForm.value.price < 0 || EditForm.value.price > 1000) {
    ElMessage.error("正确的价格区间为0-1000");
    return;
  }
  if(EditForm.value.desc == null) {
    ElMessage.error("请输入项目描述");
    return;
  }
  await itemApi.update(EditForm.value)
  dialogEditVisible.value = false
  ElMessage({
    type: 'success',
    message: '项目更新成功'
  })
  const doctorId = EditForm.value.doctor
  const doctor = doctorList.value.find((item) => item.id == doctorId)
  EditForm.value.doctor = doctor
  itemList.value.splice(editCurrent.value, 1, EditForm.value)
}

const handleDelete = (index, row) => {
  // 弹框提示是否删除用户
  ElMessageBox.confirm('确定删除该体检项目吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then((res) => {
      // 发送删除请求
      return itemApi.delete(row.id)
    })
    .then((res) => {
      // 提示用户删除成功
      ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
      // 将数据从表格中移除
      itemList.value.splice(index, 1)
    })
    .catch(() => {
      // 提示用户删除失败
      ElMessage({
        showClose: true,
        message: '删除失败',
        type: 'error'
      })
    })
}

const dialogFormVisible = ref(false)
const dialogEditVisible = ref(false)

const form = ref({
  name: '',
  price: 0,
  desc: '',
  doctorId: ''
})

const addItem = async () => {
  if(form.value.doctorId == null) {
    ElMessage.error("请选择医生");
    return;
  }
  if(form.value.name == null) {
    ElMessage.error("请输入项目名称");
    return;
  }
  if(form.value.price < 0 || EditForm.value.price > 1000) {
    ElMessage.error("正确的价格区间为0-1000");
    return;
  }
  if(form.value.desc == null) {
    ElMessage.error("请输入项目描述");
    return;
  }
  dialogFormVisible.value = false
  const result = await itemApi.create(form.value)
  // 向表格追加数据
  itemList.value.push(result)
  // 提示用户添加成功
  ElMessage({
    showClose: true,
    message: '体检项目添加成功',
    type: 'success'
  })
}

// 体检套餐相关操作
const groupAddDialogVisible = ref(false);
const groupUpdataDialogVisible = ref(false);
const groupCurrent = ref(-1);
const groupAddForm = ref({
  name: '',
  price: 0,
  desc: '',
  itemIds: []
})
const groupUpdataForm = ref({});
const createGroup = async () => {
  try {
    if(groupAddForm.value.itemIds.length > 5) {
      ElMessage.error("套餐项目不能超过5个！");
      return;
    }
    if(groupAddForm.value.price <= 0 || group.value.price > 1000) {
      ElMessage.error("套餐价格应该在0-1000之间！");
      return;
    }
    const group = await groupApi.create(groupAddForm.value);
    ElMessage({
      type: 'success',
      message: "创建成功"
    });
    groupList.value.push(group);
  } catch (error) {
    ElMessage.error("创建失败！");
  } finally {
    groupAddDialogVisible.value = false;
    groupAddForm.value = {
      name: '',
      price: 0,
      desc: '',
      itemIds: []
    }
  }
}

const editGroup = async (index, row) => {
  groupUpdataDialogVisible.value = true;
  groupCurrent.value = index;
  const itemIds = row.items.map(el => el.id);
  if(itemIds.length > 5) {
    ElMessage.error("套餐项目不能超过5个！");
    return;
  }
  if(row.price <= 0 || row.price > 1000) {
    ElMessage.error("套餐价格应该在0-1000之间！");
    return;
  }
  groupUpdataForm.value = {
    id: row.id,
    name: row.name,
    desc: row.desc,
    itemIds,
    price: row.price
  }
}
const updataGroup = async () => {
  await groupApi.update(groupUpdataForm.value);
  groupUpdataDialogVisible.value = false;
  ElMessage.success("套餐更新成功");
  const itemIds = groupUpdataForm.value.itemIds;
  const items = [];
  for(const itemId of itemIds) {
    const item = itemList.value.find(item => item.id === itemId);
    items.push(item);
  }
  groupUpdataForm.value.items = items;
  groupList.value.splice(groupCurrent.value, 1, groupUpdataForm.value);
}
const deleteGroup = async (index, row) => {
  try {
    await ElMessageBox.confirm('确定删除该体检套餐吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await groupApi.delete(row.id);
    groupList.value.splice(index, 1);
    ElMessage.success("删除成功！")
  } catch {
    ElMessage.error("删除失败");
  }
}


const itemList = ref([])
const groupList = ref([])

async function initTableData() {
  itemList.value = await itemApi.findAll()
  groupList.value = await groupApi.findAll()
}

const doctorList = ref([])
onMounted(async () => {
  doctorList.value = await doctorApi.findAll()
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

/* 隐藏滚动条 */
/* :deep .el-scrollbar::-webkit-scrollbar {
  display: none;
} */
</style>
