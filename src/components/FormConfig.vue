<template>
  <el-form class="form-config-container" label-width="20px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="模板名称" prop="templateName">
          <el-input v-model="data.templateName" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="模板级别" prop="templateGrade">
          <el-select v-model="data.templateGrade" value="group" placeholder="请选择">
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
          <el-input v-model="data.publishDanWei" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="data.publisher" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="生成时间" prop="createTime">
          <el-date-picker v-model="data.createTime" placeholder="" size="mini" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker v-model="data.publishTime" placeholder="" size="mini" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="模板状态" prop="templateStatus">
          <el-select v-model="data.templateStatus" value="beta" placeholder="请选择">
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
          <el-input v-model="data.enabler" placeholder="" size="mini" label=""/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="启用时间" prop="enabledTime">
          <el-date-picker v-model="data.enabledTime" placeholder="" size="mini" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <div style="height: 68px; border-bottom: 1px solid #e1e1e1;"></div>
      </el-col>
    </el-row>
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
      }]
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

    ::v-deep .el-date-editor.el-input, ::v-deep .el-date-editor.el-input__inner {
       width: 100%;
    }
  }
}
</style>
