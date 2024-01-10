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
      title="Cadastar parcela"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <div class="w-2/12 pr-2">
            <label class="text-sm mt-8">Parcela</label>
            <vs-input class="w-full" v-model="form.parcela" />
          </div>
          <div class="w-3/12 pr-2">
            <label class="text-sm mt-8">Valor da parcela</label>
            <money
              class="vs-input--input h-12"
              v-model="form.valor_parcela"
              v-bind="formatMoney()"
            ></money>
          </div>
          <div class="w-4/12 pr-2">
            <SelectTipoPagamento @update="(val) => (form.id_forma_pagamento = val)" />
          </div>

          <div class="w-3/12">
            <vs-input
              :label="form.parcela == 0 ? 'Data de pagamento' : 'Data de vencimento'"
              class="w-full pr-2 mt-0"
              v-model="form.data_vencimento"
              type="date"
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
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
import SelectTipoPagamento from "@/components/SelectTipoPagamento";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectTipoPagamento },
  props: ["parcelas", "venda"],
  data: () => ({
    form: {},
    errors: [],
    modalState: false,
  }),
  methods: {
    async cadastrar() {
      const res = await this.createData("venda-parcelas", {
        ...this.form,
        id_venda: this.venda.id,
      });
      if (res != null) {
        this.$emit("update");
        this.form = {};
        this.modalState = false;
      }
    },
  },
  mounted() {
    Object.assign(this.form, {
      parcela: this.parcelas.filter((x) => x.parcela != 0).length + 1,
      valor_parcela: this.parcelas[this.parcelas.length - 1].valor_parcela,
      // id_forma_pagamento: this.venda.id_forma_pagamento,
      data_vencimento: this.addMonthsToDate(
        this.parcelas[this.parcelas.length - 1].data_vencimento,
        1
      ),
    });
  },
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
