<template>
  <div>
    <vs-button
      class="mr-2 float-right mt-2"
      color="success"
      type="filled"
      @click="modalState = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @accept="cadastrar"
      :active.sync="modalState"
      title="Cadastar observação"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <div class="w-full">
            <label class="text-sm">Situação</label>
            <v-select
              label="nome"
              v-model="form.situacao"
              :reduce="(option) => option.nome"
              :options="options"
            >
            </v-select>
          </div>
          <div class="w-full pt-4">
            <vs-textarea class="mt-2" label="Observação" v-model="form.obs" />
          </div>
        </div>
      </form>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";

export default {
  mixins: [useHTTP, useData, Validators],
  components: {},
  props: {
    idVenda: { type: Number, required: true },
    idSacado: { type: Number, required: true },
  },
  data: () => ({
    form: {},
    errors: [],
    modalState: false,
    options: [
      { nome: "Recusado" },
      { nome: "Renegociado" },
      { nome: "Sem contato" },
      { nome: "Outros" },
    ],
  }),
  methods: {
    async cadastrar() {
      const res = await this.createData("renegociacao", this.form);
      if (res != null) {
        this.$emit("update");
        this.form = {};
        this.modalState = false;
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
  },
  mounted() {
    this.form.id_contas_receber = this.idVenda;
    this.form.id_sacado = this.idSacado;
  },
};
</script>
<style scoped>
.con-vs-dialog .vs-dialog {
  max-width: 600px !important;
}
</style>
