<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="flat"
      @click="modalState = true"
      icon="edit"
    ></vs-button>
    <vs-prompt
      @accept="cadastrar"
      :active.sync="modalState"
      title="Editar parcela"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <form class="ml-8" v-if="parcela.parcela > 0 || hasAccess('entrada')">
        <div class="flex vx-row w-full">
          <div class="w-2/12 pr-2">
            <label class="text-sm mt-8">Parcela</label>
            <vs-input class="w-full" v-model="form.parcela" />
          </div>
          <div class="w-4/12 pr-2">
            <label class="text-sm mt-8">Valor da parcela</label>
            <money
              class="vs-input--input h-12"
              v-model="form.valor_parcela"
              v-bind="formatMoney()"
            ></money>
          </div>
          <div class="w-6/12 pr-2">
            <SelectTipoPagamento
              :initialId="form.id_forma_pagamento"
              @update="(val) => (form.id_forma_pagamento = val)"
            />
          </div>
        </div>
        <div class="flex vx-row w-full">
          <div class="w-3/12">
            <vs-input
              :label="form.parcela == 0 ? 'Data de pagamento' : 'Data de vencimento'"
              class="w-full pr-2 mt-0"
              v-model="form.data_vencimento"
              type="date"
            />
          </div>
          <div class="w-3/12 pl-2">
            <vs-input
              label="Data do pagamento"
              class="w-full pr-2 mt-0"
              v-model="form.data_recebimento"
              type="date"
            />
          </div>
          <div class="w-3/12 pr-2">
            <label class="text-sm mt-8">Valor recebido</label>
            <money
              class="vs-input--input h-12"
              v-model="form.valor_recebido"
              v-bind="formatMoney()"
            ></money>
          </div>
        </div>
      </form>
      <p v-else class="text-center font-semibold text-lg">
        Esta é uma parcela de ENTRADA e não é possível fazer alterações com as suas
        permissões. Contate seus superiores caso seja necessário.
      </p>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
import SelectTipoPagamento from "@/components/SelectTipoPagamento";
import useRule from "@/common/mixins/useRule.js";
export default {
  mixins: [useHTTP, useData, Validators, useRule],
  props: ["parcela", "formaPagamento"],
  components: { SelectTipoPagamento },
  data: () => ({
    form: {
      data_recebimento: "",
    },
    errors: [],
    modalState: false,
  }),
  methods: {
    async cadastrar() {
      const tempDate = parseInt(
        new Date().toLocaleDateString("en-ZA").replaceAll("/", "")
      );
      const datePayment = parseInt(this.form.data_recebimento?.replaceAll("-", ""));
      if (datePayment > tempDate) {
        this.$vs.notify({
          title: "Ops...",
          text: "A  data de recebimento não pode ser maior que a data atual",
          position: "top-center",
          color: "warning",
        });
      } else {
        if (this.form.valor_recebido <= 0) {
          delete this.form.valor_recebido;
          delete this.form.data_recebimento;
        }
        const res = await this.updateData("venda-parcelas/" + this.parcela.id, {
          ...this.form,
        });
        if (res != null) {
          this.$emit("update");
          this.form = {};
          this.modalState = false;
        }
      }
    },
  },
  mounted() {
    this.route = "contasReceberDetail";
    this.form = { ...this.parcela };
    if (this.form.valor_recebido == null) {
      this.form.valor_recebido = "0";
    }
    this.form.data_vencimento = this.formatDate(this.parcela.data_vencimento);
    // this.form.data_recebimento = this.formatDate(this.parcela.data_recebimento);
  },
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
