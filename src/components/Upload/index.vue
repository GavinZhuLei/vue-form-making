<template>
  <div class="fm-uplaod-container">

    <div 
      :style="{width: width+'px', height: height+'px'}"
      :class="{uploading: item.status=='uploading'}"
      class="upload-file" v-for="(item) in fileList" :key="item.key">
      <img :src="item.url" />

      <el-progress :width="miniWidth*0.9" class="upload-progress" type="circle" :percentage="0"></el-progress>
    </div>

    <div class="el-upload el-upload--picture-card"
      :style="{width: width+'px', height: height+'px'}"
    >
      <i class="el-icon-plus" :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>
      <input ref="uploadInput" @change="handleChange" type="file" :style="{width: width+'px', height: height+'px'}" name="file" class="el-upload__input upload-input">
    </div>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
      fileList: []
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
        }
      }
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
