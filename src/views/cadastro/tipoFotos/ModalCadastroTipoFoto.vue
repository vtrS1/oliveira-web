<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalState = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalState"
      title="Cadastar tipo de foto"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full mb-4"
            v-model="form.nome"
          />
          <vs-textarea label="Descrição" v-model="form.descricao" />
          <vs-alert active="true" color="warning" :icon="icon1">
            O nome do produto e a descrição são exibidas no contrato.
          </vs-alert>
        </div>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  data: () => ({
    form: {},
    modalState: false,
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    async cadastrar() {
      const res = await this.createData("tipos/produtos", this.form);
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    },
  },
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
