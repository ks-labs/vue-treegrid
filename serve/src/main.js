import Vue from "vue";
import App from "./App.vue";
import TreeGrid from "../../src/wrapper.js";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(TreeGrid);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
