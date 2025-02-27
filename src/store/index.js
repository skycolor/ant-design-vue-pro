import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// 默认路由权限控制
import permission from './modules/permission'

// 交互路由控制
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
