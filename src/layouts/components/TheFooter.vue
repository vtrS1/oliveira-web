<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
    <span
      >COPYRIGHT @ {{ new Date().getFullYear() }}
      <a href="#" target="_blank" rel="nofollow">Oliveira Formaturas</a>, Todos
      os direitos reservados</span
    >
    <span class="md:flex hidden items-center">
      <span>ANC Tecnologia da Informação</span>
      <!-- <feather-icon
        icon="HeartIcon"
        svgClasses="stroke-current text-danger w-6 h-6"
        class="ml-2"
      /> -->
    </span>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  props: {
    classes: {
      type: String,
    },
  },
};
</script>
