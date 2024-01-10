<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastrarContrato = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastrarContrato"
      title="Cadastar contrato"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      class="p-0 m-0"
    >
      <div>
        <div class="w-full">
          <SelectInstituicao @update="val => setValue('id_instituicao', val)" />
        </div>
        <vs-input
          label-placeholder="Evento"
          class="w-full pt-2"
          v-model="form.evento"
        />
        <vs-input
          label-placeholder="Número do contrato"
          class="pt-2"
          v-model="form.numero"
        />
        <vs-switch
          color="dark"
          vs-icon-on="check"
          vs-icon-off="block"
          class="mt-8"
          v-model="form.forma_comissao"
        >
          <span slot="on">Forma comissão</span>
          <span slot="off">Não forma comissão</span>
        </vs-switch>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectInstituicao from "@/components/SelectInstituicao";
export default {
  components: { SelectInstituicao },
  mixins: [useHTTP, useData, PromptActiveDesactive],
  data: () => ({
    form: {},
    modalCadastrarContrato: false
  }),
  methods: {
    close() {
      this.modalCadastrarContrato = false;
    },
    async cadastrar() {
      const res = await this.createData("contratos", this.form);
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
  }
};
</script>
