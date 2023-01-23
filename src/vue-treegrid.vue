<template>
  <table class="tree">
    <thead>
      <th v-for="(item, index) in columns" :key="index">
        {{ item.name }}
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in rows"
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
    },
    options: {
      type: Object,
      require: false,
    },
  },
  mounted() {
    $(".tree").treegrid(this.options);
  },
  methods: {
    clickRow(item, el) {
      console.log("click");
      if ($(el.srcElement).is("td") || $(el.srcElement).is("tr")) {
        console.log("click", item);
        this.$emit("row", item);
      }
    },
  },
};
</script>
