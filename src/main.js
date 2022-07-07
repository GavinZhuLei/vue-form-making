import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import VueEditor from 'vue2-editor'

import 'element-ui/lib/theme-chalk/index.css'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
Vue.use(VueEditor)

const messages = {
  'en-US': {
    header: {
      title: 'FormMaking',
      document: 'Docs',
      pricing: 'Pricing',
      advanced: 'Advanced',
    }
  },
  'zh-CN': {
    header: {
      title: '表单设计器',
      document: '使用文档',
      pricing: '商业授权',
      advanced: '高级版本',
    }
  }
}

const i18n = new VueI18n({
  messages: {
    'en-US': {
      ...enLocale, ...messages['en-US']
    },
    'zh-CN': {
      ...zhLocale, ...messages['zh-CN']
    }
  }
})

Vue.use(ElementUI, { 
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './index'
Vue.use(FormMaking, {
  i18n
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
