// MAIN COLORS - VUESAX THEME COLORS
let colors = {
  primary: "#6096ba",
  success: "#28C76F",
  danger: "#EA5455",
  warning: "#FF9F43",
  dark: "#1E1E1E"
};

import Vue from "vue";
import Vuesax from "vuesax";
Vue.use(Vuesax, { theme: { colors } });

// CONFIGS
const themeConfig = {
  disableCustomizer: true, // options[Boolean] : true, false(default)
  disableThemeTour: false, // options[Boolean] : true, false(default)
  footerType: "static", // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false, // options[Boolean] : true, false(default)
  mainLayoutType: "vertical", // options[String]  : vertical(default) / horizontal
  navbarColor: "#fff", // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: "floating", // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: "fade-bottom", // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  sidebarCollapsed: true, // options[Boolean] : true, false(default)
  theme: "semi-dark", // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: "user"

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
};

export default themeConfig;
