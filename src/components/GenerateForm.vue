<template>
  <div>
    <el-form ref="generateForm" :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
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
              <genetate-form-item v-for="citem in col.list" :key="citem.key" :models.sync="models" :rules="rules" :widget="citem"></genetate-form-item>
            </el-col>
          </el-row>
        </template>

        <template v-else>
          <genetate-form-item :key="item.key" :models.sync="models" :rules="rules" :widget="item"></genetate-form-item>
        </template>
        
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'

export default {
  name: 'fm-generate-form',
  components: {
    GenetateFormItem
  },
  props: ['data'],
  data () {
    return {
      models: {},
      rules: {}
    }
  },
  created () {
    console.log('generate', this.data)

    this.generateModle(this.data.list)
  },
  methods: {
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          this.models[genList[i].model] = genList[i].options.defaultValue
          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules]
          } else {
            this.rules[genList[i].model] = [...genList[i].rules]
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
    }
  }
}
</script>
