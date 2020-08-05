<template>
  <div id="app">
    <div class="fm-header">
      <img class="fm-logo" src="./assets/logo.png">
      <div class="fm-title" @click="handleHome">{{$t('header.title')}}</div>

      <iframe style="vertical-align: middle;margin-top:10px;margin-left: 10px;" src="https://ghbtns.com/github-btn.html?user=GavinZhulei&repo=vue-form-making&type=star&count=true" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

      <div class="fm-link">

        <a target="_blank" href="http://form.xiaoyaoji.cn/pricing">{{$t('header.pricing')}}</a>
        <a target="_blank" href="https://gitee.com/gavinzhulei/vue-form-making/blob/master/README.zh-CN.md" v-if="$lang == 'zh-CN'">{{$t('header.document')}}</a>
        <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making/blob/master/README.md" v-if="$lang == 'en-US'">{{$t('header.document')}}</a>
        
        <a target="_blank" href="https://gitee.com/gavinzhulei/vue-form-making" v-if="$lang == 'zh-CN'">Gitee</a> 
        <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making">GitHub</a>

        <div class="action-item">
          <el-dropdown trigger="click" @command="handleLangCommand">
            <span class="el-dropdown-link">
              {{$route.params.lang == 'zh-CN' ? '简体中文' : 'English'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
              <el-dropdown-item command="en-US">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <a class="ad" href="http://form.xiaoyaoji.cn" target="_blank">{{$t('header.advanced')}}</a>
        <a class="ad" href="http://www.xiaoyaoji.cn" target="_blank" v-if="$lang == 'zh-CN'">小幺鸡接口工具</a>
      </div>
    </div>
    <div  class="fm-container"><router-view/></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'app',
  methods: {
    handleHome () {
      this.$router.push({path: '/'})
    },

    handleLangCommand (command) {
      this.$router.replace({name: this.$route.name, params: {lang: command}})
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

    .action-item{
      display: inline-block;
      margin-left: 15px;
      .el-dropdown{
        // font-size: 16px;
        // font-weight: 500;
      }
      .el-dropdown-link{
        cursor: pointer;
        color: #fff;

        &:hover{
          opacity: 0.8;
        }
      }

      &.action-item-user{
        .el-dropdown-link{
          color: #f5dab1;
        }
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
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
