<template>
  <div>
    <vs-card>
      <div slot="header">
        <p>{{ title }}</p>
      </div>

      <vs-alert class="w-full" v-if="cupons != null && cupons.length > 0">
        <div class="w-full flex flex-wrap">
          <div class="w-10/12">
            Foram identificados cupons de desconto ativos nesse momento. Você deseja usar?
          </div>
          <div class="w-2/12">
            <vs-select
              class="w-full"
              v-model="form.cupomNome"
              @change="getValorFinalComDesconto"
            >
              <vs-select-item text="Não usar" :value="null" />
              <vs-select-item
                v-for="cupom in cupons"
                :key="cupom.id"
                :value="cupom.nome"
                :text="cupom.nome"
              />
            </vs-select>
          </div>
        </div>
      </vs-alert>

      <form class="w-full">
        <div class="flex flex-wrap w-full mt-5">
          <div class="w-4/12" v-if="cupons != null && cupons.length > 0">
            <vs-input
              class="w-full"
              label="Código Desconto"
              v-model="form.cupomNome"
            ></vs-input>
            <span v-if="cupom && cupom.descricao">{{ cupom.descricao }}</span>
          </div>
          <div class="w-4/12" v-else>
            <vs-input
              @change="getValorFinalComDesconto"
              class="w-full"
              label="Código Desconto"
              v-model="form.cupomNome"
            ></vs-input>
            <span v-if="cupom && cupom.descricao">{{ cupom.descricao }}</span>
          </div>
          <div class="w-2/12 px-2">
            <label class="text-sm">Total</label>
            <money
              disabled
              class="vs-input--input w-full"
              v-model="novaVenda.valor_total"
              v-bind="formatMoney()"
            ></money>
          </div>
          <div class="w-2/12">
            <vs-input
              class="w-full"
              label="N. Parcelas"
              v-model="form.qtd_parcela"
            ></vs-input>
          </div>
          <div class="w-4/12 pl-2">
            <vs-button
              class="mt-4 w-full"
              color="success"
              type="filled"
              icon="money"
              @click="gerarParcelas"
              >Gerar parcelas</vs-button
            >
          </div>
        </div>

        <div v-if="parcelas.length > 0">
          <div class="font-semibold text-lg mb-2 mt-5">Parcelas</div>
          <div class="overflow-y-auto h-64 pr-2 rounded">
            <div
              class="w-full mt-5 pl-2"
              v-for="(item, idx) in parcelas"
              :key="'parcela-' + idx"
            >
              <div class="row flex flex-wrap">
                <div class="w-2/12 pt-8">
                  {{ `Parcela ${item.parcela}/${parcelas.length}` }}
                </div>

                <div class="w-2/12 pr-2">
                  <label class="text-sm mt-8">Valor</label>
                  <money
                    class="vs-input--input"
                    v-bind="formatMoney()"
                    v-model="parcelas[idx].valor_parcela"
                  ></money>
                </div>
                <div class="w-4/12">
                  <vs-input
                    label="Data de vencimento"
                    class="w-full pr-2 mt-0"
                    v-model="parcelas[idx].data_vencimento"
                    type="date"
                  />
                </div>
                <div class="w-4/12">
                  <vs-input
                    label="Obs"
                    class="w-full pr-2 mt-0"
                    v-model="parcelas[idx].obs"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-2">
            <vs-button
              class="mt-4 w-full"
              color="success"
              type="filled"
              block
              icon="save"
              @click="add"
              >Salvar renegociação</vs-button
            >
          </div>
        </div>
      </form>
    </vs-card>
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
  props: {
    valor: { type: String | Number },
    id_venda: { type: Number },
    title: { type: String, default: "Renegociar" },
    cupons: { type: Array, default: null },
  },
  data: () => ({
    form: {
      qtd_parcela: 1,
      valor_total: 0,
      valor_entrada: 0,
      id_cupom: null,
    },
    cupom: null,
    fichas: [],
    parcelas: [],
    novaVenda: {
      valor_total: 0,
    },
  }),
  methods: {
    async add() {
      const dataForm = {
        id_venda: this.id_venda,
        parcelas: this.parcelas,
        cupom: this.form.cupomNome,
      };
      const res = await this.simplePost("renegociar/venda", dataForm);
      if (res.error != undefined) {
        this.$vs.notify({
          title: "Ops...",
          text: res.error ?? "500 - Erro interno",
          color: "warning",
          time: 7000,
        });
      } else {
        this.$router.push("/financeiro/contas/receber/" + res.id);
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
      if (parseInt(this.form.qtd_parcela) > 5) {
        this.$vs.notify({
          title: "Ops...",
          text: "Número máximo de parcelas é 5",
          color: "warning",
        });
        return;
      }
      let date = new Date();
      const valorAPagarParcelas =
        this.novaVenda.valor_total / parseInt(this.form.qtd_parcela);
      this.parcelas = [];
      for (let i = 1; i <= parseInt(this.form.qtd_parcela); i++) {
        this.parcelas.push({
          id_forma_pagamento: 1, // Boleto
          valor_parcela: valorAPagarParcelas,
          data_vencimento: this.addDaysToDate(date, 30),
          parcela: i,
        });
        date = this.addDaysToDate(date, 30);
      }
      this.$forceUpdate();
    },
    async getValorFinalComDesconto() {
      const formDesconto = {
        id_venda: this.id_venda,
        cupom: this.form.cupomNome,
      };
      this.cupom = await this.simplePost("renegociar/desconto", formDesconto);
      if (this.cupom.error != undefined) {
        this.$vs.notify({
          title: "Ops...",
          text: this.cupom.error ?? "404 - Não encontrado",
          color: "warning",
        });
      }
      console.log(this.cupom);
      this.novaVenda.valor_total = this.cupom.valorAtrasadoCorrigido;

      this.tableKey++;
      this.$forceUpdate();
    },
  },
  async mounted() {
    this.form.valor_total = this.valor;
    this.novaVenda.valor_total = this.valor;
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
