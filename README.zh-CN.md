# vue-form-making

<p>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.5-brightgreen.svg" alt="vue">
  </a>
  
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.9.1-brightgreen.svg" alt="element-ui">
  </a>
  
  <a href="https://www.npmjs.com/package/form-making">
    <img src="https://img.shields.io/npm/dt/form-making" alt="downloads">
  </a>
  
  <a href="https://github.com/GavinZhuLei/vue-form-making/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/GavinZhulei/vue-form-making" alt="license">
  </a>
</p>

简体中文 | [English](./README.md)

基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element) 实现的可视化表单设计器，使用了最新的前端技术栈，内置了 i18n 国际化解决方案，可以让表单开发简单而高效。

**该项目为基础版本，如果需要体验高级版本的功能，可以前往  [高级版本](http://form.making.link)，提供了更多的组件和功能，并且支持 Vue3 。**

![](https://cdn.form.making.link/Jietu20200708-202415-HD.gif)

* [在线预览](https://form.making.link/basic-version)
* [开发指南](/docs/guide.zh-CN.md)
* [组件](/docs/component.zh-CN.md)
  * [MakingForm](/docs/component.zh-CN.md#表单设计器makingform) 表单设计器（基于可视化操作快速设计出表单页面）。
  * [GenerateForm](/docs/component.zh-CN.md#表单生成器generateform) 表单生成器（根据设计器中获取的配置 json 数据，快速渲染出表单页面）。
* [二次开发](/docs/develop.zh-CN.md)

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
* 国际化支持

## 高级版本

相较于基础版本，高级版本提供了更丰富的功能：

* 页面更加美观；
* 通过点击即可快速添加字段；
* 更多的属性设置，包括数据源与表单事件；
* 更多的控件字段（子表单、自定义组件等）；
* 更多的布局容器，并且可以相互嵌套（栅格、表格、标签页）；
* 更多的API，满足更复杂的业务需求；
* 加入自定义字段，可以快速将自己开发的组件引入；
* 可快速添加自定义样式；
* 支持数据源，方便表单数据配置；
* 支持动作事件，可以让表单更加灵活配置；
* 多终端适配展示；
* 提供了 Ant Design 风格的组件（通过引入 antd vue 修改）；
* 支持 Vue3；

[点击前往](https://form.making.link)

## 第三方插件

* [vuedraggable](https://github.com/SortableJS/Vue.Draggable)
* [element-ui](https://github.com/ElemeFE/element)
* [ace](https://github.com/ajaxorg/ace)
* [vue2-editor](https://github.com/davidroyer/vue2-editor)

## 捐赠

如果觉得还不错，请作者喝杯咖啡吧 ☺

![](http://docs.form.making.link/donation.jpeg)

[PayPal Me](https://paypal.me/gavinzhulei)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://user-gold-cdn.xitu.io/2020/7/8/1732e40d01d856c3?w=48&h=48&f=png&s=3574" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://user-gold-cdn.xitu.io/2020/7/8/1732e40e774b0ae3?w=48&h=48&f=png&s=3943" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://user-gold-cdn.xitu.io/2020/7/8/1732e40d043ea030?w=48&h=48&f=png&s=3678" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://user-gold-cdn.xitu.io/2020/7/8/1732e40d044e39d2?w=48&h=48&f=png&s=5240" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## 开源协议

MIT
