# Vue Treegrid

[![Deploy](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/publish.yml/badge.svg)
[![Teste](https://github.com/ks-labs/vue-treegrid/actions/workflows/test.yml/badge.svg)](https://github.com/ks-labs/vue-treegrid/actions/workflows/test.yml/badge.svg)

This component was created using the [tree-grid](https://maxazan.github.io/jquery-treegrid/) and [bootstrap-table](https://examples.bootstrap-table.com/#extensions/treegrid.html)

## How to install

1. Install npm module

```bash
npm i @ksgl/treegrid
```

2. Import module

```js
// main.js
import Vue from "vue";
import TreeGrid from "@ksgl/treegrid";
import "@ksgl/treegrid/src/assets/css/jquery.treegrid.css";

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
      styles="table table-bordered"
      :rows="rows"
      :columns="columns"
      :rowStyle="rowStyle"
      :formatNoMatches="formatNoMatches"
      @onPostBody="onPostBody"
      @onClickRow="onClickRow"
      @headerStyle="headerStyle"
    >
    </treegrid>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        columns: [
          {
            field: "name",
            title: "Projeto/Área",
            align: "left",
            cellStyle: (_, body) => {
              if (body.isConsolidation) {
                return { classes: "is-line-root" };
              }
              return { classes: "name-field" };
            },
          },
          {
            field: "media",
            title: "Média",
            align: "left",
            formatter: (value, row) => {
              if (!row?.total) return "";
              return this.formatCurrency(value ?? 0);
            },
            cellStyle: () => {
              return {
                classes: "column-media",
              };
            },
          },
        ],
        rows: [
          {
            id: 154,
            media: 6098.49,
            total: 6098.49,
            january: {
              total: 6098.49,
              isProjection: false,
              hasDuplicated: {
                value: true,
                duplicated: [
                  {
                    id: 70,
                    invoice_id: 950,
                    cost_center_id: 2922,
                    vehicle_id: 552,
                    traffic_ticket_id: null,
                    billing_month: "2023-01-01",
                    cost_type: "Rental",
                    value: 2033,
                    description: null,
                    created_at: "2023-01-23 19:02:46",
                    updated_at: "2023-01-23 19:02:46",
                  },
                  {
                    id: 65,
                    invoice_id: 945,
                    cost_center_id: 2003,
                    vehicle_id: 552,
                    traffic_ticket_id: null,
                    billing_month: "2023-01-19",
                    cost_type: "Rental",
                    value: 993.29,
                    description: null,
                    created_at: "2023-01-19 17:35:24",
                    updated_at: "2023-01-19 19:49:34",
                  },
                ],
              },
            },
            name: "Gastos Gerais",
            isConsolidation: true,
          },
          {
            id: 157,
            media: 2200,
            total: 2200,
            pid: null,
            january: {
              total: 2200,
              isProjection: true,
              hasDuplicated: { value: false, duplicated: [] },
            },
            name: "Diretoria de Logística",
            isConsolidation: true,
          },
        ],
      };
    },
  };
</script>
```

Below are some configurations supported by the component, if you need a new configuration please open a Pull Request

## Props

| Name            | Type     | Default | Description                                                        |
| --------------- | -------- | ------- | ------------------------------------------------------------------ |
| Rows            | Array    |         | All table body data                                                |
| Columns         | Array    |         | All data on column headings                                        |
| idField         | String   | id      | Overwrite the default idField to 'id'                              |
| parentIdField   | String   | pid     | Set the parent id field.                                           |
| treeShowField   | String   |         | Set the treeShowField will auto enable the tree grid.              |
| rootParentId    | String   | null    | Set the root parent id.                                            |
| treeEnable      | Boolean  | false   | Set true to enable the tree grid.                                  |
| stickyHeader    | Boolean  | false   | Set true to use sticky header.                                     |
| clickColor      | String   |         | Color displayed in the background when clicking on a line          |
| rowStyle        | Function | {}      | The row style formatter function, takes two parameters: row, index |
| formatNoMatches | Function | ''      | Set message when the rows array is empty                           |

## Events

| Name           | Description                                                                                  | params                                |
| -------------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| onPostBody     | It fires after the table body are rendered and available in the DOM. The parameters contain: | element treegrid                      |
| onClickRow     | It fires when the user clicks a row                                                          | Object: {row, $element, field}        |
| onClickCell    | It fires when the user clicks a cell                                                         | Object: {field, value, row, $element} |
| onDblClickRow  | It fires when the user double clicks a row                                                   | Object: {row, $element, field}        |
| onDblClickCell | It fires when the user double clicks a cell                                                  | Object: {field, value, row, $element} |
| onExpandRow    | It fires when you click the detail icon to expand the detail view                            | Object: { index, row, $detail}        |
| onCollapseRow  | It fires when you click the detail icon to collapse the detail view                          | Object: {index, row, detailView}      |
| headerStyle    | The header style formatter function                                                          | column                                |
