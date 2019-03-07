<template>
  <div>
    <el-form ref="generateForm" 
      :size="data.config.size"
      :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <template v-for="item in data.list">

        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              

              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.name" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem"></genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item :key="item.key" :models.sync="models" :rules="rules" :widget="item" :remote="remote"></genetate-form-item>
        </template>
        
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
import {loadJs} from '../util/index.js'

export default {
  name: 'fm-generate-form',
  components: {
    GenetateFormItem
  },
  props: ['data', 'remote', 'value', 'insite'],
  data () {
    return {
      models: {},
      rules: {}
    }
  },
  created () {
    this.generateModle(this.data.list)
  },
  mounted () {
    /** 禁用数据收集 */
    // if (!this.insite) {
    //   if (!window.AV) {
    //     loadJs('https://cdn.jsdelivr.net/npm/leancloud-storage@3.10.0/dist/av-min.js').then(() => {
    //       if (!window.returnCitySN) {
    //         loadJs('http://pv.sohu.com/cityjson?ie=utf-8').then(() => {
    //           this.uploadAnalysis()
    //         })
    //       } else {
    //         this.uploadAnalysis()
    //       }
    //     })
    //   } else {
    //     this.uploadAnalysis()
    //   }
    // }
  },
  methods: {
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.models[genList[i].model] = genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : [])
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
            
          }
          
          if (this.rules[genList[i].model]) {
            
            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          } else {
            
            this.rules[genList[i].model] = [...genList[i].rules.map(item => {
              if (item.pattern) {
                return {...item, pattern: eval(item.pattern)}
              } else {
                return {...item}
              }
            })]
          }
          
        }
      }
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error('表单数据校验失败').message)
          }
        })
      })
    },
    refresh () {
      
    },
    uploadAnalysis () {
      /* 禁用收集用户信息 */
      // if (window.AV) {
      //   if (!window.AV.applicationId) {
      //     window.AV.init('ufBP4v4O6jnnmR7Qth84KdUK-gzGzoHsz', '5JwNSk1U7wf7RRDrzNfztRY7')
      //   }

      //   let {language, platform, userAgent} = window.navigator
      //   let {origin, href} = window.location

      //   const GenerateForm = window.AV.Object.extend('GenerateForm')
      //   const gfObject = new GenerateForm()
      //   gfObject.save({language, platform, userAgent, origin, href, ip: window.returnCitySN.cip, more: JSON.stringify(window.returnCitySN), data: JSON.stringify({})})
      // }
      
    }
  },
  watch: {
    value: {
      deep: true,
      handler (val) {
        console.log(JSON.stringify(val))
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
