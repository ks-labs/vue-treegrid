// eslint-disable-next-line
import Vue from "vue";
import App from "./App.vue";
import TreeGrid from "../../src/wrapper.js";
import "../../src/assets/css/jquery.treegrid.css";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(TreeGrid);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
