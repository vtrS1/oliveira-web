<template>
  <div>
    <vs-tooltip title="Renegociar conta">
      <vs-button
        icon="price_check"
        size="small"
        type="flat"
        @click="openModal"
        color="success"
      ></vs-button>

      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @accept="add"
      @close="close"
      :active.sync="modalStateRenegociar"
      title="Renegociar"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      class="p-0 m-0"
      id="create-ficha"
    >
      <div>
        <form class="pl-8">
          <div class="flex vx-row w-full mt-5">
            <div class="w-2/12 pr-2">
              <label class="text-sm mt-8">Total</label>
              <money
                class="vs-input--input"
                v-model="form.valor_total"
                v-bind="formatMoney()"
              ></money>
            </div>
            <div class="w-2/12 pr-2">
              <label class="text-sm mt-8">Valor da entrada</label>
              <money
                class="vs-input--input"
                v-model="form.valor_entrada"
                v-bind="formatMoney()"
              ></money>
            </div>
            <div class="w-4/12">
              <vs-input-number
                class="w-full mt-6"
                min="1"
                max="24"
                v-model="form.qtd_parcela"
                label="Qtd. Parcelas:"
              />
            </div>
            <div class="w-2/12">
              <vs-button
                class="w-full mt-4"
                color="success"
                type="filled"
                icon="money"
                block
                @click="gerarParcelas"
                >Gerar parcelas</vs-button
              >
            </div>
          </div>

          <div v-if="parcelas.length > 0" class="pr-8">
            <div class="font-semibold text-lg mb-2 mt-5">Parcelas</div>
            <div class="overflow-y-auto h-64 pr-2 rounded">
              <div
                class="w-full mt-5 pl-2"
                v-for="(item, idx) in parcelas"
                :key="'parcela-' + idx"
              >
                <div class="row flex flex-wrap">
                  <div class="w-2/12 pt-8">
                    {{
                      item.parcela == 0
                        ? "ENTRADA"
                        : `Parcela ${item.parcela}/${parcelas.length}`
                    }}
                  </div>

                  <div class="w-4/12 pr-2">
                    <label class="text-sm mt-8">Valor da parcela</label>
                    <money
                      class="vs-input--input"
                      v-bind="formatMoney()"
                      v-model="parcelas[idx].valor_parcela"
                    ></money>
                  </div>
                  <div class="w-4/12 pr-2">
                    <SelectTipoPagamento
                      @update="(val) => (parcelas[idx].id_forma_pagamento = val)"
                    />
                  </div>
                  <div class="w-2/12">
                    <vs-input
                      :disabled="item.parcela == 0"
                      :label="
                        item.parcela == 0 ? 'Data de pagamento' : 'Data de vencimento'
                      "
                      class="w-full pr-2 mt-0"
                      v-model="parcelas[idx].data_vencimento"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectTipoPagamento from "@/components/SelectTipoPagamento";
export default {
  components: { SelectTipoPagamento },
  mixins: [useHTTP, useData, PromptActiveDesactive],
  props: ["valor", "id_venda"],
  data: () => ({
    form: {
      qtd_parcela: 1,
      valor_total: 0,
      valor_entrada: 0,
    },
    fichas: [],
    parcelas: [],
    modalStateRenegociar: false,
  }),
  methods: {
    close() {
      this.modalStateRenegociar = false;
    },
    async add() {
      const res = await this.createData("vendas/renegociar/" + this.id_venda, {
        ...this.form,
        parcelas: this.parcelas,
      });
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {
          qtd_parcela: 1,
          valor_total: 0,
          valor_entrada: 0,
        };
        this.parcelas = [];
      }
    },
    getQtdParcela() {
      return parseInt(this.form.qtd_parcela);
    },
    valorTotal() {
      this.form.valor_total = this.form.valor_total;
      this.$forceUpdate();
    },
    gerarParcelas() {
      let date = new Date();
      const valorAPagarPosterior =
        parseFloat(this.form.valor_total) - parseFloat(this.form.valor_entrada);
      const valorAPagarParcelas = valorAPagarPosterior / parseInt(this.form.qtd_parcela);
      this.parcelas = [];
      if (this.form.valor_entrada != null && parseFloat(this.form.valor_entrada) > 0) {
        this.parcelas.push({
          id_forma_pagamento: this.form.id_forma_pagamento,
          valor_parcela: parseFloat(this.form.valor_entrada),
          data_vencimento: this.formatDate(date),
          parcela: 0,
        });
      }
      for (let i = 1; i <= parseInt(this.form.qtd_parcela); i++) {
        this.parcelas.push({
          id_forma_pagamento: this.form.id_forma_pagamento,
          valor_parcela: valorAPagarParcelas,
          data_vencimento: this.addDaysToDate(date, 30),
          parcela: i,
        });
        date = this.addDaysToDate(date, 30);
      }
      this.$forceUpdate();
    },
    openModal() {
      this.modalStateRenegociar = true;
      this.form.valor_total = this.valor;
      this.$forceUpdate();
    },
  },
  async mounted() {
    this.form.valor_total = this.valor;
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
