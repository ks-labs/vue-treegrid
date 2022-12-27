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

<style></style>
