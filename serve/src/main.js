// eslint-disable-next-line
import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "../../src/assets/css/jquery.treegrid.css";

import TreeGrid from "../../src/wrapper.js";

Vue.use(TreeGrid);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
