<template>
  <div>
    <vs-button
      icon="edit"
      type="flat"
      color="primary"
      @click="modalStateEditarPessoaLista = true"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @close="close"
      @accept="update"
      :active.sync="modalStateEditarPessoaLista"
      title="Editar"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <label class="text-sm">Situação</label>
      <v-select
        class="w-full"
        v-model="form.situacao"
        label="value"
        :key="situacaoKey"
        @change="updateScreen"
        :reduce="ficha => ficha.value"
        :options="situacoes"
      ></v-select>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  props: ["os"],
  data: () => ({
    form: {
      situacao: ""
    },
    situacaoKey: 0,
    situacoes: [
      { value: "Em Aberto" },
      { value: "Vendida" },
      { value: "Recusado" },
      { value: "Retorno" }
    ],
    modalStateEditarPessoaLista: false
  }),
  methods: {
    close() {
      this.modalStateEditarPessoaLista = false;
    },
    async update() {
      const res = await this.updateData("os/" + this.os.id, this.form);
      if (res != null) {
        this.$emit("update");
        this.close();
      }
    },
    updateScreen() {
      this.situacaoKey++;
      this.$forceUpdate();
    }
  },
  mounted() {
    this.form.situacao = this.os.situacao;
  }
};
</script>
