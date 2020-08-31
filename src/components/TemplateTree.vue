<template>
<div class="template-tree-container">
  <div class="search-container">
    <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
    </el-input>
  </div>

  <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      :filter-node-method="filterNode"
      ref="tree">
  </el-tree>
</div>
</template>

<script>
import templates from '@/mock/templates';
export default {
  name: 'TemplateTree',
  data() {
    return {
      filterText: '',
      data: templates,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
}
</script>

<style lang="scss" scoped>
.template-tree-container {
  position: relative;

  .search-container {
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1001;

  }
}
</style>
