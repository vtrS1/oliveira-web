<template>
  <vs-card>
    <TableSSR
      title="Contas a Receber"
      route="vendas"
      :search="true"
      :key="tableKey"
      customInit="order=id&sort=desc&sacado=1&ficha=1&parcelas=1"
      customSearch="order=id&sort=desc&sacado=1&ficha=1&parcelas=1"
      customPageChange="order=id&sort=desc&sacado=1&ficha=1&parcelas=1"
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <ModalCadastroContaReceberVue
          v-if="hasAccess('create')"
          @update="() => tableKey++"
        />
      </template>
      <template slot="head">
        <vs-th sort-key="id">ID</vs-th>
        <vs-th sort-key="contrato"> Contrato </vs-th>
        <vs-th sort-key="id_ficha"> Ficha </vs-th>
        <vs-th sort-key="id_sacado"> Sacado </vs-th>
        <vs-th sort-key="qtd_parcela"> Parcelas </vs-th>
        <vs-th sort-key="valor_total"> Valor total </vs-th>
        <vs-th> Situação </vs-th>
        <vs-th> Ações </vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>
          <vs-td :data="data[indextr].ficha">
            {{ data[indextr].ficha.id_contrato }}
          </vs-td>
          <vs-td :data="data[indextr].id_ficha">
            <vs-chip
              class="cursor-pointer"
              @click.native="toFichaDetail(data[indextr].id_ficha)"
            >
              {{ data[indextr].ficha && data[indextr].ficha.numero }}
            </vs-chip>
          </vs-td>

          <vs-td :data="data[indextr].sacado">
            <vs-chip
              class="cursor-pointer"
              @click.native="toDetailSacado(data[indextr].id_sacado)"
            >
              {{
                data[indextr].sacado &&
                data[indextr].sacado.id +
                  " - " +
                  (data[indextr].sacado && data[indextr].sacado.nome.toUpperCase())
              }}</vs-chip
            >
          </vs-td>

          <vs-td>
            {{ data[indextr].parcelas.filter((x) => x.status != 0).length }}
          </vs-td>

          <vs-td :data="data[indextr].valor_total">
            {{ formatMoneyBrasil(data[indextr].valor_total) }}
          </vs-td>

          <vs-td>
            <vs-chip color="warning" v-if="data[indextr].status == 0">
              Desativada
              {{ data[indextr].renegociada == 1 ? " | Renegociada" : " " }}
            </vs-chip>
            <vs-chip
              color="success"
              v-else-if="
                getQtdParcelasPagas(data[indextr].parcelas) ==
                data[indextr].parcelas.length
              "
            >
              Finalizado
              {{ data[indextr].renegociada == 1 ? " | Renegociada" : " " }}
            </vs-chip>
            <vs-chip
              color="danger"
              v-else-if="getQtdParcelasAtrasadas(data[indextr].parcelas) > 0"
            >
              Parcela(s) atrasada(s)
              {{ data[indextr].renegociada == 1 ? " | Renegociada" : " " }}
            </vs-chip>
            <vs-chip color="primary" v-else>
              Pagamento em dia
              {{ data[indextr].renegociada == 1 ? " | Renegociada" : " " }}
            </vs-chip>
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('delete') && data[indextr].renegociada == 0"
                vs-w="4"
              >
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveContaReceber(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeContaReceber(data[indextr])"
                  color="danger"
                ></vs-button>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                <vs-tooltip title="Contrato">
                  <vs-button
                    icon="receipt_long"
                    type="flat"
                    @click="toContrato(data[indextr].os)"
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('show')"
                vs-w="4"
              >
                <vs-tooltip title="Detalhes da venda">
                  <vs-button
                    icon="chevron_right"
                    type="flat"
                    @click="toDetail(data[indextr].id)"
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
              </vs-col>
            </vs-row>
          </vs-td>
        </vs-tr>
      </template>
    </TableSSR>
    <p v-else class="text-center py-10 font-semibold text-xl">
      Uma permissão é necessária para acessar este conteúdo
    </p>
  </vs-card>
</template>

<script>
import useData from "@/common/mixins/useData";
import useHTTP from "@/common/mixins/useHTTP";
import ModalCadastroContaReceberVue from "./ModalCadastroContaReceber.vue";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";
import ENV from "@/common/env.js";
import ContaReceberSituacao from "./contas/ContaReceberSituacao";
export default {
  mixins: [useData, useHTTP, useRule, PromptActiveDesactive],
  components: {
    ModalCadastroContaReceberVue,
    ContaReceberSituacao,
    TableSSR,
  },
  data: () => ({
    tableKey: 0,
  }),
  methods: {
    async activeContaReceber(item) {
      this.activeConfirm(item.id, "vendas/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveContaReceber(item) {
      this.deleteConfirm(item.id, "vendas/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/financeiro/contas/receber/" + id);
    },
    toDetailSacado(id) {
      this.$router.push("/administracao/sacados/" + id);
    },
    toContrato(id) {
      window.open(ENV.API + "external/contrato/" + id, "_blank");
    },
    toFichaDetail(id) {
      this.$router.push("/administracao/fichas?id=" + id);
    },
    getQtdParcelasPagas(parcelas) {
      if (parcelas == null || parcelas == undefined) return 0;
      return parcelas.filter((q) => q.status == 2).length;
    },
    getQtdParcelasAtrasadas(parcelas) {
      if (parcelas == null || parcelas == undefined) return 0;
      return parcelas.filter(
        (q) => q.status == 1 && this.diffDates(q.data_vencimento, new Date()) < 0
      ).length;
    },
  },
  async mounted() {
    this.route = "contasReceber";
  },
};
</script>
