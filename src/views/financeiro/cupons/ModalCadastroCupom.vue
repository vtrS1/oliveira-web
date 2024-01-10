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
      title="Cadastar cupom de desconto"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      class="p-0 m-0"
    >
      <div>
        <vs-input label="Código" class="w-full" v-model="form.nome" />

        <vs-input
          label="Desconto (Somente números de 1 a 100)"
          class="w-full"
          type="number"
          v-model="form.desconto"
          icon-after="true"
          icon="percent"
        />

        <vs-textarea class="mt-2" label="Descrição" v-model="form.descricao" />
        <vs-select class="w-full" label="Tipo de cupom" v-model="form.type">
          <vs-select-item value="qtd" text="Quantidade de usos" />
          <vs-select-item value="periodo" text="Período de tempo" />
        </vs-select>
        <div :key="form.type">
          <vs-input
            v-if="form.type == 'qtd'"
            label="Número de usos"
            class="py-2 w-full"
            type="number"
            v-model="form.qtd"
          />
          <div v-if="form.type == 'periodo'">
            <vs-alert class="mt-2">
              As datas abaixo se referem a validade do cupom. Deixe em branco para
              validade indefinida.
            </vs-alert>
            <div class="w-full flex flex-wrap">
              <div class="w-full md:w-6/12 md:pr-1">
                <vs-input
                  label="Date de início"
                  class="pt-2 w-full"
                  type="date"
                  v-model="form.data_inicio"
                />
              </div>
              <div class="w-full md:w-6/12 md:pl-1">
                <vs-input
                  label="Date de término"
                  class="pt-2 w-full"
                  type="date"
                  v-model="form.data_termino"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, useData, Validators],
  data: () => ({
    form: {},
    modalState: false,
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    showMessage(title, message, color) {
      this.$vs.notify({
        title: title,
        text: message,
        color: color,
      });
    },

    validateForm() {
      if (
        this.form.desconto == null ||
        this.form.desconto == "" ||
        this.form.desconto == undefined ||
        this.form.desconto < 0 ||
        this.form.desconto > 100
      ) {
        this.showMessage("Ops", "Desconto deve ser entre 0 e 100%", "warning");
        return false;
      }
      if (
        !this.isFullValidValue(this.form.nome) ||
        this.form.nome.length < 3 ||
        this.form.nome.length > 20
      ) {
        this.showMessage(
          "Ops",
          "O campo código deve ter de 3 até 20 caracteres",
          "warning"
        );
        return false;
      }
      if (
        !this.isFullValidValue(this.form.type) ||
        (this.form.type != "qtd" && this.form.type != "periodo")
      ) {
        this.showMessage("Ops", "Selecione o tipo de cupom", "warning");
        return false;
      }
      if (
        this.form.type == "qtd" &&
        (!this.isFullValidValue(this.form.qtd) || this.form.qtd < 1)
      ) {
        this.showMessage("Ops", "Informe um número de usos válido", "warning");
        return false;
      }
      if (
        this.form.type == "periodo" &&
        (!this.isFullValidValue(this.form.data_inicio) ||
          !this.isFullValidValue(this.form.data_termino))
      ) {
        this.showMessage("Ops", "Informe a data de início e término válida", "warning");
        return false;
      }

      return true;
    },
    async cadastrar() {
      if (!this.validateForm()) return;
      const res = await this.createData("cupons", this.form);
      if (res != null) {
        this.close();
        this.form = {};
        this.$emit("update");
      }
    },
  },
};
</script>
