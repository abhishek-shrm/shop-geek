import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '@/components/Header'

Vue.use(VueRouter)

let routes = [
  {
    path:'/',
    name:'Header',
    component:Header
  }
];

export default new VueRouter({
  routes
});
