// 路由
import * as VueRouter from 'vue-router'
import adminRoute from './routes/admin';
import doctorRoute from './routes/doctor';
import userRoute from './routes/user';
const LoginView = () => import('../views/LoginView.vue')



const routes = [
  {
    path: '/',
    redirect: '/login',
  }, 
  {
    path: '/login',
    component: LoginView,
  },
]

export default VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes: [...routes, ...adminRoute, ...doctorRoute, ...userRoute], // `routes: routes` 的缩写
})

