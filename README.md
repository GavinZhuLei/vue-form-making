# form-making
基于Vue,ElementUI开发的一款表单设计器，提高表单开发效率的利器，让开发者从枯燥的表单代码编写中解放出来

工具地址：http://tools.xiaoyaoji.cn/form

![](https://user-gold-cdn.xitu.io/2018/9/27/1661a6cd60454273)

## 特性

* 可视化配置页面
* 提供栅格布局，并采用flex实现对齐
* 一键预览配置的效果
* 一键生成配置json数据
* 一键生成代码，立即可运行
* 提供自定义组件满足用户自定义需求
* 提供远端数据接口，方便用户需要异步获取数据加载
* 提供功能强大的高级组件
* 支持表单验证
* 快速获取表单数据

## CDN
``` html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/form-making/dist/FormMaking.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/form-making/dist/FormMaking.umd.js"></script>
```

## Install
```shell
npm install form-making -S
```

## Quick Start
``` javascript
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
Vue.use(FormMaking)

// or
import {
  GenerateForm
} from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.component(GenerateForm.name, GenerateForm)
```

## Template
``` html
<fm-generate-form></fm-generate-form>
```

## 功能介绍

通过 [在线地址](http://tools.xiaoyaoji.cn/form) 或者拉取代码自己打包到项目生成的JSON，用于表单渲染
![](https://user-gold-cdn.xitu.io/2018/9/27/1661a50b64f77e5f?w=1580&h=1080&f=png&s=162948)

下面就是加载对应的数据用于展示，假设你已经正确加载组件

``` html
<fm-generate-form 
    :data="jsonData" 
    :remote="remoteFuncs" 
    :value="values"
    ref="generateForm">
</fm-generate-form>
```
``` javascript
new Vue({
    ...
    data () {
        return {
            jsonData: {}, // 表单配置中生成的json数据
            values: {}, // 表单需要显示的表单数据
            remoteFuncs: {
                // 组件配置时配置的远端方法,保持和配置时输入的名称一致
                func_test (resolve) {
                  // 模拟接口请求
                  setTimeout(() => {
                    const options = [
                      {id: '1', name: '1111'},
                      {id: '2', name: '2222'},
                      {id: '3', name: '3333'}
                    ]
                    
                    // 获取到的值和标签可以通过配置页远端配置
                    // 值:id  标签：name
        
                    resolve(options) // 将后端获取的数据放入回调函数中
                  }, 2000)
                },
                func_test2....
            }
        }
    },
    methods: {
        ...{
            // 调用此方法验证表单数据和获取表单数据
            this.$refs.generateForm.getData().then(data => {
                // 数据校验成功
                // data 为获取的表单数据
            }).catch(e => {
                // 数据校验失败
            })
        }
    }
})
```
## 问题交流

QQ群：902048874