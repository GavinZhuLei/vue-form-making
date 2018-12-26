<template>
  <div>
    <div
      v-if="element && element.key "
      @click.stop="handleSelectWidget(index)"
      class="div-layout"
      :class="{active: selectWidget.key == element.key}"
      :style="element.options"
    >
      <span v-if="!element.list.length">div</span>
      <draggable
        class="widget-form-list"
        style="padding-bottom: 50px;"
        v-model="element.list"
        filter="widget-grid-container"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleDivWidgetAdd($event, element)"
      >
        <template v-if="element.list.length" v-for="(el, i) in element.list">
          <template v-if="el.islayout">
            <component
              v-if="el.key"
              :is="el.type"
              :element="el"
              :index="i"
              :data="element"
              :key="el.key"
              :select.sync="selectWidget"
            ></component>
          </template>
          <template v-else>
            <widget-form-item
              :key="el.key"
              v-if="el.key"
              :element="el"
              :select.sync="selectWidget"
              :index="i"
              :data="element"
            ></widget-form-item>
          </template>
        </template>
      </draggable>
      <el-button
        title="删除"
        @click.stop="handleWidgetDelete(index)"
        class="div-action-delete"
        v-if="selectWidget.key == element.key"
        circle
        plain
        type="danger"
      >
        <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import WidgetFormItem from "./WidgetFormItem";
// import TwoColumns from "./TwoColumns";
// import ThreeColumns from "./ThreeColumns";
// import GridLayout from "./GridLayout"
export default {
  name: "DivLayout",
  props: ["element", "select", "index", "data"],
  components: {
    Draggable,
    WidgetFormItem,
    // TwoColumns,
    // ThreeColumns,
    // GridLayout
  },
  data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log("index", newIndex, oldIndex);
    },
    handleSelectWidget(index) {
      console.log("select subcomponent", this.data);
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

      this.$set(row.list, newIndex, {
        ...row.list[newIndex],
        options: {
          ...row.list[newIndex].options,
          remoteFunc: "func_" + key
        },
        key,
        // 绑定键值
        model: row.list[newIndex].type + "_" + key,
        rules: []
      });

      if (
        this.data.list[newIndex].islayout &&
        this.data.list[newIndex].name != "div"
      ) {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
        });
      }

      this.selectWidget = row.list[newIndex];
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
.div-action-delete {
  position: absolute;
  right: 21px;
  bottom: 25px;
  z-index: 1009;
}
</style>