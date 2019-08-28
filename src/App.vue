<template>
  <div id="app">
    <div class="fm-header">
      <img class="fm-logo" src="./assets/logo.png">
      <div class="fm-title" @click="handleHome">表单设计器</div>

      <div class="fm-link">
        <a target="_blank" href="http://tools.xiaoyaoji.cn/guide/installation.html">使用文档</a>
        <a target="_blank" href="http://tools.xiaoyaoji.cn/other/course.html">教程</a>
        <a target="_blank" href="http://tools.xiaoyaoji.cn/form/#/price">商业授权</a>
        <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making">GitHub</a>
        <a target="_blank" href="https://gitee.com/gavinzhulei/vue-form-making">码云</a>
        <a class="ad" href="http://www.xiaoyaoji.cn" target="_blank">小幺鸡接口文档</a>
        <a class="ad" target="_blank" href="http://book.wawo.xyz/">WAWO 好神奇</a>
      </div>
    </div>
    <div  class="fm-container"><router-view/></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    handleHome () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss">
.fm-header{
  height: 50px;
  box-shadow: 0 2px 10px rgba(70,160,252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right,#1278f6,#00b4aa);
  position: relative;

  .fm-logo{
    height: 26px;
    vertical-align: middle;
  }
  .fm-title{
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
  .fm-link{
    height: 50px;
    float: right;
    
    a{
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 15px;
      
      &:hover{
        opacity: 0.8;
      }

      &.ad{
        color: #f5dab1;
      }
    }
  }
}
.fm-container{
  height: calc(100% - 50px);
}
*, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
