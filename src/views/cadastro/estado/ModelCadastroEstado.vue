<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastroEstado = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastroEstado"
      title="Cadastar estado"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full"
            v-model="form.nome"
            :danger="errors.nome"
            danger-text="Digite um nome"
          />
          <vs-input
            label-placeholder="Sigla"
            class="w-full"
            v-model="form.sigla"
            :danger="errors.sigla"
            danger-text="Digite uma sigla, Ex: AM"
          />
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
    errors: [],
    modalCadastroEstado: false
  }),
  methods: {
    close() {
      this.modalCadastroEstado = false;
    },
    async cadastrar() {
      const res = await this.createData("enderecos/estados", this.form);
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
