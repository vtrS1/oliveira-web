<template>
  <vs-card v-if="hasAccess('show')">
    <TableSSR
      title="Parâmetros"
      route="parametros"
      :search="true"
      :key="tableKey"
      customInit="order=id&sort=desc"
      customSearch="order=id&sort=desc"
      customPageChange="order=id&sort=desc"
      v-if="hasAccess('show')"
    >
      <template slot="head">
        <vs-th sort-key="id">#</vs-th>
        <vs-th sort-key="detalhe"> Descrição </vs-th>
        <vs-th sort-key="metodo"> Grupo </vs-th>
        <vs-th sort-key="rota"> Subgrupo </vs-th>
        <vs-th sort-key="usuario"> Valor </vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].detalhe">
            {{ data[indextr].detalhe }}
          </vs-td>

          <vs-td :data="data[indextr].grupo">
            {{ data[indextr].grupo }}
          </vs-td>

          <vs-td :data="data[indextr].subgrupo">
            {{ data[indextr].subgrupo }}
          </vs-td>

          <vs-td :data="data[indextr].valor">
            {{ data[indextr].valor }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <ModalEditarParametro
              v-if="hasAccess('update')"
              :parametro="data[indextr]"
              @update="() => tableKey++"
            />
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
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule],
  components: {
    ModalEditarParametro,
    TableSSR
  },
  data: () => ({
    id_usuario: null,
    tableKey: 0,
    userPermissions: []
  }),
  methods: {},
  created() {},
  async mounted() {
    this.route = "ajustes";
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
