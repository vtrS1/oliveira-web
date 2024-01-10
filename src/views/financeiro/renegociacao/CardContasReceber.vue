<template>
  <vs-card>
    <TableSSR
      title="Contas a Receber do Sacado"
      route="vendas"
      :search="true"
      :key="tableKey"
      :customInit="`order=id&sort=desc&sacado=1&parcelas=1&ficha=1&id_sacado=${idSacado}`"
      :customSearch="`order=id&sort=desc&sacado=1&parcelas=1&ficha=1&id_sacado=${idSacado}`"
      :customPageChange="`order=id&sort=desc&sacado=1&parcelas=1&ficha=1&id_sacado=${idSacado}`"
    >
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

          <vs-td :data="data[indextr].qtd_parcela">
            {{ data[indextr].qtd_parcela }}
          </vs-td>

          <vs-td :data="data[indextr].valor_total">
            {{ formatMoneyBrasil(data[indextr].valor_total) }}
          </vs-td>

          <vs-td :data="data[indextr].qtd_parcela_atrasada">
            <ContaReceberSituacao
              v-if="idVendaAtual != data[indextr].id"
              :venda="data[indextr]"
            />
            <vs-chip color="primary" v-if="idVendaAtual == data[indextr].id"
              >Sendo exibida agora</vs-chip
            >
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                <vs-tooltip
                  title="Verificar se há inadimplência"
                  v-if="idVendaAtual != data[indextr].id"
                >
                  <vs-button
                    icon="person_search"
                    type="flat"
                    @click="
                      verificarInadiplencia(
                        data[indextr].ficha.id_contrato,
                        data[indextr].ficha.numero
                      )
                    "
                    color="primary"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
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
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
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
  </vs-card>
</template>

<script>
import TableSSR from "@/components/TableSSR";
import useData from "@/common/mixins/useData";
import ContaReceberSituacao from "./../contas/ContaReceberSituacao";
import ENV from "@/common/env.js";
export default {
  components: {
    TableSSR,
    ContaReceberSituacao,
  },
  mixins: [useData],
  props: {
    idSacado: { type: Number, required: true },
    idVendaAtual: { type: Number },
  },
  data: () => ({
    tableKey: 0,
  }),
  methods: {
    toDetail(id) {
      //   this.$router.push("/financeiro/contas/receber/" + id);
      let routeData = this.$router.resolve({
        path: "/financeiro/contas/receber/" + id,
      });
      window.open(routeData.href, "_blank");
    },
    toDetailSacado(id) {
      let routeData = this.$router.resolve({
        path: "/administracao/sacados/" + id,
      });
      window.open(routeData.href, "_blank");
    },
    toContrato(id) {
      window.open(ENV.API + "external/contrato/" + id, "_blank");
    },
    toFichaDetail(id) {
      let routeData = this.$router.resolve({
        path: "/administracao/fichas?id=" + id,
      });
      window.open(routeData.href, "_blank");
    },
    verificarInadiplencia(contrato, ficha) {
      const route = `/financeiro/renegociar?contrato=${contrato}&numero=${ficha}`;
      let routeData = this.$router.resolve({
        path: route,
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
