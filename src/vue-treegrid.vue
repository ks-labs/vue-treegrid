<template>
  <table id="tree"></table>
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
    clickColor: {
      type: String,
      default: "black",
    },
    idField: {
      type: String,
      default: "id",
    },
    styles: {
      type: String,
      default: "table table-bordered text-nowrap",
    },
    stickyHeader: {
      type: Boolean,
      default: true,
    },
    treeShowField: {
      type: String,
      default: "name",
    },
    parentIdField: {
      type: String,
      default: "pid",
    },
    rowStyle: {
      type: Function,
      default: function (row) {
        if (row.isConsolidation) {
          return {
            classes: "is-line-root",
          };
        }
        return {};
      },
    },
  },
  mounted() {
    this.treeGrid();
  },
  methods: {
    treeGrid() {
      const treeGrid = $("#tree");
      treeGrid.bootstrapTable({
        data: this.rows,
        idField: this.idField,
        classes: this.styles,
        columns: this.columns,
        stickyHeader: this.stickyHeader,
        treeShowField: this.treeShowField,
        parentIdField: this.parentIdField,
        onPostBody: () => this.$emit("onPostBody", treeGrid),
        onClickRow: (_, element) => this.$emit("onClickRow", { _, element }),
        headerStyle: (column) => this.$emit("headerStyle", column),
        rowStyle: this.rowStyle,
        formatNoMatches: () => this.$emit("formatNoMatches"),
      });
    },
  },
};
</script>
