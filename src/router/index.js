import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/price',
      name: 'price',
      component: () => import('../demo/Price.vue')
    }
  ]
})