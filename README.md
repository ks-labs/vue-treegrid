# Vue Treegrid

[![Deploy](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)

## How to install

1. Install npm module

```bash
npm i @ks-labs/treegrid
```

2. Import module

```js
// main.js
import Vue from "vue";
import TreeGrid from "@ks-labs/treegrid";
import "@ks-labs/treegrid/src/assets/css/jquery.treegrid.css";

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
            pid: null,
          },
          {
            name: "Root 1",
            id: 2,
            pid: 1,
          },
          {
            name: "Root 1",
            id: 3,
            pid: 1,
          },
          {
            name: "Root 1",
            id: 4,
            pid: 1,
          },
          {
            name: "Root 1",
            id: 5,
            pid: 4,
          },
          {
            name: "Root 1",
            id: 6,
            pid: null,
          },
          {
            name: "Root 7",
            id: 7,
            pid: 6,
          },
          {
            name: "Root 7 - 1",
            id: 8,
            pid: 7,
          },
          {
            name: "Root 1",
            id: 9,
            pid: 6,
          },
          {
            name: "Root 1",
            id: 10,
            pid: 6,
          },
        ],
        options: {},
      };
    },
  };
</script>
```
