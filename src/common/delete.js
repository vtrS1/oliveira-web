import Vue from "vue";
import App from "./../App.vue";

export default async (name, route) => {
  Vue.this.$vs.dialog({
    type: "confirm",
    color: "danger",
    title: `Confirmação`,
    acceptText: "Sim, excluir",
    cancelText: "Cancelar",
    text: `Tem certeza que deseja excluir este item: ${name} ?`,
    accept: () => {
      console.log(route);
    }
  });
};
