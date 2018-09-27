<template>
  <div class="fm-uplaod-container"
    :id="uploadId"
  >
    <div 
      :id="item.key"
      :style="{width: width+'px', height: height+'px'}"
      :class="{uploading: item.status=='uploading', 'is-success': item.status=='success'}"
      class="upload-file" v-for="(item) in fileList" :key="item.key">
      <img :src="item.url" />

      <el-progress v-if="item.status=='uploading'" :width="miniWidth*0.9" class="upload-progress" type="circle" :percentage="item.percent"></el-progress>

      <label class="item-status" v-if="item.status=='success'">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label>

      <div class="uplaod-action">
        <i class="el-icon-view" @click="handlePreviewFile(item.key)" :style="{'font-size': miniWidth/4+'px'}"></i>
        <i class="el-icon-delete" @click="handleRemove(item.key)" :style="{'font-size': miniWidth/4+'px'}"></i>
      </div>
    </div>

    <div class="el-upload el-upload--picture-card"
      v-if="token"
      :style="{width: width+'px', height: height+'px'}"
    >
      <i class="el-icon-plus" :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>
      <input accept="image/*" multiple ref="uploadInput" @change="handleChange" type="file" :style="{width: width+'px', height: height+'px'}" name="file" class="el-upload__input upload-input">
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
require('viewerjs/dist/viewer.css')

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 9
    }
  },
  data () {
    return {
      fileList: [],
      viewer: null,
      uploadId: 'upload_' + new Date().getTime()
    }
  },
  computed: {
    miniWidth () {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    }
  },
  methods: {
    handleChange () {
      console.log(this.$refs.uploadInput.files)
      const files = this.$refs.uploadInput.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)

        reader.readAsDataURL(file)
        reader.onload = () => {
          this.fileList.push({
            key,
            url: reader.result,
            percent: 0,
            status: 'uploading'
          })

          this.$nextTick(() => {
            this.uplaodAction(reader.result, file, key)
          })
        }
      }

      this.$refs.uploadInput.value = []
    }, 

    uplaodAction (res, file, key) {
      let changeIndex = this.fileList.findIndex(item => item.key === key)
      console.log(this.fileList.findIndex(item => item.key === key))

      const xhr = new XMLHttpRequest()
      const url = 'http://upload-z2.qiniu.com/putb64/' + file.size
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Authorization', 'UpToken ' + this.token)
      xhr.send(res.split(',')[1])
      xhr.onreadystatechange = () => {
        console.log(xhr)
        if (xhr.readyState === 4) {
          let resData = JSON.parse(xhr.response)
          if (resData) {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              url: this.domain + resData.key,
              percent: 100
            })
            setTimeout(() => {
              this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
                ...this.fileList[this.fileList.findIndex(item => item.key === key)],
                status: 'success'
              })

              this.$emit('input', this.fileList)
            }, 200)
          } else {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              status: 'error'
            })
            this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
          }
        }
      }
      xhr.onprogress = (res) => {
        console.log('progress', res)
        if (res.total && res.loaded) {
          this.$set(this.fileList[this.fileList.findIndex(item => item.key === key)], 'percent', res.loaded/res.total*100)
        }
      }
    },

    handleRemove (key) {
      this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
    },

    handlePreviewFile (key) {
      this.viewer && this.viewer.destroy()
      this.uploadId = 'upload_' + new Date().getTime()
      
      console.log(this.viewer)
      this.$nextTick(() => {
        this.viewer = new Viewer(document.getElementById(this.uploadId))
        this.viewer.view(this.fileList.findIndex(item => item.key === key))
      })
    }
  }
}
</script>

<style lang="scss">
.fm-uplaod-container{
  .upload-file{
    margin: 0 10px 10px 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #fff;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;

    &:hover{
      .uplaod-action{
        display: flex;
      }
    }

    .uplaod-action{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.6);
      display: none;
      justify-content: center;
      align-items: center;

      i{
        color: #fff;
        cursor: pointer;
        margin: 0 5px;
      }
    }

    &.is-success{
      .item-status{
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);

        &>i{
          font-size: 12px;
          margin-top: 11px;
          color: #fff;
          transform: rotate(-45deg);
        }
      }
    }

    &.uploading{
      &:before{
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
      }
    }

    .upload-progress{
      position: absolute;

      .el-progress__text{
        color: #fff;
        font-size: 16px !important;
      }
    }

    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }

  .el-upload--picture-card{
    position: relative;
    overflow: hidden;

    .el-icon-plus{
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .upload-input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
