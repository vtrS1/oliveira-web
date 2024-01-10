<template>
  <vs-card v-if="hasAccess('show')">
    <TableSSR
      title="Logs"
      route="logs"
      :search="true"
      :key="tableKey"
      customInit="order=id&sort=desc&usuario=1"
      customSearch="order=id&sort=desc&usuario=1"
      customPageChange="order=id&sort=desc&usuario=1"
      v-if="hasAccess('show')"
    >
      <template slot="head">
        <vs-th sort-key="id">#</vs-th>
        <vs-th sort-key="metodo"> Ação </vs-th>
        <vs-th sort-key="rota"> Rota </vs-th>
        <vs-th sort-key="usuario"> Usuário </vs-th>
        <vs-th sort-key="data"> Conteúdo </vs-th>
        <vs-th sort-key="created_at"> Data </vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].metodo">
            {{ getAction(data[indextr].metodo) }}
          </vs-td>

          <vs-td :data="data[indextr].rota">
            {{ data[indextr].rota }}
          </vs-td>

          <vs-td :data="data[indextr].usuario">
            {{
              data[indextr].usuario != null
                ? data[indextr].usuario.email +
                  " - " +
                  data[indextr].usuario.nome
                : ""
            }}
          </vs-td>

          <vs-td :data="data[indextr].data">
            <vue-json-pretty :path="'res'" :data="data[indextr].data">
            </vue-json-pretty>
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{ formatDateTimeBrasil(data[indextr].created_at) }}
          </vs-td>
        </vs-tr>
      </template>
    </TableSSR>
  </vs-card>
  <vs-card v-else>
    <p class="text-center py-10 font-semibold text-xl">
      Uma permissão é necessária para acessar este conteúdo
    </p>
  </vs-card>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import permissionsScheme from "@/common/permissions";
import ModalEditarParametro from "@/views/modals/ModalEditarParametro";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule],
  components: {
    ModalEditarParametro,
    VueJsonPretty,
    TableSSR
  },
  data: () => ({
    tableKey: 0
  }),
  methods: {
    getAction(action) {
      if (action == "GET") return "Buscar dados";
      if (action == "PUT") return "Atualização de dados";
      if (action == "POST") return "Cadastro de dados";
      if (action == "DELETE") return "Desativar dados";
      return "Desconhecido";
    }
  },
  async mounted() {
    this.route = "logs";
  }
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
