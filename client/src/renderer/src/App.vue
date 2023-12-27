<script setup>
  document.body.style.setProperty('--el-color-primary', '#73f7ff');
</script>

<template>
  <!-- <Versions></Versions> -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<style lang="less">
@import './assets/css/styles.less';

</style>
