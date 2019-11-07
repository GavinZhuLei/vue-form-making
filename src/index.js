import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css'

import MakingForm from './components/Container.vue'
import GenerateForm from './components/GenerateForm.vue'

import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

import './iconfont/iconfont.css'
import './styles/cover.scss'
import './styles/index.scss'

const loadLang = function (Vue, lang, locale, i18n) {
  if (locale) {
    locale('en-US', {...locale('en-US'), ...enUS})
    locale('zh-CN', {...locale('zh-CN'), ...zhCN})
    Vue.config.lang = lang
  } else if (i18n) {
    i18n.setLocaleMessage('en-US', {...i18n.messages['en-US'], ...enUS})
    i18n.setLocaleMessage('zh-CN', {...i18n.messages['zh-CN'], ...zhCN})
    i18n.locale = lang
  } else {
    Vue.use(VueI18n)
    Vue.locale('en-US', {...Vue.locale('en-US'), ...enUS})
    Vue.locale('zh-CN', {...Vue.locale('zh-CN'), ...zhCN})
    Vue.config.lang = lang
  }
}

MakingForm.install = function (Vue, opts = {
  lang: 'zh-CN',
  locale: null,
  i18n: null
}) {
  loadLang(Vue, opts.lang, opts.locale, opts.i18n)
  Vue.component(MakingForm.name, MakingForm)
}

GenerateForm.install = function (Vue, opts = {
  lang: 'zh-CN',
  locale: null,
  i18n: null
}) {
  loadLang(Vue, opts.lang, opts.locale, opts.i18n)
  Vue.component(GenerateForm.name, GenerateForm)
}

const components = [
  MakingForm,
  GenerateForm
]

const install = function (Vue, opts = {
  lang: 'zh-CN',
  locale: null,
  i18n: null
}) {
  loadLang(Vue, opts.lang, opts.locale, opts.i18n)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  MakingForm,
  GenerateForm
}

export default {
  install,
  MakingForm,
  GenerateForm
}
