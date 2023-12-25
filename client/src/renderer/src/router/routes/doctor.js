const DUserView = () => import('../../views/doctor/DUserView.vue');
const DStatisticsView = () => import('../../views/doctor/DStatisticsView.vue')

const routes = [
  {
    path: '/doctor',
    component: () => import('../../views/HomeView.vue'),
    children: [
      { path: '/doctor', redirect: '/doctor/user'},
      { path: 'user', component: DUserView, title: '用户服务' },
      { path: 'statistics', component: DStatisticsView, title: '数据统计' }
    ]
  }
]

export default routes;