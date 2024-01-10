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
      title="Cadastar Lista"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <div class="w-6/12 mt-0 my-2 pr-2">
            <SelectVendedor @update="val => setValue('id_vendedor', val)" />
          </div>
          <div class="w-3/12 mt-0 my-2 pr-2">
            <label class="text-sm">Data de início</label>
            <vs-input
              class="w-full pr-2 mt-0"
              v-model="form.data_inicio"
              type="date"
            />
          </div>
          <div class="w-3/12 mt-0 my-2 pr-2">
            <label class="text-sm">Data de conclusão</label>
            <vs-input
              class="w-full pr-2 mt-0"
              v-model="form.data_conclusao"
              type="date"
            />
          </div>
        </div>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import SelectVendedor from "@/components/SelectVendedor";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectVendedor },
  data: () => ({
    form: {},
    errors: [],
    modalState: false
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    async cadastrar() {
      const res = await this.createData("listas", this.form);
      if (res != null) {
        this.close();
        this.form = {};
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
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
