<template>
  <el-affix>
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        :router="true"
      >
          <el-menu-item v-for="item in menu" :index="item.path">
            {{ item.title }}
          </el-menu-item>
      </el-menu>
  </el-affix>
  <router-view />
</template>

<script setup>
const route = useRoute()
const { importPath } = globalThis.PathRoute

let menu = ref(null)
import(/* @vite-ignore */ importPath).then((routes) => {
  const parent = routes.default[0].path;
  const children = routes.default[0].children;
  children.shift();
  menu.value = children;
})

const handleSelect = (key, keyPath, item, route) => {}
</script>

<style scoped>
</style>
