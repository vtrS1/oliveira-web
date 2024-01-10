<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastroCidade = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastroCidade"
      title="Cadastar cidade"
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
          <div class="w-full mt-0 my-2 pr-2">
            <SelectEstado @update="val => (form.id_estado = val)" />
          </div>
        </div>
      </form>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectEstado },
  data: () => ({
    form: {},
    errors: [],
    modalCadastroCidade: false
  }),
  methods: {
    close() {
      this.modalCadastroCidade = false;
    },
    async cadastrar() {
      const res = await this.createData("enderecos/cidades", this.form);
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    }
  },
  async mounted() {}
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
