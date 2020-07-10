# 组件

## 表单设计器（MakingForm）

### API

#### Props

| <div style="width: 120px;">参数 </div> | <div style="width: 287px;">说明</div> | <div style="width: 100px;">类型</div> | <div style="width: 100px;">默认值</div> |
| --- | ----------------------------------------- | ---------- | ---------------------------- |
| preview | 设计器预览操作按钮显示 | Boolean | fasle |  |
| generate-json | 设计器生成JSON按钮显示 | Boolean | false |  |
| generate-code | 设计器生成代码按钮显示 | Boolean | false |  |
| clearable | 设计器清空按钮显示 | Boolean | false |  |
| upload | 设计器导入JSON按钮显示 | Boolean | false | |
| basic-fields | 设计器左侧基础字段配置| Array | ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text'] |  |
| advance-fields | 设计器左侧高级字段配置 | Array | ['blank', 'imgupload', 'editor', 'cascader'] | |
| layout-fields | 设计器左侧布局字段配置 | Array | ['grid'] | |


#### Slots

| name | 说明 |
| --- | --- |
| action | 设计器头部操作按钮自定义区域 |

#### 方法

通过 [ref](https://cn.vuejs.org/v2/api/#ref) 可以获取到 MakingForm 实例并调用实例方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| getJSON | 获取设计器配置的JSON数据 | - |
| getHtml | 获取设计器生成的可以直接使用的HTML代码 | - |
| setJSON | 设置设计器的配置信息 | (value) 通过getJSON方法获取的JSON数据 |
| clear  | 清空设计器 | - |

### 代码演示

#### 自定义操作按钮

``` html
<template>
  <fm-making-form 
    ref="makingform" 
    style="height: 500px;" 
  >
    <template slot="action">
      <!-- 自定义操作区域插槽 -->
      <el-button type="text" icon="el-icon-upload">保存</el-button>
    </template>
  </fm-making-form>
</template>
```

#### 字段配置

``` html
<template>
  <fm-making-form 
    ref="makingform" 
    style="height: 500px;"
    :basic-fields="['input', 'textarea']"
    :advance-fields="['blank', 'fileupload']"
    :layout-fields="[]"
  >
  </fm-making-form>
</template>
```

#### 获取 `json` 数据

```html
<fm-making-form 
  ref="makingform" 
  style="height: 500px;" 
  preview 
  generate-code 
  generate-json
>
</fm-making-form>
```

```js
const json = this.$refs.makingform.getJSON()
```

## 表单生成器（GenerateForm）

### API

#### Props

| <div style="width: 120px;">参数 </div> | <div style="width: 287px;">说明</div> | <div style="width: 100px;">类型</div> | <div style="width: 100px;">默认值</div> |
| --- | ----------------------------------------- | ---------- | ---------------------------- |
| data | 表单json配置数据 | Object | - |
| value | 表单数据 | Object | - |
| remote | 表单获取数据远端方法 | Object | {} |

#### Events

| <div style="width: 150px;">事件名 </div> | <div style="width: 290px;">说明</div> | <div style="width: 200px;">回调参数</div> |
| --- | --- | --- |
| on-change | 表单数据变化时触发 | field: 数据改变的字段标识<br>value: 数据改变后的值 <br>data: 表单数据 |

#### 方法

通过 [ref](https://cn.vuejs.org/v2/api/#ref) 可以获取到 GenerateForm 实例并调用实例方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| getData | 获取表单数据 | - |
| reset | 重置表单数据 | - |

### 代码演示

#### 表单生成

直接根据设计器中生成的 `json` 即可渲染出表单，获取表单数据。

``` html
<template>
  <div>
    <fm-generate-form 
      :data="jsonData" 
      ref="generateForm"
    >
    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </div>
</template>
```

```js
export default {
  data () {
    return {
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1575897887618","remoteOption":"option_1575897887618"},"name":"单行文本","key":"1575897887618","model":"input_1575897887618","rules":[{"type":"string","message":"单行文本格式不正确"}]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":""}},
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        alert(JSON.stringify(data))
      }).catch(e => {
      })
    }
  }
}
```

#### 加载表单数据

```html
<template>
  <div>
    <fm-generate-form 
      :data="jsonData"
      :value="editData" 
      ref="generateForm"
    >
    </fm-generate-form>
  </div>
</template>
```
```js
export default {
  data () {
    return {
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1575897887618","remoteOption":"option_1575897887618"},"name":"名称","key":"1575897887618","model":"name","rules":[{"type":"string","message":"名称格式不正确"}]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":""}},
      editData: {
        /* 需要加载的表单数据可以在这里进行设置 */
        name: 'Gavin'
      },
    }
  }
}
```

#### 表单字段值改变事件

表单字段值改变后会触发 `on-change` 事件。

```html
<template>
  <div>
    <fm-generate-form 
      :data="jsonData" 
      @on-change="onChange"
      :value="formData"
      ref="generateForm"
    >
    </fm-generate-form>
  </div>
</template>
```

```js
export default {
  data () {
    return {
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1575897887618","remoteOption":"option_1575897887618"},"name":"名称","key":"1575897887618","model":"name","rules":[{"type":"string","message":"名称格式不正确"}]},{"type":"text","icon":"icon-wenzishezhi-","options":{"defaultValue":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1575906202073","remoteOption":"option_1575906202073"},"name":"","key":"1575906202073","model":"show","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":""}},
      formData: {
        show: ''
      }
    }
  },
  methods: {
    onChange (field, value) {
      if (field == 'name') {
        this.formData.show = value
      }
    }
  }
}
```
