<template>
  <div>
    <vs-button
      icon="edit"
      type="flat"
      color="primary"
      @click="modalState = true"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @close="close"
      @accept="update"
      :active.sync="modalState"
      title="Editar status do boleto"
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
        :reduce="(ficha) => ficha.value"
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
  props: ["boleto"],
  data: () => ({
    form: {
      situacao: "",
    },
    situacaoKey: 0,
    situacoes: [
      { value: "Aguardando registro" },
      { value: "Registrado" },
      { value: "Cancelado" },
      { value: "Quitado" },
    ],
    modalState: false,
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    async update() {
      let codRetorno = null;
      if (this.form.situacao == "Registrado") {
        codRetorno = 2;
      } else if (this.form.situacao == "Cancelado") {
        codRetorno = 0; // Código ficticio
      } else if (this.form.situacao == "Quitado") {
        codRetorno = 999; // Código ficticio
      }
      const res = await this.updateData("boletos/" + this.boleto.id, {
        cod_retorno: codRetorno,
      });
      if (res != null) {
        this.$emit("update");
        this.close();
      }
    },
    updateScreen() {
      this.situacaoKey++;
      this.$forceUpdate();
    },
  },
  mounted() {
    if (this.boleto.cod_retorno == null) {
      this.form.situacao = "Aguardando registro";
    } else if (this.boleto.cod_retorno == 2) {
      this.form.situacao = "Registrado";
    } else if (this.boleto.cod_retorno == 999) {
      this.form.situacao = "Quitado";
    }
  },
};
</script>
