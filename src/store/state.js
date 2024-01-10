/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList";
import themeConfig from "@/../themeConfig.js";
import colors from "@/../themeConfig.js";

// /////////////////////////////////////////////
// Variables
// /////////////////////////////////////////////

const getUser = () => {
  const data = window.localStorage.getItem("user");
  if (data != null && data != undefined) {
    const user = JSON.parse(data);
    if (user != null) {
      if (user.hasOwnProperty("token")) {
        return user.nome;
      }
    }
  }
  return "Usuário";
};

const userDefaults = {
  uid: 0, // From Auth
  displayName: getUser(), // From Auth
  about: "Programador",
  photoURL:
    "https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg", // From Auth
  status: "online",
  userRole: "admin"
};

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
  AppActiveUser: userDefaults,
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  mainLayoutType: themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: "default",
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  starredPages: navbarSearchAndPinList.data.filter(
    page => page.highlightAction
  ),
  theme: themeConfig.theme || "light",
  themePrimaryColor: colors.primary,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null
};

export default state;
