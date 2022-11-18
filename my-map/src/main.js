// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./utils/flexible.js";
import animated from "animate.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "lib-flexible/flexible";
import "amfe-flexible";
import "lib-flexible";

Vue.use(animated);
// import "amfe-flexible";
Vue.config.productionTip = false;
Vue.use(Antd);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
