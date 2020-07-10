# 开发指南

## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```bash
npm install form-making -S
```

### CDN

目前可以通过 [unpkg.com/form-making](https://unpkg.com/form-making/)获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>

<!-- 需要在设计器中预览代码需要引入ace.js库 -->
<script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
``` 

> 建议使用 CDN 引入 FormMaking 的用户在链接地址上锁定版本，以免将来 FormMaking 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com/)。

### Hello world

通过 CDN 的方式我们可以很容易地使用 FormMaking 来加载表单设计页面。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
</head>
<body>
  <div id="app">
    <!-- 需要设置编辑区域高度 -->
    <fm-making-form style="height: 500px;" preview generate-code generate-json>
    </fm-making-form>
  </div>
</body>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>
  <!-- 需要在设计器中预览代码需要引入ace.js库 -->
  <script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
  
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</html>
```

## 快速上手

### 引入 Element

项目中使用的是 element-ui 的组件库，在使用的时候需要引入 Element 包，具体引入方法请参考 Element 文档 [快速上手](https://element.eleme.io/#/zh-CN/component/quickstart)

### 引入 FormMaking

#### 完整引入

```javascript
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking)
```

以上代码便完成了 FormMaking 的引入。需要注意的是，样式文件需要单独引入。

#### 引入部分组件

```javascript
import {
  GenerateForm,
  MakingForm
} from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.component(GenerateForm.name, GenerateForm)
Vue.component(MakingForm.name, MakingForm)
/* 或写为
 * Vue.use(GenerateForm)
 * Vue.use(MakingForm)
 */
```

#### 引入 ace.js
默认情况下没有引入ace.js，如果需要使用ace.js，需要自己引入
```html
<!-- 需要在设计器中预览代码需要引入ace.js库 -->
<script src="https://unpkg.com/form-making/public/lib/ace/ace.js"></script>
```

### 开始使用

#### 表单设计器（MakingForm）

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
*使用时需要设置设计器的高度，默认情况高度是根据父元素 100% 来渲染*

组件的详细使用方法请参阅 [组件](/docs/component.zh-CN.md)

## 国际化

组件使用 `vue-i18n@5.x` 进行多语言支持

### 语言配置

组件支持中文简体(zh-CN)和英文(en-US)两种语言，默认使用中文简体，若希望使用英文，则需要进行如下配置：

```js
Vue.use(FormMaking, {lang: 'en-US'})
```

如果使用的是CDN方式引入，配置如下：

```html
<script>
  Vue.config.lang = 'zh-CN'
  new Vue({
    el: '#app'
  })
</script>
```

### 在多语言项目中使用

#### 兼容 `vue-i18n@5.x`

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

#### 兼容 `vue-i18n@6.x` 以上版本

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

## 插件

### 富文本编辑器

如果需要使用富文本编辑器，需要单独引入 `vue2-editor`

```js
import VueEditor from "vue2-editor"

Vue.use(VueEditor)
```