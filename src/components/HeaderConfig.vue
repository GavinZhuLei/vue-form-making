<template>
<div>
  <el-aside width="250px">
    <div class="components-list">
      <template v-if="basicFields.length">
        <div class="widget-cate">{{$t('fm.components.basic.title')}}</div>
        <draggable tag="ul" :list="basicComponents"
                   v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                   @end="handleMoveEnd"
                   @start="handleMoveStart"
                   :move="handleMove"
        >

          <li v-if="basicFields.indexOf(item.type)>=0" class="form-edit-widget-label" :class="{'no-put': item.type === 'divider'}" v-for="(item, index) in basicComponents" :key="index">
            <a>
              <i class="icon iconfont" :class="item.icon"></i>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </template>

      <template v-if="advanceFields.length">
        <div class="widget-cate">{{$t('fm.components.advance.title')}}</div>
        <draggable tag="ul" :list="advanceComponents"
                   v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                   @end="handleMoveEnd"
                   @start="handleMoveStart"
                   :move="handleMove"
        >

          <li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label" :class="{'no-put': item.type === 'table'}" v-for="(item, index) in advanceComponents" :key="index">
            <a>
              <i class="icon iconfont" :class="item.icon"></i>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </template>


      <template v-if="layoutFields.length">
        <div class="widget-cate">{{$t('fm.components.layout.title')}}</div>
        <draggable tag="ul" :list="layoutComponents"
                   v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                   @end="handleMoveEnd"
                   @start="handleMoveStart"
                   :move="handleMove"
        >

          <li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
            <a>
              <i class="icon iconfont" :class="item.icon"></i>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </template>

    </div>
  </el-aside>
</div>
</template>

<script>
import Draggable from 'vuedraggable'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import Clipboard from 'clipboard';
import generateCode from '@/components/generateCode';
export default {
  name: 'HeaderConfig',
  components: {
    Draggable,
  },
  props: {
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid']
    }
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents
    }
  },
  mounted () {
    this._loadComponents()
  },
  methods: {
    _loadComponents () {
      this.basicComponents = this.basicComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.advanceComponents = this.advanceComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.layoutComponents = this.layoutComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    }
  }
}
</script>

<style scoped>

</style>
