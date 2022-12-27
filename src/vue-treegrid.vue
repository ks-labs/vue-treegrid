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
      >
        <td v-for="(column, index) in columns" :key="index">
          <slot :name="column.field" v-bind:[column.field]="item.name">{{
            item.name
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
};
</script>
