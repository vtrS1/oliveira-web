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
      @accept="cadastrar"
      :active.sync="modalState"
      title="Cadastar negativado"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <div class="w-full md:w-8/12">
            <SelectSacado @update="(val) => setValue('id_sacado', val)" />
          </div>
          <div class="w-full md:w-4/12 pl-2">
            <SelectContaReceber
              :key="form.id_sacado"
              :sacado="form.id_sacado"
              @update="(val) => setValue('id_venda', val)"
            />
          </div>
          <div class="w-full md:w-6/12 pt-4">
            <vs-input label-placeholder="Observação" class="w-full" v-model="form.obs" />
          </div>
          <div class="w-full md:w-2/12 pl-2 pt-4">
            <vs-checkbox icon="close" color="danger" v-model="form.bloqueado"
              >Bloqueado para novas vendas</vs-checkbox
            >
          </div>
          <div class="w-full md:w-4/12">
            <vs-input
              label="Data de Inclusão"
              class="w-full pr-2 pt-1 mt-0"
              v-model="form.data_inclusao"
              type="date"
            />
          </div>
          <!-- <div class="w-full md:w-2/12  pl-2">
            <vs-input
              label="Data de Execução"
              class="w-full pr-2 pt-1 mt-0"
              v-model="form.data_execucao"
              type="date"
            />
          </div> -->
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
import SelectContaReceber from "@/components/SelectContaReceber";
import SelectSacado from "@/components/SelectSacado";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectSacado, SelectContaReceber },
  data: () => ({
    form: {},
    errors: [],
    modalState: false,
  }),
  methods: {
    async cadastrar() {
      const res = await this.createData("negativados", this.form);
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
  mounted() {},
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
