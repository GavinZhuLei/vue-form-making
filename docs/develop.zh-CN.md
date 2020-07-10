# 二次开发

二次开发用于商业用途需要购买商业授权，具体详情请查看 [商业授权说明](http://form.making.link/pricing)

> 二次开发需要 vue 的基础，如果还不了解 vue 请查看 [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)

## 获取代码

```bash
git clone https://github.com/GavinZhuLei/vue-form-making.git
``` 

## 安装项目依赖包

```bash
npm install
```

如果安装失败，需要使用淘宝镜像地址，设置方法如下：

``` bash
npm config set registry https://registry.npm.taobao.org
```

## 运行项目

```bash
npm run serve
```

运行启动的项目是引用设计器的官方网站代码，设计器源码在 `src/components` 下面

## 打包设计器

修改代码后，可以通过以下代码重新对设计器进行打包，打包过后放在 dist/ 目录下面，可在代码中直接引用

```bash
npm run build-bundle
```

---

## 扩展表单属性

下面将介绍如何在设计器的基础上二次开发扩展自定义组件

### 1. 添加配置参数

src/components/Container.vue
```javascript
<script>
  export default {
    // ...
   	data () {
      return {
        widgetForm: {
          list: [],
          config: {
            labelWidth: 100,
            labelPosition: 'top',
            size: 'small'
            // 在此处扩展表单的配置信息
          },
        },
      }
    }
  }
</script>
```

### 2. 扩展设计器配置

`src/components/FormConfig.vue` 下添加对表单的配置，其中 props.data 是上面配置信息的 widgetForm.config

### 3. 添加渲染信息

配置完成后，最后就是渲染，在 `src/components/GenerateForm.vue` 下添加自己增加的配置即完成了对表单属性的扩展

## 扩展组件

### 1. 添加自定义组件信息

src/components/componentsConfig.js 下添加配置信息，目前包括 basicComponents advanceComponents layoutComponents 三个对象，分别对应设计器中基础字段、高级字段、布局字段，将配置信息添加到对应的字段下面:

``` javascript
{
  type: 'input', // 组件类型，保持唯一
  name: '单行文本', //组件展示名称
  icon: 'icon-input', //组件展示icon, 如果需要自定义，请参考 如何自定义图标
  options: { // 组件配置信息，根据自定义组件自己添加配置
    defaultValue: '', // 该值表示组件的默认值
  }
}
```

### 2. 引用组件

src/components/WidgetFormItem.vue 、 src/components/GenerateFormItem.vue 下分别引入自定义的组件:

``` javascript
import CustomComponent from '你的组件地址'
  
export default {
  components: {
    CustomComponent
  }
}
```

### 3. 添加组件配置信息

src/components/WidgetConfig.vue 下根据自己要求添加配置信息, props.data 结构为上面的配置信息，至此，自定义扩展的组件就成功的引入到设计器中。

## 自定义图标

项目使用的是阿里字体图标库 [iconfont](https://www.iconfont.cn/) , 如果需要自定义图标配置，请将图标加入到自己的项目中，然后选择Font class，将代码下载到本地替换 src/iconfont 文件夹下的文件

![image.png](http://docs.form.making.link/images/other/develop-1.en.png)