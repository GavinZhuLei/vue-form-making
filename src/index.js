import Vue from 'vue'
import 'normalize.css/normalize.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/regular/keyboard'
import 'vue-awesome/icons/regular/trash-alt'
import 'vue-awesome/icons/regular/clone'
import 'vue-awesome/icons/regular/dot-circle'
import 'vue-awesome/icons/regular/check-square'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/regular/calendar-alt'
import 'vue-awesome/icons/regular/clock'
import 'vue-awesome/icons/th'
import 'vue-awesome/icons/sort-numeric-up'
import 'vue-awesome/icons/regular/star'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/regular/caret-square-down'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/regular/image'
import 'vue-awesome/icons/chalkboard'
import MakingForm from './components/Container.vue'
import GenerateForm from './components/GenerateForm.vue'
import layoutComponents from './components/layoutComponents.js'

import GridLayout from './components/GridLayout.vue'
import DivLayout from './components/DivLayout.vue'
import TwoColumns from './components/TwoColumns.vue'
import ThreeColumns from './components/ThreeColumns.vue'

Vue.component('icon', Icon)
Vue.component(GridLayout.name, GridLayout)
Vue.component(DivLayout.name, DivLayout)
Vue.component(TwoColumns.name, TwoColumns)
Vue.component(ThreeColumns.name, ThreeColumns)

// Object.values(layoutComponents).forEach(component => {
//   console.log(component)
//   Vue.component(component.name, component)
// })


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
