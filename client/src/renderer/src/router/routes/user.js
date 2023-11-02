const BookingView = () => import('../../views/user/BookingView.vue');
const LogView = () => import('../../views/user/LogView.vue');
const ProgressView = () => import('../../views/user/ProgressView.vue');

const routes = [
  {
    path: '/user',
    component: () => import('../../views/HomeView.vue'),
    children: [
      { path: '/user', redirect: '/user/booking'},
      { path: 'booking', component: BookingView, title: '体检预约'},
      { path: 'log', component: LogView, title: '体检记录'},
      { path: 'progress', component: ProgressView, title: '体检进度'}
    ]
  }, 
]

export default routes;