import Vue from "vue";
import App from "./App.vue";
import VueMask from "v-mask";
import money from "v-money";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import VueApexCharts from "vue-apexcharts";
// import WsPlugin from "adonis-vue-websocket";
// import Ws from "@adonisjs/websocket-client";

// Setrny
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.use(Vuesax);
Vue.use(VueMask);
Vue.use(money, { precision: 2 });
Vue.use(VueApexCharts);
// Vue.use(WsPlugin, { adonisWS: Ws });
Vue.component("apexchart", VueApexCharts);
Vue.component("v-select", vSelect);

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

Sentry.init({
  Vue,
  dsn:
    "https://5b55c9da63e2472c8d080bd8806517db@o1051658.ingest.sentry.io/6038256",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "ancweb.com.br", /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
