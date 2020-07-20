# Secondary Development

[![xscode](http://cdn.form.xiaoyaoji.cn/vue-form-making-banner.png)](https://xscode.com/gavinzhulei/vue-form-making)

> The secondary need development need fundamental comment of vue, regards vue you can refer to [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/).

## Get Source Code

```bash
git clone https://github.com/GavinZhuLei/vue-form-making.git
``` 

## Install Dependencies

```bash
npm install
```

## Run

```bash
npm run serve
```

## Build

You can rebuild the code if you have any change, and then put the package into dist directroy, the build command is as below:

```bash
npm run build-bundle
```

---

## Extend Form Attributes

You can extend the attributes of the component as you need,we will show you how to do this:

### 1. Add Form Attributes

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
            // put you own attributes here
          },
        },
      }
    }
  }
</script>
```

### 2. Modify MakeForm

open `src/components/FormConfig.vue`, modify the file to support your new attributes. the `props.data` is the config data widgetForm.config.

### 3. Modify GenerateForm

open  `src/components/GenerateForm.vue` , modify the file to add your new attributes.

## Extend Component

### 1. Add custom component information

Modify src/components/componentsConfig.js to add you custom component information,currently we have 3 objects to save the component information , they are basicComponents advanceComponents layoutComponents, which we call them [Basic Component], [Advanced Component], [Layout] in MakeForm:

``` javascript
{
  type: 'input', //component type
  name: 'text', //The name of component,which will display in MakeFrom
  icon: 'icon-input', //The icon of the component, you can customized the icon
  options: { // The configuration of component
    defaultValue: '', // Defalue value of the component
  }
}
```

### 2. Import the Component

Import you component in src/components/WidgetFormItem.vue 、 src/components/GenerateFormItem.vue as below:

``` javascript
import CustomComponent from 'your component location'
  
export default {
  components: {
    CustomComponent
  }
}
```

### 3. Modify WidgetConfig.vue

Modify src/components/WidgetConfig.vue according to your requirement, now you can use you own component in the FromMaking.

## Customized Icon

For default,we used Alibaba font icon library [iconfont](https://www.iconfont.cn/) , if you want to customized the icon, you can copy you own icon file into the project to replace the default icon, if default icon is in src/iconfont.

![image.png](http://docs.form.making.link/images/other/develop-1.en.png)