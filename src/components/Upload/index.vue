<template>
  <div class="fm-uplaod-container"
    :id="uploadId"
  >
    <draggable class="drag-img-list"
      v-model="fileList"
      v-bind="{group: uploadId, ghostClass: 'ghost', animation: 200}"
      :no-transition-on-drag="true"
    >
      <div 
        :id="item.key"
        :style="{width: width+'px', height: height+'px'}"
        :class="{uploading: item.status=='uploading', 'is-success': item.status=='success', 'is-diabled': disabled}"
        class="upload-file" v-for="(item) in fileList" :key="item.key">
        <img :src="item.url" />

        <el-progress v-if="item.status=='uploading'" :width="miniWidth*0.9" class="upload-progress" type="circle" :percentage="item.percent"></el-progress>

        <label class="item-status" v-if="item.status=='success'">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>

        <div class="uplaod-action" :style="{height: miniWidth / 4 + 'px'}" v-if="!disabled">
          <i class="iconfont icon-tupianyulan" :title="$t('fm.upload.preview')" @click="handlePreviewFile(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
          <i v-if="isEdit" class="iconfont icon-sync1" :title="$t('fm.upload.edit')" @click="handleEdit(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
          <i v-if="isDelete && fileList.length > min" class="iconfont icon-delete" :title="$t('fm.upload.delete')" @click="handleRemove(item.key)" :style="{'font-size': miniWidth/8+'px'}"></i>
        </div>
      </div>
    </draggable>

    <div class="el-upload el-upload--picture-card"
      :class="{'is-disabled': disabled}"
      v-show="(!isQiniu || (isQiniu && token)) && fileList.length < length"
      :style="{width: width+'px', height: height+'px'}"
      @click.self="handleAdd"
    >
      <i class="el-icon-plus" @click.self="handleAdd" :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>
      <input accept="image/*" v-if="multiple"  multiple ref="uploadInput" @change="handleChange" type="file" :style="{width: 0, height: 0}" name="file" class="el-upload__input upload-input">
      <input accept="image/*" v-else ref="uploadInput" @change="handleChange" type="file" :style="{width:0, height: 0}" name="file" class="el-upload__input upload-input">
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import Draggable from 'vuedraggable'
import * as qiniu from 'qiniu-js'
require('viewerjs/dist/viewer.css')
export default {
  components: {
    Draggable
  },
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
      default: false
    },
    length: {
      type: Number,
      default: 9
    },
    isQiniu: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    meitu: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: this.value.map(item => {
        return {
          key: item.key ? item.key : (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999),
          url: item.url,
          percent: item.percent ? item.percent : 100,
          status: item.status ? item.status : 'success'
        }
      }),
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      editIndex: -1,
      meituIndex: -1,
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
  mounted () {
    this.$emit('input', this.fileList)
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
          if (this.editIndex >= 0) {

            this.$set(this.fileList, this.editIndex, {
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading'
            })

            this.editIndex = -1
          } else {
            this.fileList.push({
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading'
            })
          }

          this.$nextTick(() => {
            if (this.isQiniu) {
              this.uplaodAction2(reader.result, file, key)
            } else {
              this.uplaodAction(reader.result, file, key)
            }
          })
        }
      }
      this.$refs.uploadInput.value = []
    }, 
    uplaodAction (res, file, key) {
      let changeIndex = this.fileList.findIndex(item => item.key === key)
      console.log(this.fileList.findIndex(item => item.key === key))
      const xhr = new XMLHttpRequest()
      
      const url = this.action
      xhr.open('POST', url, true)
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data')

      let formData = new FormData()
      formData.append('file', file)

      xhr.send(formData)
      xhr.onreadystatechange = () => {
        console.log(xhr)
        if (xhr.readyState === 4) {
          
          let resData = JSON.parse(xhr.response)
          if (resData && resData.url) {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              url: resData.url,
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
    uplaodAction2 (res, file, key) {
      const _this = this
      const observable = qiniu.upload(file, key, this.token, {
        fname: key,
        mimeType: []
      }, {
        useCdnDomain: true,
        region: qiniu.region.z2
      })
      observable.subscribe({
        next (res) {
          _this.$set(_this.fileList[_this.fileList.findIndex(item => item.key === key)], 'percent', parseInt(res.total.percent))
          
        },
        error (err) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            status: 'error'
          })
          _this.fileList.splice(_this.fileList.findIndex(item => item.key === key), 1)
        },
        complete (res) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            url: _this.domain + res.key,
            percent: 100
          })
          setTimeout(() => {
            _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
              ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })
            _this.$emit('input', _this.fileList)
          }, 200)
        }
      })
    },
    handleRemove (key) {
      this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
    },
    handleEdit (key) {
      
      this.editIndex = this.fileList.findIndex(item => item.key === key)
      
      this.$refs.uploadInput.click()
    },
    handleMeitu (key) {

      this.$emit('on-meitu', this.fileList.findIndex(item => item.key === key))
    },
    handleAdd () {
      if (!this.disabled) {
        this.editIndex = -1
        this.$refs.uploadInput.click()
      }
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
  },
  watch: {
    'fileList': {
      deep: true,
      handler (val) {
        // this.$emit('input', this.fileList)
      }
    }
  }
}
</script>

<style lang="scss">
.fm-uplaod-container{
  .is-disabled{
    position: relative;

    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background: rgba(0,0,0,.1);
      content: '';
      display: block;
      cursor:not-allowed;
    }
  }

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
      // top: 0;
      // height: 30px;
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

  .drag-img-list{
    display: inline;

    .ghost{
      position: relative;
      &::after {
        width: 100%;
        height: 100%;
        display: block;
        content: '';
        background: #fbfdff;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px dashed #3bb3c2;
      }
    }

    &>div{
      cursor: move;
    }
  }
}

.viewer-container{
  z-index: 9999 !important;
}
</style>
