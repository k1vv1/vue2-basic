// 登录
export default [
  {
    path: '/403',
    component: () => import('@/pages/error/index.vue')
  },
  {
    path: '*',
    component: () => import('@/pages/error/index.vue')
  }
]
