<template>
  <div class="text item">
    <div class="item-top">
      <div>{{ o.item.name }}</div>
      <MedRecordStatus :status="o.status" />
    </div>
    <div class="item-bottom">
      <div>责任医生：{{ o.doctor.name }}</div>
      <div>{{ o.createTime }}</div>
    </div>
    <div class="result" v-if="o.status === 1">
      <div>
        <el-tag> 体检结果 </el-tag>
        {{ o.result }}
      </div>
      <div>
        <el-tag> 医生建议 </el-tag>
        {{ o.advice }}
      </div>
    </div>
  </div>
</template>

<script setup>
import MedRecordStatus from './MedRecordStatus.vue'

defineProps({
  o: {
    type: Object,
    default: () => ({}),
  }
})
</script>

<style scoped>
.item {
  box-shadow: -1px 1px 1px #ebeef5;
  border-radius: 4px;
  margin: 5px;
  padding: 8px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  font-size: 15px;
}

.item-bottom {
  color: grey;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
}

.result {
  font-size: 12px;
  margin-top: 5px;
}
</style>
