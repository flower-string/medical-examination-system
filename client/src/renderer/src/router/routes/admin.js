const MedicalItem = () => import('../../views/admin/MedicalItemView.vue');
const Member = () => import('../../views/admin/MemberView.vue');
const Statisics = () => import('../../views/admin/StatisticsView.vue');

const routes = [
  {
    path: '/admin',
    component: () => import('../../views/HomeView.vue'),
    children: [
      { path: '/admin', redirect: '/admin/statistics'},
      { path: 'statistics', component: Statisics, title: '数据统计'},
      { path: 'member', component: Member, title: '成员管理'},
      { path: 'medical-item', component: MedicalItem, title: '体检项目管理'},
    ]
  },
  
]

export default routes;