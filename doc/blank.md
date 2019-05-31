## 自定义扩展字段

该扩展相当于是引入一个作用域插槽，可以参考[作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)

下面来看看步骤：

1. 首先在设计器中配置需要绑定的数据key和数据类型，这里需要设置下你绑定的到表单中的数据类型，防止类型报错

  ![](https://user-gold-cdn.xitu.io/2018/10/27/166b55ab4883ecbe?w=1127&h=341&f=png&s=27636)

2. 在 fm-generate-form 中引入自定义内容，如：

  ```html
  <generate-form >
    <template slot="blank" slot-scope="scope">
      宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
      高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
    </template>
  </generate-form>
  ```

3.  至此自定义内容区域就绑定好了，预览效果如下：

  ![](https://user-gold-cdn.xitu.io/2018/10/27/166b5a15b837f3fe?w=867&h=320&f=png&s=18568)