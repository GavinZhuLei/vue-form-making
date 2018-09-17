import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import Test from '../Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})