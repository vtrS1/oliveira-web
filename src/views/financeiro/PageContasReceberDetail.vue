<template>
  <div>
    <vs-card v-if="vendaDetalhes != null">
      <div class="w-full flex flex-wrap justify-start">
        <div class="pt-3 flex pl-2 flex-wrap">
          <vs-button
            class="float-left"
            color="success"
            icon="arrow_back_ios"
            @click="() => $router.back()"
            type="flat"
          ></vs-button>
        </div>
        <div class="font-semibold text-lg pl-4 mb-2 mt-5">Informações</div>
        <div
          class="pt-3 flex float-right pl-2 flex-wrap"
          v-if="vendaDetalhes.id_venda_original != null"
        >
          <vs-button
            class="float-right"
            color="success"
            @click="
              () => {
                $router.push(
                  '/financeiro/contas/receber/' +
                    vendaDetalhes.id_venda_original
                );
                $router.go();
              }
            "
            icon="money"
            type="flat"
            >Ver conta original</vs-button
          >
        </div>
        <div
          class="pt-3 flex float-right pl-2 flex-wrap"
          v-if="vendaDetalhes.id_nova_venda != null"
        >
          <vs-button
            class="float-right"
            color="success"
            @click="
              () => {
                $router.push(
                  '/financeiro/contas/receber/' + vendaDetalhes.id_nova_venda
                );
                $router.go();
              }
            "
            icon="money"
            type="flat"
            >Ver nova venda</vs-button
          >
        </div>
      </div>

      <div class="flex vx-row w-full mt-5 pl-8">
        <div class="w-6/12 pr-2">
          <vs-list>
            <!-- <vs-list-header icon="info" title="Informações"></vs-list-header> -->
            <vs-list-item
              title="Ficha"
              class="cursor-pointer"
              @click.native="toFichaDetail(vendaDetalhes.id_ficha)"
              :subtitle="
                vendaDetalhes.ficha != undefined
                  ? vendaDetalhes.ficha.numero.toString()
                  : ''
              "
            ></vs-list-item>
            <vs-list-item
              title="Contrato"
              :subtitle="
                'nº ' + vendaDetalhes.ficha && vendaDetalhes.ficha.id_contrato
                  ? vendaDetalhes.ficha.id_contrato != undefined
                    ? vendaDetalhes.ficha.id_contrato.toString()
                    : ''
                  : ''
              "
            ></vs-list-item>
            <vs-list-item
              title="Data da venda"
              :subtitle="formatDateBrasil(vendaDetalhes.created_at)"
            ></vs-list-item>
            <vs-list-item
              class="cursor-pointer"
              @click.native="toDetailVendedor(vendaDetalhes.id_vendedor)"
              title="Vendedor"
              :subtitle="
                vendaDetalhes.vendedor && vendaDetalhes.vendedor.nome
                  ? vendaDetalhes.vendedor.id +
                    ' - ' +
                    vendaDetalhes.vendedor.nome
                  : ''
              "
            ></vs-list-item>
          </vs-list>
        </div>
        <div class="w-6/12 pr-2">
          <vs-list>
            <vs-list-item
              class="cursor-pointer"
              @click.native="toDetailSacado(vendaDetalhes.sacado.id)"
              title="Sacado"
              :subtitle="
                vendaDetalhes.sacado && vendaDetalhes.sacado.nome
                  ? vendaDetalhes.sacado.nome.toUpperCase()
                  : ''
              "
            ></vs-list-item>

            <vs-list-item
              title="Aluno"
              class="cursor-pointer"
              @click.native="toDetailAluno(vendaDetalhes.ficha.aluno.id)"
              :subtitle="
                vendaDetalhes.ficha && vendaDetalhes.ficha.aluno
                  ? vendaDetalhes.ficha.aluno.nome.toUpperCase()
                  : ''
              "
            ></vs-list-item>
            <vs-list-item
              v-if="vendaDetalhes.renegociada == 0"
              title="Situação"
            >
              <ContaReceberSituacao
                :venda="vendaDetalhes"
              ></ContaReceberSituacao>
            </vs-list-item>
            <vs-list-item
              v-if="vendaDetalhes.renegociada == 1"
              title="Situação"
              subtitle="Renegociada"
            ></vs-list-item>
            <vs-list-item
              title="OS"
              :subtitle="
                vendaDetalhes.os != null && vendaDetalhes.os != undefined
                  ? vendaDetalhes.os.toString()
                  : ''
              "
            ></vs-list-item>
          </vs-list>
        </div>
      </div>
    </vs-card>
    <vs-card v-else>
      <div class="centerx example-loading">
        <div class="fill-row-loading">
          <div class="vs-con-loading__container loading-example"></div>
        </div>
      </div>
    </vs-card>

    <div class="w-full my-5">
      <vs-list>
        <vs-list-item
          v-if="restricoes.length == 0"
          title="Sacado sem restrições"
          class="rounded-lg bg-white shadow-md py-2 pl-2 "
        >
          <vs-tooltip title="Adicionar restrição">
            <vs-button
              icon="add"
              color="success"
              @click="toDetailNegativado(vendaDetalhes.id_sacado)"
            ></vs-button>
          </vs-tooltip>
        </vs-list-item>
        <vs-list-item
          v-else
          title="Sacado com restrições"
          class="rounded-lg bg-danger text-white shadow-md pl-2"
        >
          <vs-tooltip title="Ver restrições do sacado">
            <vs-button
              icon="chevron_right"
              @click="toDetailNegativado(vendaDetalhes.id_sacado)"
              color="light"
              type="flat"
            ></vs-button>
            <span></span>
          </vs-tooltip>
        </vs-list-item>
      </vs-list>
    </div>

    <vs-card v-if="vendaDetalhes.parcelas.length > 0" title="Parcelas">
      <vs-table :data="vendaDetalhes.parcelas" notSpacer stripe>
        <template slot="header">
          <h3 class="ml-3">Parcelas</h3>
          <div class="w-full flex float-right text-right justify-end">
            <vs-button
              class="mr-2 float-right"
              @click="quitarVenda"
              color="success"
              v-if="
                hasAccess('quitar') &&
                  vendaDetalhes.status != 2 &&
                  vendaDetalhes.status != 0
              "
              icon="check"
              >Marcar como quitada</vs-button
            >
            <!-- <ModalRefazerParcelas
              :venda="vendaDetalhes"
              :parcelasVenda="vendaDetalhes.parcelas"
              @update="() => $router.go(0)"
            /> -->
            <vs-button
              class="mr-2 float-right"
              color="warning"
              icon="printer"
              @click="openReport()"
              >Resumo</vs-button
            >
            <ModalCadastroParcela
              :venda="vendaDetalhes"
              v-if="hasAccess('create') && vendaDetalhes.status != 0"
              :parcelas="vendaDetalhes.parcelas"
              @update="() => $router.go(0)"
            />
          </div>
        </template>
        <template slot="thead">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="id_ficha"> Parcela </vs-th>
          <vs-th sort-key="id_sacado"> Valor </vs-th>
          <vs-th sort-key="id_sacado"> Valor recebido</vs-th>
          <vs-th sort-key="id_forma_pagamento"> Forma de pagamento </vs-th>
          <vs-th sort-key="qtd_parcela"> Data do pagamento </vs-th>
          <vs-th sort-key="valor_total"> Data de vencimento </vs-th>
          <vs-th sort-key="status"> Status </vs-th>
          <vs-th> Ações </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].parcela">
              {{
                data[indextr].parcela != 0 ? data[indextr].parcela : "ENTRADA"
              }}
            </vs-td>

            <vs-td :data="data[indextr].valor_parcela">
              {{ formatMoneyBrasil(data[indextr].valor_parcela) }}
            </vs-td>

            <vs-td :data="data[indextr].valor_recebido">
              {{ formatMoneyBrasil(data[indextr].valor_recebido) }}
            </vs-td>

            <vs-td :data="data[indextr].formaPagamento">
              {{
                data[indextr].formaPagamento &&
                data[indextr].formaPagamento.nome
                  ? data[indextr].formaPagamento.nome
                  : ""
              }}
            </vs-td>

            <vs-td :data="data[indextr].data_recebimento">
              {{ formatDateBrasil(data[indextr].data_recebimento) }}
            </vs-td>

            <vs-td :data="data[indextr].data_vencimento">
              {{ formatDateBrasil(data[indextr].data_vencimento) }}
            </vs-td>

            <vs-td :data="data[indextr].status">
              <vs-chip>
                {{ getParcelaSitucao(data[indextr]) }}
                {{
                  data[indextr].obs != null ? `(${data[indextr].obs})` : ""
                }}</vs-chip
              >
              <!-- {{
                data[indextr].data_recebimento == null
                  ? "Não recebido"
                  : "Recebido"
              }} -->
            </vs-td>

            <vs-td :data="data[indextr].id">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12"
              >
                <vs-button
                  v-if="data[indextr].status != 0"
                  icon="credit_card"
                  type="flat"
                  @click="toDetailBoleto(data[indextr].id_venda)"
                  color="primary"
                ></vs-button>
                <ModalEditarParcela
                  v-if="hasAccess('update') && vendaDetalhes.status != 0"
                  :parcela="data[indextr]"
                  @update="() => $router.go(0)"
                />
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveParcela(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeParcela(data[indextr])"
                  color="danger"
                ></vs-button>
              </vs-col>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <vs-list>
        <!-- <vs-list-header icon="info" title="Informações"></vs-list-header> -->
        <vs-list-item
          title="Total da venda"
          :subtitle="getTotalVenda()"
        ></vs-list-item>
        <vs-list-item
          title="Total recebido"
          :subtitle="getTotalRecebido()"
        ></vs-list-item>
        <vs-list-item
          title="Total restante"
          :subtitle="getTotalRestante()"
        ></vs-list-item>
      </vs-list>
    </vs-card>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import ModalCadastroParcela from "./ModalCadastroParcela.vue";
import ModalEditarParcela from "./ModalEditarParcela.vue";
import ModalRefazerParcelas from "@/views/financeiro/ModalRefazerParcelas";
import useRule from "@/common/mixins/useRule.js";
import useReport from "@/common/mixins/useReport.js";
import ContaReceberSituacao from "./contas/ContaReceberSituacao";
export default {
  components: {
    ModalCadastroParcela,
    ModalEditarParcela,
    ModalRefazerParcelas,
    ContaReceberSituacao
  },
  mixins: [useHTTP, useData, useRule, useReport, PromptActiveDesactive],
  data: () => ({
    parcelas: [],
    restricoes: [],
    vendaDetalhes: {}
  }),
  methods: {
    async add() {
      await this.updateData("vendas/" + this, {
        ...this.vendaDetalhes,
        parcelas: this.vendaDetalhes.parcelas
      });
    },
    async quitarVenda() {
      await this.fetchData("vendas/quitar/" + this.$route.params.id);
      this.$router.go(0);
    },
    getQtdParcela() {
      return parseInt(this.vendaDetalhes.qtd_parcela);
    },
    getTotalRecebido(format = true) {
      let total = 0;
      for (let element of this.vendaDetalhes.parcelas) {
        if (element.valor_recebido != null) {
          total += parseFloat(element.valor_recebido);
        }
      }
      if (!format) return total;
      return this.formatMoneyBrasil(total);
    },
    getTotalVenda(format = true) {
      let total = 0;
      if (this.vendaDetalhes.parcelas != undefined) {
        for (let element of this.vendaDetalhes.parcelas) {
          if (element.status != 0) {
            total += parseFloat(element.valor_parcela);
          }
        }
        if (!format) return total;
      }
      return this.formatMoneyBrasil(total);
    },
    toDetailBoleto(id) {
      this.$router
        .push({
          path: "/financeiro/boletos/venda/" + id
        })
        .catch(() => {});
    },
    getTotalRestante() {
      const totalRecebido = this.getTotalRecebido(false);
      const totalValor = parseFloat(this.vendaDetalhes.valor_total);
      return this.formatMoneyBrasil(totalValor - totalRecebido);
    },
    getParcelasAtrasadas() {
      let total = 0;
      const dataAtual = new Date().toLocaleDateString();
      for (let element of this.vendaDetalhes.parcelas) {
        if (
          element.valor_recebido == null &&
          this.diffDates(new Date(element.data_vencimento), new Date()) < 0
        ) {
          total++;
        }
      }
      return total;
    },
    getStatusVenda() {
      let pagos = 0;
      let atrasados = 0;
      for (const parcela of this.vendaDetalhes.parcelas) {
        if (
          this.diffDates(new Date(parcela.data_vencimento), new Date()) < 0 &&
          (parcela.valor_pago <= 0 || parcela.valor_pago == null)
        ) {
          atrasados++;
        } else if (parcela.valor_pago > 0) {
          pagos++;
        }
      }
      if (atrasados > 0) return atrasados + " Parcelas atrasadas";
      if (pagos == this.vendaDetalhes.parcelas.length) return "Finalizado";
      else return "Em aberto";
    },
    toFichaDetail(id) {
      this.$router.push("/administracao/fichas?id=" + id);
    },
    getParcelaSitucao(parcela) {
      if (this.vendaDetalhes.status != 0) {
        if (
          this.diffDates(new Date(parcela.data_vencimento), new Date()) < 0 &&
          parcela.status == 1
        ) {
          return "Atrasada";
        } else if (
          parseFloat(parcela.valor_recebido) < parseFloat(parcela.valor_parcela)
        ) {
          return "Valor menor";
        } else if (
          parseFloat(parcela.valor_recebido) > parseFloat(parcela.valor_parcela)
        ) {
          return "Valor maior";
        } else if (parcela.status == 1) return "Não recebido";
        else if (parcela.status == 2) return "Recebido";
        else return "Inativa";
      } else {
        if (parcela.status == 2) return "Recebido";
        return "Desativada";
      }
    },
    async fetchVendaDetalhes() {
      const res = await this.fetchVendaById(
        true,
        this.$route.params.id,
        "parcelas=1&sacado=1&ficha=1&vendedor=1"
      );
      if (res != null) {
        this.vendaDetalhes = res;
      }
    },
    async _fetchRestricoesByIdSacado() {
      this.loading = true;
      this.restricoes = await this.fetchRestricoesByIdSacado(
        true,
        this.vendaDetalhes.id_sacado,
        ""
      );
      console.log(this.restricoes);
      this.loading = false;
    },
    toDetailAluno(id) {
      this.$router.push("/administracao/alunos/" + id);
    },
    toDetailSacado(id) {
      this.$router.push("/administracao/sacados/" + id);
    },
    toDetailVendedor(id) {
      this.$router.push("/administracao/vendedores/" + id);
    },
    toDetailNegativado(id) {
      this.$router
        .push({
          path: "/financeiro/inadimplentes?idSacado=" + id
        })
        .catch(() => {});
    },
    async openReport() {
      await this.generateReport("relatorioVendaCobrancaResumo", {
        id: this.vendaDetalhes.id
      });
    },
    async activeParcela(item) {
      this.activeConfirm(
        `Parcela ${item.parcela}`,
        "venda-parcelas/" + item.id,
        async val => {
          if (val) {
            await this.fetchVendaDetalhes();
          }
        }
      );
    },
    async desactiveParcela(item) {
      this.deleteConfirm(
        `Parcela ${item.parcela}`,
        "venda-parcelas/" + item.id,
        async val => {
          if (val) {
            await this.fetchVendaDetalhes();
          }
        }
      );
    }
  },
  async mounted() {
    this.route = "contasReceberDetail";
    await this.fetchVendaDetalhes();
    await this._fetchRestricoesByIdSacado();
  }
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
.vs-list--header {
  box-shadow: none !important;
}
</style>
