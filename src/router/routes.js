
const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '',name:'Dashboard', component: () => import('pages/IndexPage.vue') },
      { path: '/user-management',name:'User Management', component: () => import('pages/UserManagement/IndexPage.vue') },
    ]
  },
  {
    path:'/auth',
    redirect: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path:'/login',name:'login',component:()=> import('pages/LoginPage.vue') },
      { path:'/register',name:'register',component:()=>import('pages/RegisterPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
