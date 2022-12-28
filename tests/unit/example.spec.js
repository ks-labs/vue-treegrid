import { mount } from "@vue/test-utils";
import Treegrid from "../../src/vue-treegrid.vue";

describe("HelloWorld.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Treegrid, {
      propsData: {
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
      },
    });
  });
  it("Testar evento de click row", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find("tr").exists()).toBe(true);
    wrapper.find("tr").trigger("click");
    expect(wrapper.emitted("row").length).toBe(1);
  });

  it("Testar envio de valores por props", () => {
    expect(wrapper.props("columns")).toEqual([{ name: "Nome", field: "name" }]);
  });
});
