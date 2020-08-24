<template>
  <div class="table-container">
    <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        :show-header="false"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          height="0">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import jizus from '@/mock/jizhu';
export default {
  name: 'JiZuProps',
  data() {
    return {
      tableData: jizus,
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
