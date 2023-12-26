<template>
  <div class="container">
    <div class="shell loginbox" ref="loginBox">
      <h2 class="title">Login</h2>
      <input type="text" class="username" placeholder="请输入用户名" v-model="loginForm.name"/>
      <input type="password" class="password" placeholder="Password" v-model="loginForm.password"/>
      <select name="" id="" v-model="loginForm.type">
        <option value="0">管理员</option>
        <option value="1">医生</option>
        <option value="2">普通用户</option>
      </select>
      <button @click="login" class="btn" v-throttle>登录</button>
      <div class="footer">
        <div class="Remember">
          <input type="checkbox" id="rememberMe" />
          <label for="rememberMe">记住我</label>
        </div>
        <button class="Swi" @click="showRegBox">去注册</button>
      </div>
    </div>

    <div class="shell regbox" ref="regBox">
      <h2 class="title">注册</h2>
      <input type="text" class="username" placeholder="Username" v-model="regForm.name"/>
      <input type="password" class="password" placeholder="Password" v-model="regForm.password"/>
      <button class="btn" @click="register" v-throttle="10000">注册并登录</button>
      <div class="footer">
        <div></div>
        <button class="Swi" @click="showLoginBox">去登录</button>
      </div>
    </div>
  </div>
</template> 

<script setup>
import { userApi } from '@renderer/http/api/crud';
import { auth_login } from '@renderer/http/api/sp'
import { useUserStore } from '@renderer/store/user';

const userStore = useUserStore();
  const router = useRouter();
  const loginBox = ref(null)
  const regBox = ref(null)
 
  const loginForm = ref({
    name: '',
    password: '',
    type: '0'
  })

  const showLoginBox = () => {
    loginBox.value.style.display = 'block'
    regBox.value.style.display = 'none'
  }

  const showRegBox = () => {
    regBox.value.style.display = 'block'
    loginBox.value.style.display = 'none'
  }

  const login = () => { 
    if(loginForm.value.name.trim() == '' || loginForm.value.password.trim() == '') {
      alert('用户名或密码不能为空');
      return;
    }
    // 登录逻辑
    _login({type: parseInt(loginForm.value.type), name: loginForm.value.name, password: loginForm.value.password});
  }

  const regForm = ref({
    name: '',
    password: '',
  })

  const _login = async (data) => {
    let { type, id } = data;

    id = parseInt(id);
    // 鉴权认证
    const info = await auth_login(type, data);
    console.log(info);
    // 认证通过，保存登录信息
    localStorage.setItem('userType', type);
    localStorage.setItem('userId', info.id);
    userStore.setId(info.id);
    userStore.setName(info.name);
    userStore.setPassword(info.password);
    userStore.setBalance(info.balance || 0);
    // 跳转页面
    if(type == 0) router.push('/admin');
    else if(type == 1) router.push('/doctor');
    else router.push('/user');
  }

  const register = async () => {
    if(regForm.value.name.trim() == '' || regForm.value.password.trim() == '') {
      alert('用户名或密码不能为空');
      return;
    }
    if(regForm.value.password.trim().length < 6) {
      alert('密码长度不能小于6');
      return;
    }
    console.log("准备注册");
    // 注册逻辑
    try {
      await ElMessageBox.confirm('注册账号后需使用ID和密码进行登录，请牢记!，点击头像可以查看自己的ID和相关信息', '提示', {
        confirmButtonText: '我已了解',
        cancelButtonText: '取消注册',
        type: 'warning'
      })
      const user = await userApi.create(regForm.value);
      ElMessage.success('注册成功');
      _login({ type: 2, id: user.name, password: user.password })
    } catch {
      ElMessage.error('注册失败');
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/02.webp');
  background-size: cover;
}

.shell {
  width: 350px;
  padding: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff49;
  border-radius: 50px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5) inset;
  transform: translateY(-50px);
}

.title {
  font-size: 80px;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 0 0 10px #ff9dff80;
}

input[type='text'],
input[type='password'],
select,
option {
  width: 100%;
  height: 50px;
  margin: 10px 0;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  border: 5px solid transparent;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  padding: 5px 20px 0 20px;
  transition: 0.3s;
  font-size: 18px;
  outline: none;
}

input[type='text']:hover,
input[type='password']:hover,
select:hover {
  background: rgba(255, 255, 255, 0);
  border: 5px solid #ffffff;
}

button.btn {
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 15px 0;
  border-radius: 100px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  letter-spacing: 3px;
}

input::placeholder {
  color: #92a7e8;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.Remember {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #7597ff;
}

input[type='checkbox'] {
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-color: #007bff;
}

.Swi {
  border: none;
  background-color: #ffffff00;
  color: #7597ff;
  font-size: 18px;
}

.regbox {
  display: none;
}
</style>
