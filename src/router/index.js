import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = []
const files = require.context('./map', false, /.js$/)
files.keys().forEach((key) => {
  const route = files(key).default
  if (Array.isArray(route)) {
    for (let item of route) {
      routes.push(item)
    }
  } else {
    routes.push(route)
  }
})

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
