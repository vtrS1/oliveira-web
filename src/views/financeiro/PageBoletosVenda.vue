<template>
  <vs-card>
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
      <div class="font-semibold text-lg pl-4 mb-2 mt-5">
        Boletos da venda
        {{ $route.params.id }}
      </div>
    </div>
    <TableSSR
      title=""
      route="boletos"
      :search="true"
      :key="tableKey"
      :customInit="'sacado=1&parcela=1&ficha=1&venda=' + $route.params.id"
      customSearch="order=id&sort=desc&sacado=1&parcela=1&ficha=1"
      customPageChange="order=id&sort=desc&sacado=1&parcela=1&ficha=1"
      v-if="hasAccess('show')"
    >
      <template slot="head">
        <vs-th sort-key="id">#</vs-th>
        <!-- <vs-th sort-key="id_venda">Contas a Receber</vs-th> -->
        <vs-th sort-key="pessoas_nome">Sacado</vs-th>
        <vs-th sort-key="fichas_contrato">Ficha</vs-th>
        <vs-th sort-key="venda_parcelas_parcela">Parcela</vs-th>
        <vs-th sort-key="venda_parcelas_valor_parcela">Valor</vs-th>

        <vs-th sort-key="valor_recebido">Valor recebido</vs-th>
        <vs-th sort-key="venda_parcelas_data_vencimento"> Vencimento </vs-th>
        <vs-th sort-key="data_recebimento"> Recebido </vs-th>
        <vs-th>Situação</vs-th>
        <vs-th>Data de geração</vs-th>
        <vs-th>Ações</vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <!-- <vs-td :data="data[indextr].id_venda">
            {{ data[indextr].id_venda }}
          </vs-td> -->

          <vs-td :data="data[indextr].sacado">
            {{
              data[indextr].id_sacado +
              " - " +
              (data[indextr].sacado && data[indextr].sacado.nome
                ? data[indextr].sacado.nome
                : "")
            }}
          </vs-td>

          <vs-td :data="data[indextr].ficha">
            {{ data[indextr].ficha && data[indextr].ficha.id }}
          </vs-td>

          <vs-td :data="data[indextr].vendaParcela">
            {{
              data[indextr].vendaParcela && data[indextr].vendaParcela.parcela
                ? data[indextr].vendaParcela.parcela
                : ""
            }}
          </vs-td>

          <vs-td :data="data[indextr].valor">
            {{ formatMoneyBrasil(data[indextr].valor) }}
          </vs-td>

          <vs-td :data="data[indextr].valor_recebido">
            {{ formatMoneyBrasil(data[indextr].valor_recebido) }}
          </vs-td>

          <vs-td :data="data[indextr].data_vencimento">
            {{ formatDateBrasil(data[indextr].data_vencimento) }}
          </vs-td>

          <vs-td :data="data[indextr].data_recebimento">
            {{ formatDateBrasil(data[indextr].data_recebimento) }}
          </vs-td>

          <vs-td :data="data[indextr].venda_parcelas_parcela">
            <vs-chip
              v-if="data[indextr].valor_recebido == data[indextr].valor"
              color="success"
            >
              Recebido
            </vs-chip>

            <vs-chip
              v-else-if="
                data[indextr].valor_recebido > data[indextr].valor &&
                data[indextr].valor_recebido != null
              "
              color="warning"
            >
              Recebido a mais
            </vs-chip>
            <vs-chip
              v-else-if="
                data[indextr].valor_recebido < data[indextr].valor &&
                data[indextr].valor_recebido != null
              "
              color="warning"
            >
              Recebido a menos
            </vs-chip>
            <!-- <vs-chip
              v-else-if="diffDates(data[indextr].data_vencimento, new Date()) < 0"
              color="danger"
            >
              Atrasado
            </vs-chip> -->

            <vs-chip v-else color="primary">Aguardando</vs-chip>
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{ formatDateBrasil(data[indextr].created_at) }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <!-- <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('show')"
                vs-w="6"
              >
                <vs-button
                  icon="edit"
                  type="flat"
                  @click="toDetail(data[indextr].id)"
                  color="primary"
                ></vs-button>
              </vs-col> -->
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('delete')"
                vs-w="12"
              >
                <!-- <vs-tooltip text="Imprimir este boleto">
                  <vs-button
                    icon="picture_as_pdf"
                    type="flat"
                    @click="openBoleto(data[indextr].id)"
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip> -->
                <vs-tooltip text="Imprimir todos os boletos dessa venda">
                  <vs-button
                    icon="print"
                    type="flat"
                    @click="toggleModalPrintBoletos(data[indextr].os)"
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveBoleto(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeBoleto(data[indextr])"
                  color="danger"
                ></vs-button>
              </vs-col>
            </vs-row>
          </vs-td>
        </vs-tr>
      </template>
    </TableSSR>
    <vs-popup title="Imprimir boletos da venda" :active.sync="imprimirPopUp">
      <vs-button @click="openBoletos('a4')" class="float-left" type="relief"
        >Folha A4</vs-button
      >
      <vs-button
        @click="openBoletos('zebra')"
        class="float-right"
        color="success"
        type="relief"
        >Impressora Zebra</vs-button
      >
    </vs-popup>
  </vs-card>
</template>

<script>
import useData from "@/common/mixins/useData";
import useHTTP from "@/common/mixins/useHTTP";
import ModalCadastroContaReceberVue from "./ModalCadastroContaReceber.vue";
import ModalBaixaAutomatica from "@/views/financeiro/ModalBaixaAutomatica";
import useRule from "@/common/mixins/useRule.js";
import ENV from "./../../common/env";
import TableSSR from "@/components/TableSSR";
import PromptActiveDesactive from "../../common/mixins/PromptActiveDesactive";
export default {
  mixins: [useData, useHTTP, useRule, PromptActiveDesactive],
  components: {
    ModalCadastroContaReceberVue,
    ModalBaixaAutomatica,
    TableSSR,
  },
  data: () => ({
    tableKey: 0,
    imprimirPopUp: false,
    currentOs: null,
  }),
  methods: {
    async activeBoleto(item) {
      this.activeConfirm(item.id, "boletos/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveBoleto(item) {
      this.deleteConfirm(item.id, "boletos/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/financeiro/boletos/" + id);
    },
    async openBoleto(id) {
      const res = await this.fetchData("boletos/exibir/" + id);
      if (res.file != undefined) {
        window.open(res.file, "_blank");
      }
    },
    async toggleModalPrintBoletos(os) {
      this.currentOs = os;
      this.imprimirPopUp = true;
    },
    async openBoletos(paper = "a4") {
      this.imprimirPopUp = false;
      if (paper == "a4") {
        const res = await this.fetchData("boletos/exibirBoletos/" + this.currentOs);
        if (res.file != undefined) {
          window.open(`${res.file}&paper=${paper}`, "_blank");
        }
      } else {
        window.open(
          `https://oliveira.anc-app.xyz/external/boletos/${this.currentOs}`,
          "_blank"
        );
      }
    },
  },
  async mounted() {
    this.route = "boleto";
  },
};
</script>
