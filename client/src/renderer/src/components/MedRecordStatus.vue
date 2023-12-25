<template>
  <div style="display: flex; align-items: center">
    <el-tag v-if="status == 0" type="danger"> 
      未完成 
    </el-tag>
    <el-tag v-if="status == 1" type="success">
      已完成
    </el-tag>
    <el-tag v-if="status == 2" type="info"> 
      已取消 
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
