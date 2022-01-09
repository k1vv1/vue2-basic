const path = require('path')

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const files = require.context('./modules', false, /.js$/)
files.keys().forEach((key) => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules
})

export default store
