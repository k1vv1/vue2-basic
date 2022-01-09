import layout from '@/components/common/layout/layout'
import Home from '@/pages/home/index.vue'
export default {
  path: '/',
  name: '首页',
  component: layout,
  children: [
    {
      path: '/home',
      component: Home
    }
  ]
}
