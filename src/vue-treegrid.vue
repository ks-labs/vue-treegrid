<template>
  <table id="tree">
    <thead>
      <th v-for="(item, index) in columns" :key="index">
        {{ item.name }}
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in root"
        :key="index"
        :class="`treegrid-${item.id} ${
          item.pid ? `treegrid-parent-${item.pid}` : ''
        }`"
        @click="clickRow(item, $event)"
      >
        <td v-for="(column, index) in columns" :key="index">
          <slot :name="column.field" v-bind:[column.field]="item">{{
            item[column.field] || ""
          }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import "./assets/js/jquery.treegrid";
export default {
  name: "treegrid",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
      default: [],
    },
    options: {
      type: Object,
      require: false,
    },
    clickColor: {
      type: String,
      default: "black",
    },
  },
  mounted() {
    $("#tree").treegrid(this.options);
  },
  computed: {
    root() {
      let root = [];
      for (let row of this.rows.filter((row) => !row.pid)) {
        root.push(row);
        root = root.concat(
          this.recursive(
            this.rows.filter((row) => row.pid),
            row.id
          )
        );
      }
      return root;
    },
  },
  methods: {
    recursive(rows, parentId) {
      let children = [];
      for (let row of rows.filter((row) => row.pid == parentId)) {
        children.push(row);
        children = children.concat(this.recursive(rows, row.id));
      }
      return children;
    },
    clickRow(item, el) {
      $("#tree")
        .find(".selected-tree")
        .css({ "background-color": "", color: "black" });
      let element = $(el.srcElement).is("td")
        ? $(el.srcElement).parent()
        : $(el.srcElement);

      if ($(el.srcElement).is("td") || $(el.srcElement).is("tr")) {
        const css = { "background-color": this.clickColor, color: "white" };
        if ($(el.srcElement).is("tr")) {
          element.addClass("selected-tree").css(css);
        } else {
          element.addClass("selected-tree").css(css);
        }
        this.$emit("row", { data: item, context: element });
      }
    },
  },
};
</script>

<style>
.selected-tree {
}
</style>
