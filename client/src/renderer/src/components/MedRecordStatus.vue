<template>
  <div style="display: flex; align-items: center">
    <el-tag v-if="status == 0" type="warning"> 
      进行中 
    </el-tag>
    <el-tag v-if="status == 1" type="success">
      已完成
    </el-tag>
    <el-tag v-if="status == 2" type="info"> 
      已取消 
    </el-tag>
    <el-tag v-if="status == 3" type="danger"> 
      未付费
    </el-tag>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['setResult', 'showDetail'])
</script>

<style scoped></style>
