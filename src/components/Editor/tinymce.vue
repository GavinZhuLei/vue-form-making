<template>
  <div :style="{'width': this.width}" class="fm-editor-container">
    <textarea :id="id" :value="content"></textarea>
  </div>
</template>

<script>
import {generateUUID, loadJs, loadCss} from '../../util/index.js'
import tinymce from '../../lib/tinymce/tinymce.js'
import '../../lib/tinymce/themes/modern/theme'
import '../../lib/tinymce/skins/lightgray/skin.min.css'
import '../../lib/tinymce/skins/lightgray/content.min.css'
import '../../lib/tinymce/skins/lightgray/fonts/tinymce.ttf'
import '../../lib/tinymce/skins/lightgray/fonts/tinymce.woff'

import '../../lib/tinymce/plugins/advlist'
import '../../lib/tinymce/plugins/autolink'
import '../../lib/tinymce/plugins/lists'
import '../../lib/tinymce/plugins/link'
import '../../lib/tinymce/plugins/image'
import '../../lib/tinymce/plugins/charmap'
import '../../lib/tinymce/plugins/print'
import '../../lib/tinymce/plugins/preview'
import '../../lib/tinymce/plugins/anchor'
import '../../lib/tinymce/plugins/textcolor'
import '../../lib/tinymce/plugins/searchreplace'
import '../../lib/tinymce/plugins/visualblocks'
import '../../lib/tinymce/plugins/code'
import '../../lib/tinymce/plugins/fullscreen'
import '../../lib/tinymce/plugins/insertdatetime'
import '../../lib/tinymce/plugins/media'
import '../../lib/tinymce/plugins/table'
import '../../lib/tinymce/plugins/contextmenu'
import '../../lib/tinymce/plugins/paste'
import '../../lib/tinymce/plugins/help'
import '../../lib/tinymce/plugins/wordcount'
import '../../lib/tinymce/plugins/colorpicker'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '200px'
    },
    width: {
      type: String,
    }
  },
  data () {
    return {
      id: 'editor-'+generateUUID(),
      content: this.value
    }
  },
  mounted () {
    const _this = this

    tinymce.init({
        selector:'#'+_this.id,
        language_url: 'http://tools.xiaoyaoji.cn/form/lib/tinymce/zh_CN.js',
        language: 'zh_CN',
        // skin_url: 'lib/tinymce/skins/lightgray',
        height: this.height,
        menubar: false,
        // images_upload_handler: (blobInfo, success, failure) => {
          
        // },
        init_instance_callback: (editor) => {
          console.log("Editor: " + editor.id + " is now initialized.");
          editor.on('input change undo redo', () => {
              _this.$emit('input', editor.getContent());
          });
        },
        setup: (editor) => {
          editor.on(
              'input change undo redo', () => {
                _this.$emit('input', editor.getContent())
              }
            )
        },
        plugins: [
          'advlist autolink lists link image charmap print preview anchor textcolor colorpicker',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime table media  contextmenu paste code help wordcount'
        ],
        toolbar: 'insert table | undo redo |  formatselect | bold italic strikethrough forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code ',
        
    })
  },
  methods: {
    setHtml (val) {
      this.content = val
      tinymce.activeEditor.setContent(val)
      this.$emit('input', val)
    }
  },
  beforeDestroy: function () {
      tinymce.get(this.id).destroy();
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>

<style lang="scss">
.fm-editor-container{
  .mce-branding{
    display: none;
  }

  .mce-tinymce{
    box-shadow: 0 0 0 0;
  }
}
</style>
