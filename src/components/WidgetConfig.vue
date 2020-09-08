<template>
  <div v-if="show">
    <el-form label-position="top">
<!--      <el-form-item :label="$t('fm.config.widget.model')" v-if="data.type!=='grid'">-->
<!--        <el-input v-model="data.model"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('fm.config.widget.name')" v-if="data.type!=='grid'">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.datasource')" v-if="data.type!=='grid' && data.type !== 'table'">
        <el-input v-model="data.options.datasource"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.table')" v-if="data.type!=='grid' && data.type !== 'table'">
        <el-input v-model="data.options.table"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.field')" v-if="data.type!=='grid' && data.type !== 'table'">
        <el-input v-model="data.options.field"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.width')" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.height')" v-if="Object.keys(data.options).indexOf('height')>=0">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.size')" v-if="Object.keys(data.options).indexOf('size')>=0">
        {{ $t('fm.config.widget.width') }}
        <el-input style="width: 90px;" type="number" v-model.number="data.options.size.width"></el-input>
        {{ $t('fm.config.widget.height') }}
        <el-input style="width: 90px;" type="number" v-model.number="data.options.size.height"></el-input>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.placeholder')"
                    v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!=='time' || data.type!=='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.layout')" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">{{ $t('fm.config.widget.block') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.inline') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.showInput')" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.min')" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.max')" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.step')" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.multiple')" v-if="data.type==='select' || data.type==='imgupload'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.filterable')" v-if="data.type==='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.allowHalf')" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch
            v-model="data.options.allowHalf"
        >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.showAlpha')" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch
            v-model="data.options.showAlpha"
        >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.showLabel')" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch
            v-model="data.options.showLabel"
        >
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('fm.config.widget.option')" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">{{ $t('fm.config.widget.staticData') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.remoteData') }}</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style="" v-model="data.options.remoteFunc">
              <template slot="prepend">{{ $t('fm.config.widget.remoteFunc') }}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type==='radio' || (data.type==='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                         v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                         handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio
                      :label="item.value"
                      style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini"
                              v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel"
                              v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i
                      class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini"
                             icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type==='checkbox' || (data.type==='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable tag="ul" :list="data.options.options"
                         v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                         handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox
                      :label="item.value"
                      style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini"
                              v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel"
                              v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i
                      class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini"
                             icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">{{ $t('fm.actions.addOption') }}</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.remoteData')" v-if="data.type==='cascader'">
        <div>
          <el-input size="mini" style="" v-model="data.options.remoteFunc">
            <template slot="prepend">{{ $t('fm.config.widget.remoteFunc') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">{{ $t('fm.config.widget.childrenOption') }}</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.defaultValue')"
                    v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type === 'textarea' || data.type === 'input' || data.type==='rate' || data.type==='color' || data.type==='switch')">
        <el-input v-if="data.type==='textarea'" type="textarea" :rows="5"
                  v-model="data.options.defaultValue"></el-input>
        <el-input v-if="data.type==='input'" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type === 'rate'" style="display:inline-block;vertical-align: middle;"
                 :max="data.options.max"
                 :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type === 'rate'"
                   style="display:inline-block;vertical-align: middle;margin-left: 10px;"
                   @click="data.options.defaultValue=0">{{ $t('fm.actions.clear') }}
        </el-button>
        <el-color-picker
            v-if="data.type === 'color'"
            v-model="data.options.defaultValue"
            :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type==='switch'" v-model="data.options.defaultValue"></el-switch>
      </el-form-item>

      <template v-if="data.type === 'time' || data.type === 'date'">
        <el-form-item :label="$t('fm.config.widget.showType')" v-if="data.type === 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isRange')" v-if="data.type === 'time'">
          <el-switch
              v-model="data.options.isRange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isTimestamp')" v-if="data.type === 'date'">
          <el-switch
              v-model="data.options.timestamp"
          >
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.placeholder')"
                      v-if="(!data.options.isRange && data.type === 'time') || (data.type !== 'time' && data.options.type !== 'datetimerange' && data.options.type !== 'daterange')">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.startPlaceholder')"
                      v-if="(data.options.isRange) || data.options.type==='datetimerange' || data.options.type==='daterange'">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.endPlaceholder')"
                      v-if="data.options.isRange || data.options.type==='datetimerange' || data.options.type==='daterange'">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.format')">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.defaultValue')"
                      v-if="data.type==='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker

              key="1"
              style="width: 100%;"
              v-if="!data.options.isRange"
              v-model="data.options.defaultValue"
              :arrowControl="data.options.arrowControl"
              :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
              key="2"
              v-if="data.options.isRange"
              style="width: 100%;"
              v-model="data.options.defaultValue"
              is-range
              :arrowControl="data.options.arrowControl"
              :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type==='imgupload'">

        <el-form-item :label="$t('fm.config.widget.limit')">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isQiniu')">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.tokenFunc')" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('fm.config.widget.imageAction')" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type==='blank'">
        <el-form-item :label="$t('fm.config.widget.defaultType')">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="Object" :label="$t('fm.config.widget.object')"></el-option>
            <el-option value="Array" :label="$t('fm.config.widget.array')"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type === 'grid'">
        <el-form-item :label="$t('fm.config.widget.gutter')">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable tag="ul" :list="data.columns"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i
                  class="iconfont icon-icon_bars"></i></i>
              <el-input :placeholder="$t('fm.config.widget.span')" size="mini" style="width: 100px;" type="number"
                        v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus"
                         style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">{{ $t('fm.actions.addColumn') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.justify')">
          <el-select v-model="data.options.justify">
            <el-option value="start" :label="$t('fm.config.widget.justifyStart')"></el-option>
            <el-option value="end" :label="$t('fm.config.widget.justifyEnd')"></el-option>
            <el-option value="center" :label="$t('fm.config.widget.justifyCenter')"></el-option>
            <el-option value="space-around" :label="$t('fm.config.widget.justifySpaceAround')"></el-option>
            <el-option value="space-between" :label="$t('fm.config.widget.justifySpaceBetween')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.align')">
          <el-select v-model="data.options.align">
            <el-option value="top" :label="$t('fm.config.widget.alignTop')"></el-option>
            <el-option value="middle" :label="$t('fm.config.widget.alignMiddle')"></el-option>
            <el-option value="bottom" :label="$t('fm.config.widget.alignBottom')"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type === 'table'">
        <!--        <el-form-item :label="$t('fm.config.widget.gutter')">-->
        <!--          <el-input type="number" v-model.number="data.options.gutter"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item :label="$t('fm.config.widget.rows')">
          <el-input type="number" min="1" v-model.number="data.rows.length"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columns')">
          <el-input type="number" min="1"
                    v-model.number="Object.keys(data.rows.length > 0 ? data.rows[0] : {}).length"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.rowOption')">
          <draggable tag="ul" :list="data.rows"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
          >
            <li v-for="(item, index) in data.rows" :key="index">
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i
                  class="iconfont icon-icon_bars"></i></i>
              <el-input :placeholder="$t('fm.config.widget.span')" size="mini" style="width: 100px;" type="number"
                        v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus"
                         style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddTableRow">{{ $t('fm.actions.addRow') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable tag="ul" :list="data.columns"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
                     @end="endevent"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i
                  class="iconfont icon-icon_bars"></i></i>
              <el-input :placeholder="$t('fm.config.widget.span')" size="mini" style="width: 100px;" readonly
                        v-model="item.label"></el-input>

              <el-button @click="handleOptionsRemoveColumn(index)" circle plain type="danger" size="mini"
                         icon="el-icon-minus"
                         style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddTableColumn">{{ $t('fm.actions.addColumn') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="列表样式">
          <el-row type="flex" justify="space-around">
            <el-button>合并</el-button>
            <el-button>取消合并</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="单元格属性">
          <el-row type="flex" justify="space-around">
            <el-col>
              <el-button>显示指标符号</el-button>
            </el-col>
            <el-col>
              <el-button>显示指标单位</el-button>
            </el-col>
          </el-row>
          <br>
          <el-row type="flex" justify="space-around">
            <el-col>
              <el-button>显示指标标准值</el-button>
            </el-col>
            <el-col>
              <el-button>显示指标期望值</el-button>
            </el-col>
          </el-row>
          <br>
          <el-row type="flex" justify="space-around">
            <el-col>
              <el-button>显示机组</el-button>
            </el-col>
            <el-col>
              <el-button>重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.attribute')">
          <el-checkbox v-model="data.options.stripe" v-if="Object.keys(data.options).indexOf('stripe')>=0">
            {{ $t('fm.config.widget.stripe') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.border" v-if="Object.keys(data.options).indexOf('border')>=0">
            {{ $t('fm.config.widget.border') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.fit" v-if="Object.keys(data.options).indexOf('fit')>=0">
            {{ $t('fm.config.widget.fit') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.showHeader" v-if="Object.keys(data.options).indexOf('showHeader')>=0">
            {{ $t('fm.config.widget.showHeader') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.highlightCurrentRow"
                       v-if="Object.keys(data.options).indexOf('highlightCurrentRow')>=0">
            {{ $t('fm.config.widget.highlightCurrentRow') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.showSummary" v-if="Object.keys(data.options).indexOf('showSummary')>=0">
            {{ $t('fm.config.widget.showSummary') }}
          </el-checkbox>
        </el-form-item>
      </template>

      <template v-if="data.type !== 'grid' && data.type !== 'table'">
        <el-form-item :label="$t('fm.config.widget.attribute')">
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">
            {{ $t('fm.config.widget.readonly') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">
            {{ $t('fm.config.widget.disabled') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">
            {{ $t('fm.config.widget.editable') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">
            {{ $t('fm.config.widget.clearable') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">
            {{ $t('fm.config.widget.arrowControl') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.isDelete" v-if="Object.keys(data.options).indexOf('isDelete')>=0">
            {{ $t('fm.config.widget.isDelete') }}
          </el-checkbox>
          <el-checkbox v-model="data.options.isEdit" v-if="Object.keys(data.options).indexOf('isEdit')>=0">
            {{ $t('fm.config.widget.isEdit') }}
          </el-checkbox>

        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.validate')">
          <div v-if="Object.keys(data.options).indexOf('required')>=0">
            <el-checkbox v-model="data.options.required">{{ $t('fm.config.widget.required') }}</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType"
                     size="mini">
            <el-option value="string" :label="$t('fm.config.widget.string')"></el-option>
            <el-option value="number" :label="$t('fm.config.widget.number')"></el-option>
            <el-option value="boolean" :label="$t('fm.config.widget.boolean')"></el-option>
            <el-option value="integer" :label="$t('fm.config.widget.integer')"></el-option>
            <el-option value="float" :label="$t('fm.config.widget.float')"></el-option>
            <el-option value="url" :label="$t('fm.config.widget.url')"></el-option>

            <el-option value="email" :label="$t('fm.config.widget.email')"></el-option>
            <el-option value="hex" :label="$t('fm.config.widget.hex')"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input size="mini" v-model.lazy="data.options.pattern" style=" width: 240px;"
                      :placeholder="$t('fm.config.widget.patternPlaceholder')"></el-input>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import AddColumn from '@/components/AddColumn';

export default {
  components: {
    Draggable,
    AddColumn,
  },
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    }
  },
  computed: {
    show() {
      return this.data && Object.keys(this.data).length > 0;
    }
  },
  mounted() {
    const saveTableHeaderColumn = this.saveTableHeaderColumn.bind(this)
  },
  methods: {
    handleOptionsRemove(index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else if (this.data.type === 'table') {
        this.data.rows.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    },
    handleOptionsRemoveColumn(index) {
      this.data.columns.splice(index, 1)
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption'),
          label: this.$t('fm.config.widget.newOption')
        })
      } else {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption')
        })
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    handleAddTableColumn() {
      this.$emit('showAddColumn')
      // this.$prompt('请输入表头', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputValidator: (value) => {
      //     return !!value
      //   },
      //   inputErrorMessage: '请输入表头',
      // }).then(({ value }) => {
      //   this.data.columns.push({
      //     prop: 'address',
      //     label: value,
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   });
      // });
    },
    saveTableHeaderColumn(label, prop, width) {
      this.data.columns.push({
        prop,
        label,
        width,
      })
    },
    handleAddTableRow() {
        this.$emit('showAddRow')
    },
    saveTableRow(props) {
        const rowMode = {}
        props.forEach(item => {
            rowMode[item] = ''
        })
        this.data.rows.push(rowMode )
    },
    generateRule() {
      this.data.rules = []
      Object.keys(this.validator)
          .forEach(key => {
            if (this.validator[key]) {
              this.data.rules.push(this.validator[key])
            }
          })
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }

      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }

      }
    },

    validateRequired(val) {
      if (val) {
        this.validator.required = {
          required: true,
          message: `${this.data.name}${this.$t('fm.config.widget.validatorRequired')}`
        }
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },

    validateDataType(val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = {
          type: val,
          message: this.data.name + this.$t('fm.config.widget.validatorType')
        }
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    valiatePattern(val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {
          pattern: val,
          message: this.data.name + this.$t('fm.config.widget.validatorPattern')
        }
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
    endevent(evt) {
      this.$emit('draggableend', evt)
    },
  },
  watch: {
    'data.options.isRange': function (val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else {
          if (Object.keys(this.data.options)
              .indexOf('defaultValue') >= 0) {
            this.data.options.defaultValue = ''
          }
        }
      }
    },
    'data.options.required': function (val) {
      this.validateRequired(val)
    },
    'data.options.dataType': function (val) {
      this.validateDataType(val)
    },
    'data.options.pattern': function (val) {
      this.valiatePattern(val)
    },
    'data.name': function (val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.required)
        this.validateDataType(this.data.options.dataType)
        this.valiatePattern(this.data.options.pattern)
      }
    }
  }
}
</script>
