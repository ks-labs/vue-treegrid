# Vue Treegrid

[![Deploy](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)

## How to install

1. Install npm module

```bash
npm i @ks-labs/vue-treegrid
```

2. Import module

```js
import Vue from "vue";
import TreeGrid from "@ks-labs/vue-treegrid";
import "@ks-labs/vue-treegrid/src/assets/css/jquery.treegrid.css";

Vue.use(TreeGrid);
```

## How to use

```html
<template>
  <div>
    <treegrid
      class="table table-bordered"
      :rows="rows"
      :columns="columns"
      :options="options"
    ></treegrid>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        columns: [{ name: "Nome", field: "name" }],
        rows: [
          {
            name: "Root",
            id: 1,
            parent_id: null,
          },
          {
            name: "Root 1",
            id: 2,
            parent_id: 1,
          },
          {
            name: "Root 1",
            id: 3,
            parent_id: 1,
          },
          {
            name: "Root 1",
            id: 4,
            parent_id: 1,
          },
          {
            name: "Root 1",
            id: 5,
            parent_id: 4,
          },
          {
            name: "Root 1",
            id: 6,
            parent_id: null,
          },
          {
            name: "Root 7",
            id: 7,
            parent_id: 6,
          },
          {
            name: "Root 7 - 1",
            id: 8,
            parent_id: 7,
          },
          {
            name: "Root 1",
            id: 9,
            parent_id: 6,
          },
          {
            name: "Root 1",
            id: 10,
            parent_id: 6,
          },
        ],
        options: {},
      };
    },
  };
</script>
```
