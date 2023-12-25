<template>
  <div class="content">
    <div class="form">
      <el-input type="text" placeholder="请输入用户ID" v-model="userId"></el-input>
      <el-button @click="search">查询</el-button>
    </div>

    <div class="userBox" v-if="hasUser">
      <div class="userinfo box">
        <h2>用户信息</h2>
        <div class="info">
          <div>用户ID: {{ userInfo.id }}</div>
          <div>姓名：{{ userInfo.name }}</div>
        </div>
      </div>
      

      <div class="list box">
        <h2>用户体检记录</h2>
        <el-table :data="recordList">
          <el-table-column prop="item.name" label="体检名称"></el-table-column>
          <el-table-column prop="createTime" label="体检时间"></el-table-column>
          <el-table-column label="当前状态">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-tag v-if="scope.row.status == 0" @click="setResult(scope.row)" color="red">
                  未完成
                </el-tag>
                <el-tag v-if="scope.row.status == 1" @click="showDetail(scope.row)" color="green">
                  已完成
                </el-tag>
                <el-tag v-if="scope.row.status == 2" color="grey">
                  已取消
                </el-tag>
              </div>
            </template>
          </el-table-column> 
        </el-table>
      </div>
    </div>
    <div class="userBox" v-else>请输入ID查询用户信息</div>
  </div>

  <el-dialog ref="write" v-model="writeVisible">
    <el-form :model="formData">
      <el-form-item label="负责医生" required>
        <el-input v-model="formData.doctor" disabled></el-input>
      </el-form-item>
      <el-form-item label="体检结果" required>
        <el-input v-model="formData.result"></el-input>
      </el-form-item>
      <el-form-item label="医生建议" required>
        <el-input v-model="formData.advice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitAdvice">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog ref="read" v-model="readVisible" title="历史查询">
    <el-form>
      <el-form-item label="负责医生">
        <el-input disabled v-model="formData.doctor"></el-input>
      </el-form-item>
      <el-form-item label="体检结果">
        <el-input disabled v-model="formData.result"></el-input>
      </el-form-item>
      <el-form-item label="医生建议">
        <el-input disabled v-model="formData.advice"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { doctor_getUserInfoAndRecords } from '../../http/api/sp.js'
import { recordApi } from '../../http/api/crud.js'

const hasUser = ref(false);
const userId = ref(null);
const userInfo = ref({})
const recordList = ref([]);
const readVisible = ref(false);
const writeVisible = ref(false);
const setResult = (row) => {
  formData.value = {
    id: row.id,
    doctor: row.doctor.name,
    result: row.result,
    advice: row.advice
  }
  writeVisible.value = true
}
const showDetail = (row) => {
  formData.value = {
    id: row.id,
    doctor: row.doctor.name,
    result: row.result,
    advice: row.advice
  }
  readVisible.value = true
}
const formData = ref({})
const search = async () => {
  hasUser.value = true
  const { info, records } = await doctor_getUserInfoAndRecords(userId.value);
  userInfo.value = info;
  recordList.value = records
}
const submitAdvice = async () => {
    console.log("即将提交");
    console.log(recordApi);
    recordApi.update(formData.value)
    .then((res) => {
      ElMessage.success("提交成功");
      recordList.value.find((item) => item.id === formData.value.id).status = 1;
      recordList.value.find((item) => item.id === formData.value.id).advice = formData.value.advice;
      recordList.value.find((item) => item.id === formData.value.id).result = formData.value.result;
    })
    .catch((res) => {
      ElMessage.error("提交失败");
    })
    .finally((res) => {
      formData.value = {};
      writeVisible.value = false;
    }) 
}
</script>

<style scoped>
.content {
  padding: 20px;
}

.form {
  display: flex;
  justify-content: flex-start;
}

.el-tag {
  cursor: pointer;
}

.box {
  margin-top: 20px;
}

h2 {
  padding: 10px 0;
}
</style>