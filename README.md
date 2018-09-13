# vue-form-making
基于Vue,ElementUI快速创建表单，进行数据校验，获取表单数据

## CDN
``` html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/form-making@0.1.8/dist/FormMaking.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/form-making@0.1.8/dist/FormMaking.umd.js"></script>
```

## Hello world
``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="https://unpkg.com/form-making@0.1.8/dist/FormMaking.css">
</head>
<body>
  <div id="app">
    <fm-making-form></fm-making-form>
  </div>
</body>
  <!-- import Vue before Element -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script src="https://unpkg.com/form-making@0.1.8/dist/FormMaking.umd.js"></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</html>
```

## Install
```shell
npm install form-making -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
Vue.use(ElementUI, { size: 'small' })
Vue.use(FormMaking)

// or
import {
  MakingForm
} from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.component(MakingForm.name, MakingForm)
```

## Template
``` html
<fm-making-form></fm-making-form>
```