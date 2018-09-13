import Vue from 'vue'
import MakingForm from './components/Container.vue'
import GenerateForm from './components/GenerateForm.vue'

MakingForm.install = function (Vue) {
  Vue.component(MakingForm.name, MakingForm)
}

GenerateForm.install = function (Vue) {
  Vue.component(GenerateForm.name, GenerateForm)
}

const components = [
  MakingForm,
  GenerateForm
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// module.exports = {
//   MakingForm,
//   GenerateForm
// }

// module.exports.default = module.exports

export default {
  MakingForm,
  GenerateForm
}
