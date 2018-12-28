<template>
  <div
    @click.stop="handleSelectWidget(index)"
    :class="{active: selectWidget.key == element.key}"
    class="wrapper"
  >
    <template v-if="element.columns.length" v-for="(row, index) in element.columns" >
      <div
        class="row-item"
        :key="index"
        :style="{height: row.height + 'px' ,
       marginBottom: element.columns.length != index+ 1 ? element.options.gutter + 'px' : 0 }"
        :class="{active: selectWidget.key == element.key}"
      >
        <draggable
          class="widget-form-list"
          v-model="row.list"
          filter="widget-grid-container"
          :options="{group:'people', ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @add="handleDivWidgetAdd($event, row)"
        >
          <template v-if="row.list.length" v-for="(el, i) in row.list">
            <template v-if="el.islayout">
              <component
                :element="el"
                v-if="el.key"
                :is="el.type"
                :index="i"
                :data="row"
                :key="el.key"
                :select.sync="selectWidget"
              ></component>
            </template>

            <template v-else>
              <widget-form-item
                v-if="el.key"
                :key="el.key"
                :element="el"
                :select.sync="selectWidget"
                :index="i"
                :data="row"
              ></widget-form-item>
            </template>
          </template>
        </draggable>
      </div>
    </template>

    <el-button
      title="删除"
      @click.stop="handleWidgetDelete(index)"
      class="layout-delete"
      v-if="selectWidget.key == element.key"
      circle
      plain
      type="danger"
    >
      <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
    </el-button>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import WidgetFormItem from "./WidgetFormItem";
export default {
  name: "MultiRows",
  props: ["element", "select", "index", "data"],
  components: {
    WidgetFormItem,
    Draggable
  },
  data() {
    return {
      selectWidget: this.select
    };
  },
  computed: {},
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log("index", newIndex, oldIndex);
    },
    handleSelectWidget(index) {
      console.log(index, this.data, "select 2 columns");
      this.selectWidget = this.data.list[index];
    },

    handleDivWidgetAdd($event, row) {
      console.log("divcoladd", $event, row);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      // 防止布局元素的嵌套拖拽
      // if (item.className.indexOf("data-grid") >= 0) {
      //   // 如果是列表中拖拽的元素需要还原到原来位置
      //   item.tagName === "DIV" &&
      //     this.data.list.splice(oldIndex, 0, row.list[newIndex]);

      //   row.list.splice(newIndex, 1);

      //   return false;
      // }

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      this.$set(row["list"], newIndex, {
        ...row["list"][newIndex],
        options: {
          ...row["list"][newIndex].options,
          remoteFunc: "func_" + key
        },
        key,
        // 绑定键值
        model: row["list"][newIndex].type + "_" + key,
        rules: []
      });

      if (row.list[newIndex].islayout && row.list[newIndex].name !== "div") {
        this.$set(row.list, newIndex, {
          ...row.list[newIndex],
          columns: row.list[newIndex].columns.map(item => ({ ...item }))
        });
      }
      this.selectWidget = row["list"][newIndex];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
      });
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
$primary-color: #409eff;
$primary-background-color: #ecf5ff;

.wrapper {
  width: 100%;
  position: relative;
  padding-bottom: 5px;
  border: 0px dashed transparent;
  background-color: #fff;
  .left-fixed {
    //float: left;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $primary-background-color;
    border: 0px dashed transparent;
    &.active {
      border: 1px dashed $primary-color;
    }
  }
  .row-item {
    border: 0px dashed transparent;
    background-color: $primary-background-color;

    &.active {
      border: 1px dashed $primary-color;
    }
  }
  .layout-delete {
    position: absolute;
    right: 20px;
    bottom: -20px;
    z-index: 1009;
  }

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: block;
    z-index: 1001;
  }
}
</style>