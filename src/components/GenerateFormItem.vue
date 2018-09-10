<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widget.type == 'input'" >
      <el-input 
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        :type="widget.options.dataType"
        v-model.number="dataModel"
        :style="{width: widget.options.width}"
      ></el-input>
      <el-input 
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="dataModel"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number 
        v-model="widget.options.defaultValue" 
        
        :step="widget.options.step"
        controls-position="right"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel">
        <el-radio  
          
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in widget.options.options" :key="index"
        >
          {{item.value}}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel">
        <el-checkbox
          
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in widget.options.options" :key="index"
        >
          {{item.value}}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker 
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>
  </el-form-item>
</template>

<script>
export default {
  props: ['widget', 'models', 'rules'],
  data () {
    return {
      dataModel: this.models[this.widget.model]
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
