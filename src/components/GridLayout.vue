<template>
  <div
    v-if="element && element.key"
    class="widget-grid-container data-grid"
    :key="element.key"
    style="position: relative;"
  >
    <el-row
      class="widget-grid"
      type="flex"
      :class="{active: selectWidget.key == element.key}"
      :gutter="element.options.gutter ? element.options.gutter : 0"
      :justify="element.options.justify"
      :align="element.options.align"
      @click.native="handleSelectWidget(index)"
    >
      <el-col
        v-for="(col, colIndex) in element.columns"
        :key="colIndex"
        :span="col.span ? col.span : 0"
      >
        <div style="border: 1px dashed #999;">
          <draggable
            class="widget-form-list"
            style="padding-bottom: 50px;"
            v-model="col.list"
            filter="widget-grid-container"
            :options="{group:'people', ghostClass: 'ghost'}"
            @end="handleMoveEnd"
            @add="handleWidgetColAdd($event, element, colIndex)"
          >
            <template v-if="col.list.length" v-for="(el, i) in col.list">
              <template v-if="el.islayout">
                <component
                  :is="el.type"
                  :element="el"
                  :index="i"
                  :data="col"
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
                  :data="col"
                ></widget-form-item>
              </template>
            </template>
          </draggable>
        </div>
      </el-col>
    </el-row>
    <el-button
      title="删除"
      style="bottom: -20px;"
      @click.stop="handleWidgetDelete(index)"
      class="widget-action-delete"
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
// import TwoColumns from "./TwoColumns";
// import ThreeColumns from "./ThreeColumns";
// import DivLayout from "./DivLayout";
export default {
  name: "GridLayout",
  components: {
    Draggable,
    WidgetFormItem,
    // TwoColumns,
    // ThreeColumns,
    // DivLayout
  },
  props: ["data", "select", "element", "index"],
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
      console.log(index, "#####");
      this.selectWidget = this.data.list[index];
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log("coladd", $event, row, colIndex);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;

      // 防止布局元素的嵌套拖拽
      // if (item.className.indexOf("data-grid") >= 0) {
      //   // 如果是列表中拖拽的元素需要还原到原来位置
      //   item.tagName === "DIV" &&
      //     this.data.list.splice(
      //       oldIndex,
      //       0,
      //       row.columns[colIndex].list[newIndex]
      //     );

      //   row.columns[colIndex].list.splice(newIndex, 1);

      //   return false;
      // }

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: "func_" + key
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + "_" + key,
        rules: []
      });

      if (
        row.columns[colIndex].list[newIndex].type === "radio" ||
        row.columns[colIndex].list[newIndex].type === "checkbox"
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
              item => ({
                ...item
              })
            )
          }
        });
      }
      if (
        row.columns[colIndex].list[newIndex].islayout &&
        row.columns[colIndex].list[newIndex].name !== "div"
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          columns: row.columns[colIndex].list[newIndex].columns.map(item => ({
            ...item
          }))
        });
      }
      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
    handleWidgetDelete(index) {
      console.log(index, "widgetdelete");
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
      console.log(val, "select");
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        console.log(val, "selectWidget");
        this.$emit("update:select", val);
      },
      deep: true
    }
  }
};
</script>
