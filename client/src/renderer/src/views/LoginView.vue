<template>
  <div class="fbox">
    <div class="container">
      <div class="form-box" ref="form_box">
        <!-- 注册 -->
        <div class="register-box hidden" ref="register_box">
          <h1>register</h1>
          <input type="text" placeholder="用户名" />
          <input type="text" placeholder="身份证号" />
          <input type="password" placeholder="密码" />
          <input type="password" placeholder="确认密码" />
          <button @click="register">注册</button>
        </div>
        <!-- 登录 -->
        <div class="login-box" ref="login_box">
          <h1>login</h1>
          <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" />
          <div style="margin-top: 20px; width: 70%">
            <el-radio-group v-model="loginForm.type" size="small">
              <el-radio label="0" border>管理员</el-radio>
              <el-radio label="1" border>医生</el-radio>
              <el-radio label="2" border>普通用户</el-radio>
            </el-radio-group>
          </div>
          <button @click="login">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎</h2>
        <!-- <img src="../images/cat/1.png" alt="" /> -->
        <p>已有账号</p>
        <button id="login" @click="toLogin">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎</h2>
        <!-- <img src="../images/cat/2.png" alt="" /> -->
        <p>没有账号？</p>
        <button id="register" @click="toRegister">去注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const form_box = ref(null)
const register_box = ref(null)
const login_box = ref(null)
const HomeView = () => import('./HomeView.vue')
const router = useRouter()

const loginForm = ref({
  name: '',
  password: '',
  type: '2',
});
function toLogin() {
  form_box.value.style.transform = 'translateX(0%)'
  login_box.value.classList.remove('hidden')
  register_box.value.classList.add('hidden')
}
async function login() {
  // ajax
  const PathRoute = {
    importPath: '../router/routes/user.js',
    path: '/user',
    setPath(path) {
      this.path = '/' + path
      this.importPath = '../router/routes/' + path + '.js'
    },
    typeToPath(type) {
      let path = 'admin';
      switch(type) {
        case 0: path = 'admin'; break;
        case 1: path = 'doctor'; break;
        case 2: path = 'user'; break;
      }
      return path;
    }
  }
  const p = PathRoute.typeToPath(loginForm.value.type);
  PathRoute.setPath(p);
  // 全局挂载路由权限信息
  globalThis.PathRoute = PathRoute;
  const { path, importPath } = PathRoute;
  const modules = import.meta.glob('../router/routes/*.js')
  const routes = await modules[importPath]()
  console.log(routes);
  router.addRoute(routes.default[0]);
  router.push(path)
}




const registerForm = ref({
  name: '',

})
function toRegister() {
  form_box.value.style.transform = 'translateX(80%)'
  register_box.value.classList.remove('hidden')
  login_box.value.classList.add('hidden')
}
async function register() {
  // ajax
  console.log("注册成功");
  toLogin();
}
</script>

<style scoped>
.fbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.container {
  width: 600px;
  height: 420px;
  background-color: #fff;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  /* 相对定位 */
  position: relative;
}
.form-box {
  /* 绝对定位 */
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #86a5b1;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}
.register-box,
.login-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.hidden {
  display: none;
  transition: 0.5s;
}
h1 {
  text-align: center;
  margin-bottom: 25px;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
}
input {
  background-color: transparent;
  width: 70%;
  color: #fff;
  border: none;
  /* 下边框样式 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px 0;
  text-indent: 10px;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 2px;
}
input::placeholder {
  color: #fff;
}
input:focus {
  color: white;
  outline: none;
  border-bottom: 1px solid #86a5b180;
  transition: 0.5s;
}
input:focus::placeholder {
  opacity: 0;
}
.form-box button {
  width: 70%;
  margin-top: 35px;
  background-color: #f6f6f6;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #86a5b1;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.form-box button:hover {
  background-color: #86a5b1;
  color: #f6f6f6;
  transition: background-color 0.5s ease;
}
.con-box {
  width: 50%;
  /* 弹性布局 垂直排列 居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 绝对定位 居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.con-box.left {
  left: -2%;
}
.con-box.right {
  right: -2%;
}
.con-box h2 {
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}
.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}
.con-box span {
  color: #d3b7d8;
}
.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}
.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: #86a5b1;
  border: 1px solid #86a5b1;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}
.con-box button:hover {
  background-color: #86a5b1;
  color: #fff;
}

.el-radio-group {
  width: 100%;
  justify-content: space-evenly;
}

label {
  margin: 2px;
  padding: 2px !important;
}
</style>
