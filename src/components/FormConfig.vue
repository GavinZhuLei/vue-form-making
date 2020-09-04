<template>
  <el-form class="form-config-container" label-width="20px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="模板名称" prop="templateName">
          <el-input v-model="zbAttribute.templateName" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模板级别" prop="templateGrade">
          <el-select v-model="zbAttribute.templateGrade" placeholder="请选择">
            <el-option
                v-for="item in templateGradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="发布单位" prop="publishDanwei">
          <el-input v-model="zbAttribute.publishDanwei" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="zbAttribute.publisher" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="生成时间" prop="createTime">
          <el-input v-model="zbAttribute.createTime" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布时间" prop="publishTime">
          <el-input v-model="zbAttribute.publishTime" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="模板状态" prop="templateStatus">
          <el-select v-model="zbAttribute.templateStatus" placeholder="请选择">
            <el-option
                v-for="item in templateStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="启用人" prop="enabler">
          <el-input v-model="zbAttribute.enabler" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="启用时间" prop="enabledTime">
          <el-input v-model="zbAttribute.enabledTime" placeholder="" size="mini" label="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <div style="height: 68px; border-bottom: 1px solid #e1e1e1;"></div>
      </el-col>
    </el-row>
    <!--      <el-form-item :label="$t('fm.config.form.labelPosition.title')">-->
    <!--        <el-radio-group v-model="data.labelPosition">-->
    <!--          <el-radio-button label="left">{{$t('fm.config.form.labelPosition.left')}}</el-radio-button>-->
    <!--          <el-radio-button label="right">{{$t('fm.config.form.labelPosition.right')}}</el-radio-button>-->
    <!--          <el-radio-button label="top">{{$t('fm.config.form.labelPosition.top')}}</el-radio-button>-->
    <!--        </el-radio-group>-->
    <!--      </el-form-item>-->

    <!--      <el-form-item :label="$t('fm.config.form.labelWidth')">-->
    <!--        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>-->
    <!--      </el-form-item>-->

    <!--      <el-form-item :label="$t('fm.config.form.size')">-->
    <!--        <el-radio-group v-model="data.size">-->
    <!--          <el-radio-button label="medium">medium</el-radio-button>-->
    <!--          <el-radio-button label="small">small</el-radio-button>-->
    <!--          <el-radio-button label="mini">mini</el-radio-button>-->
    <!--        </el-radio-group>-->
    <!--      </el-form-item>-->
  </el-form>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      templateGradeOptions: [{
        value: 'group',
        label: '集团'
      }, {
        value: 'company',
        label: '电厂'
      }],
      templateStatusOptions: [{
        value: 'enabled',
        label: '启用'
      }, {
        value: 'published',
        label: '发布'
      }, {
        value: 'beta',
        label: '草稿'
      }],
      zbAttribute: {
        templateName: '', // 名称
        templateGrade: '', // 编码
        publishDanwei: '', // 单位
        publisher: '', // 类型
        createTime: '', // 数据源
        publishTime: '', // 属性
        templateStatus: '',
        enabler: '',
        enabledTime: '',
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.form-config-container {
  .el-form-item {
    border-bottom: none;
    padding-bottom: 0;

    ::v-deep .el-form-item__label {
      width: 100% !important;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>
