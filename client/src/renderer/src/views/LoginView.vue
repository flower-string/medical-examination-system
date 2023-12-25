<template>
  <div class="container">
    <div class="shell loginbox" ref="loginBox">
      <h2 class="title">Login</h2>
      <input type="text" class="username" placeholder="Username" v-model="loginForm.id"/>
      <input type="password" class="password" placeholder="Password" v-model="loginForm.password"/>
      <select name="" id="" v-model="loginForm.type">
        <option value="0">管理员</option>
        <option value="1">医生</option>
        <option value="2">普通用户</option>
      </select>
      <button @click="login" class="btn">登录</button>
      <div class="footer">
        <div class="Remember">
          <input type="checkbox" id="rememberMe" />
          <label for="rememberMe">记住我</label>
        </div>
        <button class="Swi" @click="showRegBox">去注册</button>
      </div>
    </div>

    <div class="shell regbox" ref="regBox">
      <h2 class="title">Register</h2>
      <input type="text" class="username" placeholder="Username" v-model="regForm.name"/>
      <input type="password" class="password" placeholder="Password" v-model="regForm.password"/>
      <button class="btn" @click="register">注册并登录</button>
      <div class="footer">
        <div></div>
        <button class="Swi" @click="showLoginBox">去登录</button>
      </div>
    </div>
  </div>
</template> 

<script setup>
  import loginApi from '../http/api/login';
  import { userApi } from '@renderer/http/api/crud';
  const router = useRouter();
  const loginBox = ref(null)
  const regBox = ref(null)
 
  const loginForm = ref({
    id: '',
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
    if(loginForm.value.id.trim() == '' || loginForm.value.password.trim() == '') {
      alert('用户名或密码不能为空');
      return;
    }
    // 登录逻辑
    _login({type: parseInt(loginForm.value.type), id: loginForm.value.id, password: loginForm.value.password});
  }

  const regForm = ref({
    name: '',
    password: '',
  })

  const _login = async (data) => {
    let { type, id } = data;

    id = parseInt(id);
    console.log(type, id);
    // 鉴权认证

    // 认证通过，跳转页面
    if(type == 0) router.push('/admin');
    else if(type == 1) router.push('/doctor');
    else router.push('/user');

    // 保存登录信息
    localStorage.setItem('userType', type);
    localStorage.setItem('userId', id);
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
    // 注册逻辑
    try {
      await ElMessageBox.confirm('注册账号后需使用ID和密码进行登录，请牢记!', '提示', {
        confirmButtonText: '我已了解',
        cancelButtonText: '取消注册',
        type: 'warning'
      })
      const user = await userApi.create(regForm.value);
      ElMessage.success('注册成功');
      console.log("用户信息", user);
      _login({ type: 2, id: user.id, password: user.password })
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
