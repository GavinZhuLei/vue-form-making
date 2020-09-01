<template>
  <el-container style="height: 100% !important;">
    <el-main>
      <el-form class="zhibiao-form" label-width="20px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="指标名称" prop="zbmc">
              <el-input v-model="zbAttribute.zbmc" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指标编码" prop="zbbm">
              <el-input v-model="zbAttribute.zbbm" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="指标单位" prop="zbdw">
              <el-input v-model="zbAttribute.zbdw" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据类型" prop="zbsjlx">
              <el-input v-model="zbAttribute.zbsjlx" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据源" prop="zbsjy">
              <el-input v-model="zbAttribute.zbsjy" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性" prop="zbshux">
              <el-input v-model="zbAttribute.zbshux" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="符号" prop="zbfh">
              <el-input v-model="zbAttribute.zbfh" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准值" prop="zbbzz">
              <el-input v-model="zbAttribute.zbbzz" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="期望值" prop="zbqwz">
              <el-input v-model="zbAttribute.zbqwz" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上限" prop="zbshangx">
              <el-input v-model="zbAttribute.zbshangx" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下限" prop="zbxx">
              <el-input v-model="zbAttribute.zbxx" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高限一级预警" prop="zbgx1jyj">
              <el-input v-model="zbAttribute.zbgx1jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="低限一级预警" prop="zbdx1jyj">
              <el-input v-model="zbAttribute.zbdx1jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高限二级预警" prop="zbgx2jyj">
              <el-input v-model="zbAttribute.zbgx2jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="低限二级预警" prop="zbdx2jyj">
              <el-input v-model="zbAttribute.zbdx2jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高限三级预警" prop="zbgx3jyj">
              <el-input v-model="zbAttribute.zbgx3jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="低限三级预警" prop="zbdx3jyj">
              <el-input v-model="zbAttribute.zbdx3jyj" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公式" prop="zbgx">
              <el-input v-model="zbAttribute.zbgx" placeholder="" size="mini" label="" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: 'ZhiBiaoConfig',
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                zbAttribute: {
                    zbmc: '', // 名称
                    zbbm: '', // 编码
                    zbdw: '', // 单位
                    zbsjlx: '', // 类型
                    zbsjy: '', // 数据源
                    zbshux: '', // 属性
                    zbfh: '', // 符号
                    zbbzz: '', // 标准值
                    zbqwz: '', // 期望值
                    zbshangx: '', // 上限
                    zbxx: '', // 下限
                    zbgx1jyj: '', // 高限一级预警
                    zbdx1jyj: '', // 低限一级预警
                    zbgx2jyj: '', // 高限二级预警
                    zbdx2jyj: '', // 低限二级预警
                    zbgx3jyj: '', // 高限三级预警
                    zbdx3jyj: '', // 低限三级预警
                    zbgx: '' // 公式
                }
            }
        },
        created() {},
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" scoped>
  .fm-style {
    .widget-config-container {
      .config-content {
        .zhibiao-form {
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
      }
    }
  }
</style>
