<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue'

export default {
  created () {
    this.loadLanguage()
  },
  methods: {
    loadLanguage () {
      if (this.$route.params.lang == 'zh-CN') {
        this.$i18n.locale = 'zh-CN'
        localStorage.setItem('language', 'zh-CN')
      } else if (this.$route.params.lang == 'en-US') {
        this.$i18n.locale = 'en-US'
        localStorage.setItem('language', 'en-US')
      } else {
        this.$router.replace({name: this.$route.name, params: {lang: navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US'}})
      }
    }
  },
  watch: {
    '$route.params.lang': function (val) {
      this.loadLanguage()
    }
  }
}
</script>
