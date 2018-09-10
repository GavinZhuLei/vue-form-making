<template>
  <el-container>
    <el-aside style="wdith: 250px;">

      <div class="components-list">
        <div class="widget-cate">基础字段</div>
        <draggable element="ul" :list="basicComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
        
        <div class="widget-cate">布局字段</div>
        <draggable element="ul" :list="layoutComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
      
    </el-aside>
    <el-container class="center-container" direction="vertical">
      <el-header class="btn-bar" style="height: 45px;">
        <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
      </el-header>
      <el-main>
        
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
      </el-main>
    </el-container>
    
    <el-aside class="widget-config-container">
      <el-container>
        <el-header height="45px">
          <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
          <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
        </el-header>
        <el-main class="config-content">
          <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
          <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
        </el-main>
      </el-container>
      
    </el-aside>

    <cus-dialog
      :visible="previewVisible"
      @on-close="previewVisible = false"
      ref="widgetPreview"
      @on-submit="handleTest"
      width="1000px"
    >
      <generate-form :data="widgetForm" ref="generateForm"></generate-form>
    </cus-dialog>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'

export default {
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  data () {
    return {
      basicComponents: [
        {
          type: 'input',
          name: '单行文本',
          icon: 'regular/keyboard',
          options: {
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: ''
          }
        },
        {
          type: 'textarea',
          name: '多行文本',
          icon: 'regular/keyboard',
          options: {
            width: '100%',
            defaultValue: '',
            required: false,
            pattern: ''
          }
        },
        {
          type: 'number',
          name: '计数器',
          icon: 'sort-numeric-up',
          options: {
            width: '',
            required: false,
            defaultValue: 0,
            min: '',
            max: '',
            step: 1,
            disabled: false,
            controlsPosition: ''
          }
        },
        {
          type: 'radio',
          name: '单选框组',
          icon: 'regular/dot-circle',
          options: {
            inline: false,
            defaultValue: '',
            options: [
              {
                value: '选项1'
              },
              {
                value: '选项2'
              },
              {
                value: '选项3'
              }
            ],
            required: false
          }
        },
        {
          type: 'checkbox',
          name: '多选框组',
          icon: 'regular/check-square',
          options: {
            inline: false,
            defaultValue: [],
            options: [
              {
                value: '选项1'
              },
              {
                value: '选项2'
              },
              {
                value: '选项3'
              }
            ],
            required: false
          }
        },
        {
          type: 'time',
          name: '时间选择器',
          icon: 'regular/clock',
          options: {
            defaultValue: '21:19:56',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            isRange: false,
            arrowControl: true,
            format: 'HH:mm:ss',
            required: false
          }
        },
        {
          type: 'date',
          name: '日期选择器',
          icon: 'regular/calendar-alt',
          options: {
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
          }
        },
        {
          type: 'rate',
          name: '评分',
          icon: 'regular/star',
          options: {
            defaultValue: null,
            max: 5,
            disabled: false,
            allowHalf: false,
            
          }
        }
      ],
      layoutComponents: [
        {
          type: 'grid',
          name: '栅格布局',
          icon: 'th',
          columns: [
            {
              span: 12,
              list: []
            },
            {
              span: 12,
              list: []
            }
          ],
          options: {
            gutter: 0,
            justify: 'start',
            align: 'top'
          }
        }
      ],
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false
    }
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        console.log('form', data)
        this.$refs.widgetPreview.end()
      }).catch(e => {
        console.log(e)
        this.$refs.widgetPreview.end()
      })
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log('######', val)
        console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/cover.scss';
@import '../styles/index.scss';

</style>
