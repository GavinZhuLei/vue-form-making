<template>
  <making-form></making-form>
  <!-- <form-making></form-making> -->
</template>

<script>
// import {MakingForm} from 'FormMaking'
import '../../dist/FormMaking.common.js'
import '../../dist/FormMaking.css'
export default {
  components:{
    // MakingForm: MakingForm.default 
  },
  mounted () {
    console.log(MakingForm)
  }
}
</script>
