<template>
  <div
    @click.stop="handleSelectWidget(index)"
    :class="{active: selectWidget.key == element.key}"
    class="wrapper"
  >
    <div
      class="left-fixed"
      :style="{width: element.options.widthleft + 'px', height: element.options.height + 'px' }"
      :class="{active: selectWidget.key == element.key}"
    >
      <draggable
        class="widget-form-list"
        v-model="element.columns[0].list"
        filter="widget-grid-container"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleDivWidgetAdd($event, element.columns[0])"
      >
        <template v-if="element.columns[0].list.length" v-for="(el, i) in element.columns[0].list">
          <template v-if="el.islayout">
            <component
              :element="el"
              v-if="el.key"
              :is="el.type"
              :index="i"
              :data="element.columns[0]"
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
              :data="element.columns[0]"
            ></widget-form-item>
          </template>
        </template>
      </draggable>
    </div>
    <div
      :style="{
        marginLeft: marginleft, 
      height: element.options.height + 'px'
        } "
      :class="{active: selectWidget.key == element.key}"
      class="right-digital"
    >
      <draggable
        class="widget-form-list"
        style="padding-bottom: 50px;"
        v-model="element.columns[1].list"
        filter="widget-grid-container"
        :options="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleDivWidgetAdd($event, element.columns[1], 'Right')"
      >
        <template v-if="element.columns[1].list.length" v-for="(el, i) in element.columns[1].list">
          <template v-if="el.islayout">
            <component
              v-if="el.key"
              :is="el.type"
              :element="el"
              :index="i"
              :data="element.columns[1]"
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
              :data="element.columns[1]"
            ></widget-form-item>
          </template>
        </template>
      </draggable>
    </div>

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
// import ThreeColumns from './ThreeColumns';
// import DivLayout from "./DivLayout";
// import GridLayout from "./GridLayout"
export default {
  name: "TwoColumns",
  props: ["element", "select", "index", "data"],
  components: {
    WidgetFormItem,
    Draggable,
    // ThreeColumns,
    // DivLayout,
    // GridLayout
  },
  data() {
    return {
      selectWidget: this.select
    };
  },
  computed: {
    marginleft() {
      return (
        parseInt(this.element.options.widthleft) +
        parseInt(this.element.options.gutter) +
        "px"
      );
    }
  },
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

      if (row.list[newIndex].islayout && row.list[newIndex].name !== 'div') {
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
  .right-digital {
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