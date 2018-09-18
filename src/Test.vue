<template>
  <div style="padding: 50px;">

    <upload
      :width="160"
      :height="100"
      :token="uptoken"
      :domain="domain"
    ></upload>
  </div>

</template>

<script>
import Upload from './components/Upload'
import request from './util/request.js'
export default {
  components: {
    Upload
  },
  data () {
    return {
      uptoken: '',
      domain: 'http://pakhu39nl.bkt.clouddn.com/'
    }
  },
  created () {
    request.get('http://localhost:9000/api/uptoken').then(res => {
      console.log('res', res)
      this.uptoken = res.uptoken
      // this.domain = res.domain
    })
  }
}
</script>
