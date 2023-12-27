<template>
  <div>
    <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">
      
    </fm-generate-form>
    <el-button type="primary" @click="handleDisabled">Disabled</el-button>
    <el-button type="primary" @click="handleEnabled">Enabled</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":-1,"showWordLimit":false,"remoteFunc":"func_1703670296000_5958"},"name":"单行文本","key":"1703670296000_5958","model":"text1","rules":[{"type":"string","message":"单行文本格式不正确"}]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":-1,"showWordLimit":false,"remoteFunc":"func_1703670297000_59193"},"name":"多行文本","key":"1703670297000_59193","model":"text2","rules":[]},{"type":"grid","icon":"icon-grid-","columns":[{"span":12,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","disabled":false,"maxlength":-1,"showWordLimit":false,"remoteFunc":"func_1703670313000_76172"},"name":"单行文本","key":"1703670313000_76172","model":"text3","rules":[{"type":"string","message":"单行文本格式不正确"}]}]},{"span":12,"list":[{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"disabled":false,"pattern":"","placeholder":"","maxlength":-1,"showWordLimit":false,"remoteFunc":"func_1703670319000_99680"},"name":"多行文本","key":"1703670319000_99680","model":"text4","rules":[]}]}],"options":{"gutter":0,"justify":"start","align":"top","remoteFunc":"func_1703670311000_73193"},"name":"栅格布局","key":"1703670311000_73193","model":"grid_1703670311000_73193","rules":[]},{"type":"editor","icon":"icon-fuwenbenkuang","options":{"defaultValue":"","width":"","disabled":false,"remoteFunc":"func_1703670323000_64646"},"name":"编辑器","key":"1703670323000_64646","model":"editor","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small"}},
        editData: {},
        remoteFuncs: {
          
        }
      }
    },
    methods: {
      handleDisabled () {
        this.$refs.generateForm.disabled(['text4', 'editor'], true)
      },

      handleEnabled () {
        this.$refs.generateForm.disabled('editor', false)
      }
    }
  }
</script>