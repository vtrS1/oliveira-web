<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastroBairro = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastroBairro"
      title="Cadastar bairro"
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
            <SelectEstado
              @update="
                val => {
                  setValue('id_estado', val);
                  form.id_cidade = undefined;
                }
              "
            />
          </div>
          <div class="w-full  pr-2 mt-0 my-2">
            <SelectCidade
              :key="form.id_estado"
              :estado="form.id_estado"
              @update="val => setValue('id_cidade', val)"
            />
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
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectCidade, SelectEstado },
  data: () => ({
    form: {},
    errors: [],
    modalCadastroBairro: false
  }),
  methods: {
    close() {
      this.modalCadastroBairro = false;
    },
    async cadastrar() {
      const res = await this.createData("enderecos/bairros", this.form);
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
