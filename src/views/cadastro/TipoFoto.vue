<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Tipos de Produtos"
        route="tipos/produtos"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroTipoFotoVue
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="descricao"> Descrição </vs-th>
          <vs-th>Operações</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id" style="width: 70px">
              {{ data[indextr].id }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].descricao">
              {{ data[indextr].descricao }}
            </vs-td>

            <vs-td :data="data[indextr].id" style="width: 150px">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('update')"
                  vs-w="6"
                >
                  <ModalEditarTipoFotoVue
                    :tipo="data[indextr]"
                    @update="() => tableKey++"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="6"
                  v-if="hasAccess('delete')"
                >
                  <vs-button
                    v-if="data[indextr].status"
                    icon="toggle_on"
                    color="success"
                    type="flat"
                    size="large"
                    @click="desactiveTipoFoto(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeTipoFoto(data[indextr])"
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
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import ModalCadastroTipoFotoVue from "./tipoFotos/ModalCadastroTipoFoto.vue";
import ModalEditarTipoFotoVue from "./tipoFotos/ModalEditarTipoFoto.vue";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroTipoFotoVue,
    ModalEditarTipoFotoVue,
    TableSSR,
  },
  data: () => ({
    tableKey: 0,
  }),
  methods: {
    async activeTipoFoto(item) {
      this.activeConfirm(
        item.nome,
        "tipos/produtos/" + item.id,
        async (val) => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    async desactiveTipoFoto(item) {
      this.deleteConfirm(
        item.nome,
        "tipos/produtos/" + item.id,
        async (val) => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
  },
  mounted() {
    this.route = "tiposFoto";
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
