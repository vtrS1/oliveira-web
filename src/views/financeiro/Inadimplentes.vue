<template lang="html">
  <vs-card>
    <TableSSR
      :title="`Negativados ${subtitle}`"
      route="negativados"
      :search="true"
      :key="tableKey"
      :customInit="`order=id&sort=desc&sacado=1${custom}`"
      :customSearch="`order=id&sort=desc&sacado=1${custom}`"
      :customPageChange="`order=id&sort=desc&sacado=1${custom}`"
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <ModalCadastrarInadimplente
          v-if="hasAccess('create')"
          @update="() => tableKey++"
        />
      </template>
      <template slot="head">
        <vs-th sort-key="id">ID</vs-th>
        <vs-th sort-key="nome"> Sacado </vs-th>
        <vs-th sort-key="venda"> Venda </vs-th>
        <vs-th sort-key="data_inclusao">Inclusão</vs-th>
        <!-- <vs-th sort-key="data_execucao">Execuação</vs-th> -->
        <vs-th> Obs </vs-th>
        <vs-th> Situação </vs-th>
        <vs-th> Ações </vs-th>
      </template>
      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].sacado">
            <vs-chip @click.native="toDetail(data[indextr].id_sacado)">
              {{
                data[indextr].sacado &&
                `${data[indextr].sacado.id} - ${data[indextr].sacado.nome} - ${data[indextr].sacado.cpf}`
              }}</vs-chip
            >
          </vs-td>

          <vs-td :data="data[indextr].id_venda">
            <vs-chip @click.native="toVendaDetail(data[indextr].id_venda)">
              {{ data[indextr].id_venda }}</vs-chip
            >
          </vs-td>

          <vs-td>
            {{
              data[indextr].data_inclusao && formatDateBrasil(data[indextr].data_inclusao)
            }}
          </vs-td>

          <!-- <vs-td>
            {{
              data[indextr].data_inclusao && formatDateBrasil(data[indextr].data_execucao)
            }}
          </vs-td> -->

          <vs-td>
            {{ data[indextr].obs }}
          </vs-td>

          <vs-td>
            <vs-chip v-if="data[indextr].status == 0" color="warning"
              >Negativação desativada</vs-chip
            >
            <vs-chip v-else-if="data[indextr].bloqueado" color="danger"
              >Bloqueado para novas vendas</vs-chip
            >
          </vs-td>

          <vs-td :data="data[indextr].id" style="width: 150px">
            <vs-row vs-justify="flex-end">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('show')"
                vs-w="4"
              >
                <ModalEditarInadimplentes
                  :negativado="data[indextr]"
                  @update="() => tableKey++"
                />
              </vs-col>

              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('delete')"
                vs-w="4"
              >
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveNegativado(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeNegativado(data[indextr])"
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
  </vs-card>
</template>

<script>
import ModalCadastrarInadimplente from "@/views/financeiro/inadimplentes/ModalCadastrarInadimplente";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useRule from "@/common/mixins/useRule.js";
import useData from "@/common/mixins/useData";
import TableSSR from "@/components/TableSSR";
import useUtils from "@/common/mixins/useUtils";
import ModalEditarInadimplentes from "./inadimplentes/ModalEditarInadimplentes.vue";
export default {
  mixins: [useHTTP, useUtils, useData, useRule, PromptActiveDesactive],
  components: {
    ModalCadastrarInadimplente,
    TableSSR,
    ModalEditarInadimplentes,
  },
  data: () => ({
    form: {},
    id_instituicao: 0,
    tableKey: 1,
    subtitle: "",
    custom: "",
  }),
  methods: {
    async activeNegativado(item) {
      this.activeConfirm(item.nome, "negativados/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveNegativado(item) {
      this.deleteConfirm(item.nome, "negativados/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/administracao/sacados/" + id);
    },
    toVendaDetail(id) {
      this.$router.push("/financeiro/contas/receber/" + id);
    },
  },
  async mounted() {
    this.route = "aluno";

    if (this.$route.query.idSacado != undefined) {
      this.subtitle = " do sacado " + this.$route.query.idSacado;
      this.custom = this.$route.query.idSacado
        ? `&idSacado=${this.$route.query.idSacado}`
        : "";
    }
  },
};
</script>

<style>
.vs-con-table,
.vs-con-tbody {
  border: none !important;
}
.vs-table--tbody-table tr {
  height: 50px;
}
</style>
