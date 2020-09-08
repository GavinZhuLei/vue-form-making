<template>
  <el-form-item class="widget-view"
                v-if="element && element.key"
                :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
                :label="element.type === 'table' ? '' : element.name"
                :label-width="element.type === 'table' ? '0px' : 'auto'"
                @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type === 'input'">
      <el-input
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
      ></el-input>
    </template>

    <template v-if="element.type === 'textarea'">
      <el-input type="textarea" :rows="5"
                v-model="element.options.defaultValue"
                :style="{width: element.options.width}"
                :disabled="element.options.disabled"
                :placeholder="element.options.placeholder"
      ></el-input>
    </template>

    <template v-if="element.type === 'number'">
      <el-input-number
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :controls-position="element.options.controlsPosition"
          :style="{width: element.options.width}"
      ></el-input-number>
    </template>

    <template v-if="element.type === 'radio'">
      <el-radio-group v-model="element.options.defaultValue"
                      :style="{width: element.options.width}"
                      :disabled="element.options.disabled"
      >
        <el-radio
            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
            :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"

        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue"
                         :style="{width: element.options.width}"
                         :disabled="element.options.disabled"
      >
        <el-checkbox
            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
            :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <el-time-picker
          v-model="element.options.defaultValue"
          :is-range="element.options.isRange"
          :placeholder="element.options.placeholder"
          :start-placeholder="element.options.startPlaceholder"
          :end-placeholder="element.options.endPlaceholder"
          :readonly="element.options.readonly"
          :disabled="element.options.disabled"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :arrowControl="element.options.arrowControl"
          :style="{width: element.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="element.type === 'date'">
      <el-date-picker
          v-model="element.options.defaultValue"
          :type="element.options.type"
          :is-range="element.options.isRange"
          :placeholder="element.options.placeholder"
          :start-placeholder="element.options.startPlaceholder"
          :end-placeholder="element.options.endPlaceholder"
          :readonly="element.options.readonly"
          :disabled="element.options.disabled"
          :editable="element.options.editable"
          :clearable="element.options.clearable"
          :style="{width: element.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="element.type === 'rate'">
      <el-rate v-model="element.options.defaultValue"
               :max="element.options.max"
               :disabled="element.options.disabled"
               :allow-half="element.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="element.type === 'color'">
      <el-color-picker
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type === 'select'">
      <el-select
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :multiple="element.options.multiple"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
      >
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value"
                   :label="element.options.showLabel?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="element.type ==='switch'">
      <el-switch
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="element.type ==='slider'">
      <el-slider
          v-model="element.options.defaultValue"
          :min="element.options.min"
          :max="element.options.max"
          :disabled="element.options.disabled"
          :step="element.options.step"
          :show-input="element.options.showInput"
          :range="element.options.range"
          :style="{width: element.options.width}"
      ></el-slider>
    </template>

    <template v-if="element.type ==='imgupload'">
      <fm-upload
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :style="{'width': element.options.width}"
          :width="element.options.size.width"
          :height="element.options.size.height"
          token="xxx"
          domain="xxx"
      >

      </fm-upload>
    </template>

    <template v-if="element.type === 'cascader'">
      <el-cascader
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :clearable="element.options.clearable"
          :placeholder="element.options.placeholder"
          :style="{width: element.options.width}"
          :options="element.options.remoteOptions"
      >

      </el-cascader>
    </template>

    <template v-if="element.type === 'table'">
      <el-table
          v-if="changeShowTableTag"
          key="widgetFormItemTable_1"
          ref="widgetFormItemTable_1"
          :data="element.rows"
          :height="element.options.height"
          :border="element.options.border"
          :stripe="element.options.stripe"
          :fit="element.options.fit"
          :show-header="element.options.showHeader"
          :highlight-current-row="element.options.highlightCurrentRow"
          :show-summary="element.options.showSummary"
          style="width: 100%">

        <template v-for="column in element.columns">
          <el-table-column
              :key="column.label"
              :prop="column.prop"
              :label="column.label"
              :width="column.width">
          </el-table-column>
        </template>
      </el-table>
      <el-table
        v-else
        key="widgetFormItemTable_2"
        ref="widgetFormItemTable_2"
        :data="element.rows"
        :height="element.options.height"
        :border="element.options.border"
        :stripe="element.options.stripe"
        :fit="element.options.fit"
        :show-header="element.options.showHeader"
        :highlight-current-row="element.options.highlightCurrentRow"
        :show-summary="element.options.showSummary"
        style="width: 100%">
        <template v-for="column in element.columns">
          <el-table-column
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            :width="column.width">
          </el-table-column>
        </template>
      </el-table>
    </template>

    <template v-if="element.type === 'editor'">
      <vue-editor
          v-model="element.options.defaultValue"
          :style="{width: element.options.width}"
      >
      </vue-editor>
    </template>

    <template v-if="element.type ==='blank'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">
        {{ $t('fm.components.fields.blank') }}
      </div>
    </template>

    <template v-if="element.type === 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <div class="widget-view-action" v-if="selectWidget.key === element.key">
      <i class="el-icon-edit" v-if="element.type === 'table'" @click.stop="handleEditTable(index, element.rows)"></i>
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key === element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>

    <el-dialog title="表格编辑" :visible.sync="dialogEidtableTableVisible">
      <el-table
              v-if="dialogEidtableTableVisible"
              :data="element.rows"
              :height="element.options.height"
              :border="element.options.border"
              :stripe="element.options.stripe"
              :fit="element.options.fit"
              :show-header="element.options.showHeader"
              :highlight-current-row="element.options.highlightCurrentRow"
              :show-summary="element.options.showSummary"
              style="width: 100%">
        <template v-for="column in element.columns">
          <el-table-column
                  :key="column.label"
                  :prop="column.prop"
                  :label="column.label"
                  :width="column.width">
            <template slot-scope="{row}">
              <el-input v-model="row[column.prop]" placeholder="请输入" size="small" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>

  </el-form-item>
</template>

<script>
import FmUpload from './Upload'

export default {
  props: ['element', 'select', 'index', 'data', 'changeshowtt'],
  components: {
    FmUpload,
  },
  data() {
    return {
      selectWidget: this.select,
      changeShowTableTag: true,
      editableTableData: [],
      dialogEidtableTableVisible: false
    }
  },
  mounted() {

  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete(index) {
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

    handleEditTable(index, tableData) {
      // this.$message('表格编辑', index);
      this.dialogEidtableTableVisible = true
    },
    handleWidgetClone(index) {
      const key = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      let cloneData = {
        ...this.data.list[index],
        options: {
          ...this.data.list[index].options,
          remoteFunc: 'func_' + key
        },
        key,
        model: this.data.list[index].type + '_' + key,
        rules: this.data.list[index].rules || []
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox' || this.data.list[index].type === 'select') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    },
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    },
    changeshowtt(val) {
      this.changeShowTableTag = val
    },
  }
}
</script>
