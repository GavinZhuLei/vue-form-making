<template>
<div class="quota-table-container">
  <div class="btn-container">
    <el-row>
      <el-button type="primary">增加指标</el-button>
      <el-button type="danger">删除指标</el-button>
    </el-row>
  </div>

  <div class="table-container">
    <el-table
        :data="tableData"
        stripe
        :show-header="false"
    >
      <el-table-column
          prop="name"
          height="0">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import quotas from '@/mock/quotas';
export default {
  name: 'QuotaTable',
  data() {
    return {
      tableData: quotas
    }
  }
}
</script>

<style lang="scss" scoped>
.quota-table-container {
  position: relative;

  .btn-container {
    position: sticky;
    height: 40px;
    top: 0;
    left: 0;
    z-index: 10001;
    padding-top: 4px;
    background-color: white;
  }

  .table-container {
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
