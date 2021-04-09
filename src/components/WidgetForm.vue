<template>
  <div class="widget-form-container">
    <div v-if="data.list.length == 0" class="form-empty">{{$t('fm.description.containerEmpty')}}</div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      
      <draggable class="" 
        v-model="data.list" 
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >

        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
                <el-row class="widget-col widget-view" v-if="element && element.key" :key="element.key" 
                  type="flex"
                  :class="{active: selectWidget.key == element.key}"
                  :gutter="element.options.gutter ? element.options.gutter : 0"
                  :justify="element.options.justify"
                  :align="element.options.align"
                  @click.native="handleSelectWidget(index)">
                  <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                    
                      <draggable
                        v-model="col.list"
                        :no-transition-on-drag="true"
                        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                      >
                        <transition-group name="fade" tag="div" class="widget-col-list">
                          <template v-for="(el, i) in col.list">
                            <widget-form-item                             
                              :key="el.key"
                              v-if="el.key"
                              :element="el" 
                              :select.sync="selectWidget" 
                              :index="i" 
                              :data="col">
                            </widget-form-item>
                          </template>
                          
                        </transition-group>
                        
                      </draggable>
                  </el-col>
                  <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
        
                    <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
                  </div>

                  <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
                    <i class="iconfont icon-drag drag-widget"></i>
                  </div>
                </el-row>
            </template>
            <template v-else>
              <widget-form-item v-if="element && element.key"  :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    handleMoveEnd ({newIndex, oldIndex}) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget (index) {
      console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd (evt) {
      console.log('add', evt)
      console.log('end', evt)
      const newIndex = evt.newIndex
      const to = evt.to
      console.log(to)
      
      //为拖拽到容器的元素添加唯一 key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({...item}))
        })
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd ($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex)
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item

      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {

        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      console.log('from', item)

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || row.columns[colIndex].list[newIndex].type === 'select') {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
