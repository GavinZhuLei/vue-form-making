<template>
  <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      :filter-node-method="filterNode"
      ref="tree">
  </el-tree>
</template>

<script>
import templates from '@/mock/templates';
export default {
  name: 'SheBeiProps',
  data() {
    return {
      data: templates,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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

</style>
