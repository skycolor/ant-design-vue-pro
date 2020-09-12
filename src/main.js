// babel最新语法适配
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

// mock接口
import './mock'

// 给vuex赋默认值
import bootstrap from './core/bootstrap'
// 引入and部分组件、vue指令、
import './core/lazy_use'
// 路由的before和after处理
import './permission'
// 全局vue过滤器
import './utils/filter'
// 全局css
import './global.less'

Vue.config.productionTip = false

// 全局在vue原型链上加入$http的请求方式
Vue.use(VueAxios)
// 注册pro-layout的UI
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
