<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastroTipoContato = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastroTipoContato"
      title="Cadastar tipo de contato"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full md:w-1/2 pr-2"
            v-model="form.nome"
          />
          <vs-input
            label-placeholder="Mascara"
            class="w-full md:w-1/2 pl-2"
            v-model="form.mascara"
          />
        </div>
      </form>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  data: () => ({
    form: {},
    errors: [],
    modalCadastroTipoContato: false
  }),
  methods: {
    close() {
      this.modalCadastroTipoContato = false;
    },
    async cadastrar() {
      const res = await this.createData("tipos/contatos", this.form);
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
