# Vue Treegrid

[![Deploy](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)
[![Teste](https://github.com/ks-labs/vue-treegrid/actions/workflows/test.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/test.yml/badge.svg)

This component was created using the [tree-grid](https://maxazan.github.io/jquery-treegrid/) and [bootstrap-table](https://examples.bootstrap-table.com/#extensions/treegrid.html)

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

```js
// public/index.html
<html>
  <head>
    ...

    <link href="https://unpkg.com/bootstrap-table@1.18.3/dist/extensions/sticky-header/bootstrap-table-sticky-header.css" rel="stylesheet">
    <link href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css" rel="stylesheet"/>

    ...
  </head>
  <body>

    ...

    <script src="https://unpkg.com/bootstrap-table@1.19.1/dist/bootstrap-table.min.js"></script>
    <script src="https://unpkg.com/bootstrap-table@1.19.1/dist/bootstrap-table-vue.min.js"></script>
    <script src="https://unpkg.com/bootstrap-table@1.19.1/dist/extensions/treegrid/bootstrap-table-treegrid.min.js"></script>
    <script src="https://unpkg.com/bootstrap-table@1.19.1/dist/extensions/sticky-header/bootstrap-table-sticky-header.min.js"></script>
  </body>
</html>
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
      @row="clickRow"
      clickColor="blue"
    >
      <template slot="name" slot-scope="{ name }">{{ name }}</template>
      // name = { name: "Root", id: 1, pid: null, }
    </treegrid>
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

## Options

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| Rows       | Array  | All table body data                                       |
| Columns    | Array  | All data on column headings                               |
| Options    | Object | Options supported by the tree-grid lib                    |
| clickColor | String | Color displayed in the background when clicking on a line |

## Events

| Name | Description                                  | Return                   |
| ---- | -------------------------------------------- | ------------------------ |
| Row  | Event triggered when clicking on a table row | {data: {}, context: DOM} |
