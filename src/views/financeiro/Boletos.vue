<template>
  <vs-card>
    <TableSSR
      :title="`Boletos ${subtitle}`"
      route="boletos"
      :search="true"
      :currentPage="pageTable"
      @pageChange="setPageTable"
      :key="tableKey"
      :customInit="
        `order=id&sort=desc&parcela=1&ficha=1&sacado=1${custom}${
          dataRemessa != null ? '&date=' + dataRemessa : ''
        }${pageTable != null ? '&page=' + pageTable : ''}`
      "
      :customSearch="
        `order=id&sort=desc&parcela=1&ficha=1&sacado=1${custom}${
          dataRemessa != null ? '&date=' + dataRemessa : ''
        }`
      "
      :customPageChange="
        `order=id&sort=desc&parcela=1&ficha=1&sacado=1${custom}${
          dataRemessa != null ? '&date=' + dataRemessa : ''
        }`
      "
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <vs-input
          type="date"
          v-model="dataRemessa"
          @change="val => setDate(val)"
          label="Data de geração"
          class="pr-2 pt-0 mt-0"
          v-if="hasAccess('remessa')"
        ></vs-input>
        <div>
          <vs-button
            class="mt-4 mr-2 float-right"
            color="success"
            v-if="hasAccess('remessa')"
            @click="gerarRemessa"
            >Gerar arq. de remessa</vs-button
          >
        </div>
        <div>
          <ModalBaixaAutomatica v-if="hasAccess('retorno')" />
        </div>
      </template>
      <template slot="head">
        <vs-th sort-key="id">#</vs-th>
        <vs-th sort-key="pessoas_nome">Sacado</vs-th>
        <vs-th sort-key="venda_parcelas_parcela">Parcela</vs-th>
        <vs-th sort-key="valor">Valor</vs-th>
        <vs-th sort-key="valor_recebido">Valor recebido</vs-th>
        <vs-th sort-key="data_vencimento"> Vencimento </vs-th>
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

          <vs-td :data="data[indextr].id_sacado">
            <vs-chip
              class="cursor-pointer"
              @click.native="toDetailSacado(data[indextr].id_sacado)"
            >
              {{
                data[indextr].id_sacado +
                  " - " +
                  data[indextr].sacado.nome.toUpperCase()
              }}</vs-chip
            >
          </vs-td>

          <vs-td :data="data[indextr].vendaParcela">
            {{
              data[indextr].vendaParcela && data[indextr].vendaParcela.parcela
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

          <vs-td>
            <div :set="(situacaoBoleto = getBoletoStatus(data[indextr]))">
              <vs-chip :color="situacaoBoleto.color">
                {{ situacaoBoleto.status }}
              </vs-chip>
            </div>
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{ formatDateBrasil(data[indextr].created_at) }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('show')"
                vs-w="12"
              >
                <vs-tooltip text="Ver o contas a receber dessa venda">
                  <vs-button
                    icon="credit_card"
                    type="flat"
                    @click="toDetailVenda(data[indextr].id_venda)"
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
                <vs-tooltip text="Situação do boleto">
                  <modal-editar-boleto
                    :boleto="data[indextr]"
                    @update="() => tableKey++"
                  ></modal-editar-boleto>
                  <span></span>
                </vs-tooltip>
                <vs-tooltip text="Detalhes do boleto">
                  <registro-manual-detail-model
                    :boleto="data[indextr]"
                  ></registro-manual-detail-model>
                  <span></span>
                </vs-tooltip>
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
                  v-if="
                    data[indextr].status &&
                      data[indextr].status != 2 &&
                      hasAccess('delete')
                  "
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveBoleto(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="
                    !data[indextr].status &&
                      data[indextr].status != 2 &&
                      hasAccess('delete')
                  "
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
    <p v-else class="text-center py-10 font-semibold text-xl">
      Uma permissão é necessária para acessar este conteúdo
    </p>
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
import useBoleto from "@/common/mixins/useBoleto";
import ModalBaixaAutomatica from "@/views/financeiro/ModalBaixaAutomatica";
import useRule from "@/common/mixins/useRule.js";
import ENV from "./../../common/env";
import TableSSR from "@/components/TableSSR";
import RegistroManualDetailModel from "./boletos/RegistroManualDetail.model.vue";
import ModalEditarBoleto from "./boletos/ModalEditarBoleto.vue";
export default {
  mixins: [useData, useHTTP, useRule, useBoleto],
  components: {
    ModalBaixaAutomatica,
    TableSSR,
    RegistroManualDetailModel,
    ModalEditarBoleto
  },
  data: () => ({
    tableKey: 0,
    dataRemessa: null,
    boletosFilters: [],
    boletosSelecionados: [],
    date: null,
    imprimirPopUp: false,
    currentOs: null,
    custom: "",
    subtitle: "",
    pageTable: 1
  }),
  methods: {
    async activeBoleto(item) {
      this.activeConfirm(item.nome, "boletos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveBoleto(item) {
      this.deleteConfirm(item.nome, "boletos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/financeiro/boletos/" + id);
    },
    toDetailVenda(id) {
      this.$router.push("/financeiro/contas/receber/" + id);
    },
    toDetailSacado(id) {
      this.$router.push("/administracao/sacados/" + id);
    },
    async gerarRemessa() {
      if (this.dataRemessa != null) {
        const res = await this.createData("boletos/remessa", {
          data: this.dataRemessa
        });
        if (res.file != undefined) {
          console.log(ENV.REMESSA_DIR + res.file);
          window.open(ENV.REMESSA_DIR + res.file, "_blank");
        }
        if (res.errors != undefined && res.errors.length > 0) {
          let boletos = "";
          for (let boleto of res.errors) {
            boletos += boleto.id_boleto + ", ";
          }
          this.$vs.dialog({
            color: this.colorAlert,
            title: "Ops...",
            acceptText: "Entendido",
            text:
              "A remessa foi gerada com sucesso, mais alguns boletos foram deixados de fora devido a erros. Verifique os dados do sacado bem como o endereço do aluno e tente novamente. (Boletos: " +
              boletos +
              ")"
          });
        }
      } else {
        this.$vs.notify({
          color: "warning",
          title: "Ops...",
          text: "Selecione uma data válida"
        });
      }
    },
    async openBoleto(id) {
      const res = await this.fetchData("boletos/exibir/" + id);
      if (res.file != undefined) {
        console.log(res.file);
        window.open(res.file, "_blank");
      }
    },
    async openUrl(url) {
      window.open(url, "_blank");
    },
    async toggleModalPrintBoletos(os) {
      this.currentOs = os;
      this.imprimirPopUp = true;
    },
    async openBoletos(paper = "a4") {
      this.imprimirPopUp = false;
      if (paper == "a4") {
        const res = await this.fetchData(
          "boletos/exibirBoletos/" + this.currentOs
        );
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
    setDate(date) {
      // this.dataRemessa = date;
      this.tableKey++;
    },
    setPageTable(val) {
      this.$router
        .push({
          path: "/financeiro/boletos",
          query: {
            pageTable: val
          }
        })
        .catch(() => {});
      this.pageTable = val;
    }
  },
  async mounted() {
    this.route = "boleto";
    if (this.$route.query.idSacado != undefined) {
      this.subtitle = " do sacado " + this.$route.query.idSacado;
      this.custom = this.$route.query.idSacado
        ? `&idSacado=${this.$route.query.idSacado}`
        : "";
    } else if (this.$route.query.cpf) {
      this.subtitle = " do sacado " + this.$route.query.cpf;
      this.custom = this.$route.query.cpf
        ? `&cpfSacado=${this.$route.query.cpf}`
        : "";
    }
  }
};
</script>
