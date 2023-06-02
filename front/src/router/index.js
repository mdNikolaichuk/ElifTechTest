import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../views/Order'
import Shops from '../views/Shops'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Shops
  },
  {
    path: '/order',
    name: 'about',
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
