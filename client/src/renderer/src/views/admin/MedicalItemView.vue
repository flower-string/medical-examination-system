<template>
  <div class="handle">
    <el-button @click="dialogFormVisible = true">新增项目</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="项目ID" width="180" fixed>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="体检项目名称" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="项目类型"
      width="180"
      :filters="[
        { text: '单项检查', value: '单项检查' },
        { text: '体检套餐', value: '体检套餐' }
      ]"
      :filter-method="filterHandler"
    >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon></el-icon>
          <el-tag>{{ scope.row.type }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="费用" width="180">
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

  <el-dialog v-model="dialogFormVisible" title="体检项目编辑">
    <el-form :model="form">
      <el-form-item label="体检名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="EditForm.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="体检类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="选择体检类型">
          <el-option label="单项体检" value="单项体检" />
          <el-option label="体检套餐" value="体检套餐" />
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

  <el-dialog v-model="dialogEditVisible" title="体检项目编辑">
    <el-form :model="EditForm">
      <el-form-item label="体检名称" :label-width="formLabelWidth">
        <el-input v-model="EditForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="EditForm.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="体检类型" :label-width="formLabelWidth">
        <el-select v-model="EditForm.type" placeholder="选择体检类型">
          <el-option label="单项体检" value="单项体检" />
          <el-option label="体检套餐" value="体检套餐" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="editItem()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
let editCurrent = ref(null);
const handleEdit = (index, row) => {
  console.log(index);
  dialogEditVisible.value = true
  EditForm.value = {
    id: row.id,
    name: row.name,
    price: row.price,
    type: row.type
  };
  editCurrent.value = index;
}

function editItem(a, b) {
  dialogEditVisible.value = false;
  console.log(EditForm.value);
  tableData.value.splice(editCurrent.value, 1, EditForm.value);
  EditForm.value = {};
}

const EditForm = ref(null)
const handleDelete = (index, row) => {
  tableData.value.splice(index, 1)
}

const dialogFormVisible = ref(false)
const dialogEditVisible = ref(false)
const formLabelWidth = '140px'

const form = ref({
  name: '',
  type: ''
})

const addItem = () => {
  dialogFormVisible.value = false
  tableData.value.push({
    id: '5',
    name: '一般检查',
    price: 30,
    type: '单项检查'
  })
  ElMessage({
    showClose: true,
    message: '体检项目添加成功',
    type: 'success'
  })
}

const tableData = ref([
  {
    id: '1',
    name: '一般检查',
    price: 30,
    type: '单项检查'
  },
  {
    id: '2',
    name: '内科',
    price: 30,
    type: '单项检查'
  },
  {
    id: '3',
    name: '内科',
    price: 30,
    type: '单项检查'
  },
  {
    id: '4',
    name: '耳鼻喉',
    price: 30,
    type: '单项检查'
  }
])
function filterHandler(value, row, column) {
  const property = column['property']
  return row[property] === value
}
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
