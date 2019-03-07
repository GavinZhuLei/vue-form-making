<template>
  <div style="padding: 20px">
    <fm-editor
        v-model="dataModel"
      >

      </fm-editor>
  </div>
</template>

<script>
import FmEditor from '../components/Editor/tinymce'

export default {
  components: {
    FmEditor
  },
  data () {
    return {
      dataModel: ``
    }
  }
}
</script>
