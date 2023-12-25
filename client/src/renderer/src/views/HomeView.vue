<template>
  <div class="container">
    <aside>
      <header>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span>{{ info.name }}</span>
        <button @click="quit">退出登录</button>
      </header>
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        :collapse="isCollapse"
        :default-active="defaultActive">
          <el-menu-item v-for="item in menu" 
                        :index="item.path + ' ' + item.title">
            {{ item.title }}
          </el-menu-item>
      </el-menu>
    </aside>
    <main>
      <h1>{{ h1 }}</h1>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { userApi, doctorApi, adminApi } from '@renderer/http/api/crud'

const router = useRouter();
const route = useRoute();
const menu = ref(null);
const isCollapse = ref(false);
const h1 = ref('');
const info = ref({});
menu.value = router.options.routes[+(localStorage.getItem('userType')) + 2].children.filter(item => Boolean(item.title))

const getApi = () => {
  let api = null;
  switch (localStorage.getItem('userType')) {
    case '0': api = adminApi; break;
    case '1': api = doctorApi; break;
    case '2': api = userApi; break;
    default: api = null; throw new Error('用户类型错误');
  } 
  return api;
}

const defaultActive = menu.value[0].path + '' + menu.value[0].title;
h1.value = menu.value[0].title

const fatherPath = route.fullPath.split('/')[1];
const handleSelect = (key) => {
  const [path, title] = key.split(' ');
  router.push(`/${fatherPath}/${path}`);
  h1.value = title;
}

function quit() {
  window.sessionStorage.clear();
  window.localStorage.clear();
  ElMessage({
    message: '退出成功',
    type: 'success',
    duration: 1000
  });
  setTimeout(() => {
    router.push('/login');
  }, 1000);
}

onMounted(async () => {
  console.log(localStorage.getItem('userId'));
  const api = getApi();
  info.value = await api.findOne(localStorage.getItem('userId'));
  console.log(info.value);
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

header {
  font-size: 12px;
}

aside {
  height: 100%;
  width: 200px;
}

.el-menu {
  height: 100%;
  width: 100%;
}

main {
  overflow-y: scroll;
  flex: 1;
}

header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  background-color: #545c64;
}

header button {
  position: absolute;
  right: 10px;
  background-color: dodgerblue;
  padding: 5px;
}

h1 {
  font-weight: 900;
  margin: 10px;
}

.el-avatar {
  margin-right: 10px;
}
</style>
