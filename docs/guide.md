# Development

## Installation

### npm

It is recommended to use npm for installation, which Works better with  [webpack](https://webpack.js.org/)  packaging tools.

```bash
npm install form-making -S
```

### CDN

Currently, you can get the latest resource from [unpkg.com/form-making](https://unpkg.com/form-making/), just need reference the Js and Css file as below:

```html
<!--  import style -->
<link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
<!--  import Javascript  -->
<script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>

<!-- import ace.js for preview function in form generator  -->
<script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
``` 

> It it recommended to lock version if you get the FormMaking via CDN, to prevent you current FormMaking  from being affected by incompatible updates.How to lock version please refer to [unpkg.com](https://unpkg.com/).

### Hello world

With the CDN approach we can easily use FormMaking to load form design pages.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- import style -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
</head>
<body>
  <div id="app">
    <!-- Set the height of the design area -->
    <fm-making-form style="height: 500px;" preview generate-code generate-json>
    </fm-making-form>
  </div>
</body>
  <!-- import Vue before Element -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <!-- import JavaScript -->
  <script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>
  <!-- import ace.js for preview function in form generator -->
  <script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
  
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</html>
```

## Quick start

### Import Element

The component library of element-ui is used in the project, and the 'Element' package needs to be imported when using it. Please refer to the element document for the specific introduction method [Quick Start](https://element.eleme.io/#/zh-CN/component/quickstart)

### Import FormMaking

#### Fully import

```javascript
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking)
```

Note:the style file needs to be imported separately.

#### Partly Import

```javascript
import {
  GenerateForm,
  MakingForm
} from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.component(GenerateForm.name, GenerateForm)
Vue.component(MakingForm.name, MakingForm)
/* or
 * Vue.use(GenerateForm)
 * Vue.use(MakingForm)
 */
```

#### Import ace.js

By default, ace.js is not imported. You need import it by yourself.

```html
<!-- ace.js is used for preview function -->
<script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
```

### Start to Use

#### MakingForm

``` html
<template>
  <fm-making-form 
    ref="makingform" 
    style="height: 500px;" 
    preview 
    generate-code 
    generate-json
  >
    <template slot="action">
    </template>
  </fm-making-form>
</template>
```

*You need set the height of the form generator,he default height is 100% based on the parent element.*

For detailed usage of components, please refer to [Components](/docs/component.zh-CN.md)

## Internationalization

Use `vue-i18n@5.x` for multi-language support.

### Language configuration

Supports Simplified Chinese (zh-CN) and English (en-US),the default language is Simplified Chinese (zh-CN)，if you want to use English (en-US), configure the parameter as below:

```js
Vue.use(FormMaking, {lang: 'en-US'})
```

If CDN is used for introduction, the configuration is as follows：

```html
<script>
  Vue.config.lang = 'zh-CN'
  new Vue({
    el: '#app'
  })
</script>
```

### Used in multilingual projects

#### compatibility with `vue-i18n@5.x`

```js
import Vue from 'vue'
import Element from 'element-ui'
import FormMaking from 'form-making'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
Vue.locale('zh-CN', {...zhLocale, message: 'hello'})
Vue.locale('en-US', {...enLocale, message: '你好'})
Vue.config.lang = 'zh-CN'

Vue.use(Element)

Vue.use(FormMaking, {lang: 'zh-CN', locale: Vue.locale})

new Vue({
  render: h => h(App)
}).$mount('#app')
```

#### compatibility with `vue-i18n@6.x` version or higher

```js
import Vue from 'vue'
import Element from 'element-ui'
import FormMaking from 'form-making'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    message: 'hello',
    ...enLocale
  },
  'zh-CN': {
    message: '你好',
    ...zhLocale
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-CN', // set locale
  messages, // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(FormMaking, {lang: 'zh-CN', i18n})

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
```

## Plug-in

### Rich text editor

If you need to use a rich text editor, you need to import `vue2-editor`

```js
import VueEditor from "vue2-editor"

Vue.use(VueEditor)
```
