<template>
  <div class="container">
    <aside>
      <header>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          @click="infoVisible = true"
        />
        <span>{{ userStore.name }}</span>
      </header>
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        :default-active="defaultActive">
          <el-menu-item v-for="item in menu" 
                        :index="item.path + ' ' + item.title">
            {{ item.title }}
          </el-menu-item>
      </el-menu>
    </aside>
    <main>
      <h1>{{ h1 }}</h1>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>

  <el-dialog title="个人信息" v-model="infoVisible">
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="userStore.name" disabled/>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="userStore.id" disabled/>
      </el-form-item>
      <el-form-item label="余额" v-if="userType == 2">
        <el-input-number v-model="userStore.balance" disabled />
        <el-button @click="renewalVisible = true">充值</el-button>
      </el-form-item>
      <el-button @click="quit" class="exit">退出登录</el-button>
    </el-form>
  </el-dialog>

  <el-dialog title="充值" v-model="renewalVisible">
    <el-form>
      <el-form-item label="充值金额">
        <el-input-number v-model="renewalMoney" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="renewalVisible = false">取 消</el-button>
      <el-button type="primary" @click="renewal">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { userApi, doctorApi, adminApi } from '@renderer/http/api/crud'
import { useUserStore } from '@renderer/store/user';
import { userEenewal } from '@renderer/http/api/sp.js'

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();
const menu = ref(null);
const h1 = ref('');
const infoVisible = ref(false)
const renewalVisible = ref(false);
const renewalMoney = ref(0);
const userType = localStorage.getItem('userType');
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

async function renewal() {
  try {
    const id = userStore.id;
    const value = renewalMoney.value
    await ElMessageBox.confirm(`确认为用户${id}充值${value}元吗？`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await userEenewal(id, value);
    ElMessage.success("充值成功！")
    userStore.setBalance(userStore.balance + value)
  } catch (error) {
    ElMessageBox.alert("充值失败！")
  } finally {
    renewalVisible.value = false;
  }
}

onMounted(async () => {
  // 获取用户信息，防止刷新后登录信息丢失
  const api = getApi();
  const id = +localStorage.getItem('userId');
  const info = await api.findOne(id);
  userStore.setId(info.id);
  userStore.setName(info.name);
  userStore.setPassword(info.password);
  userStore.setBalance(info.balance || 0);
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

header {
  font-size: 14px;
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

h1 {
  font-weight: 900;
  margin: 10px;
}

.el-avatar {
  margin-right: 10px;
}
</style>
