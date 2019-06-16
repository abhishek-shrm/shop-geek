import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(vueRouter)

export default new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
})
