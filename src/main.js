import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { injectGlobal } from './common'
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.less'
import './style/common.less'
import './style/global.less'
import './filters/filter'
import eventBus from '@/common/eventBus'

Vue.prototype.$eventBus = eventBus

//全局注入
injectGlobal()

Vue.config.productionTip = false
const globalVue = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
window.globalVue = globalVue
window.ydStorage && ydStorage.postItem()
