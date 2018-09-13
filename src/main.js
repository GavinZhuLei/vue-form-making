import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// import 'form-making/dist/index.css'
// import {MakingForm} from 'form-making'

import {MakingForm} from './index'
Vue.component(MakingForm.name, MakingForm)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
