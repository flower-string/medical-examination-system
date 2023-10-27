const BookingView = () => import('../../views/user/BookingView.vue');
const LogView = () => import('../../views/user/LogView.vue');

const routes = [
  {
    path: '/user',
    component: () => import('../../views/HomeView.vue'),
    children: [
      { path: '/user', redirect: '/user/booking'},
      { path: 'booking', component: BookingView, title: '体检预约'},
      { path: 'log', component: LogView, title: '体检记录'},
    ]
  }, 
]

export default routes;