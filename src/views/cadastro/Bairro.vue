<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Bairros"
        route="enderecos/bairros"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc&cidade=1"
        customSearch="order=id&sort=desc&cidade=1"
        customPageChange="order=id&sort=desc&cidade=1"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroBairro
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="sigla"> Cidade </vs-th>
          <vs-th>Operações</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].cidade">
              {{
                data[indextr].cidade && data[indextr].cidade.nome
                  ? data[indextr].cidade.nome
                  : ""
              }}
            </vs-td>

            <vs-td :data="data[indextr].id" style="width: 150px;">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('update')"
                  vs-w="6"
                >
                  <ModalEditarBairro
                    :bairro="data[indextr]"
                    @update="() => tableKey++"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('delete')"
                  vs-w="6"
                >
                  <vs-button
                    v-if="data[indextr].status"
                    icon="toggle_on"
                    color="success"
                    type="flat"
                    size="large"
                    @click="desactiveBairro(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeBairro(data[indextr])"
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
import ModalCadastroBairro from "@/views/cadastro/bairro/ModelCadastroBairro";
import ModalEditarBairro from "@/views/cadastro/bairro/ModalEditarBairro";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroBairro,
    ModalEditarBairro,
    TableSSR
  },
  data: () => ({
    tableKey: 0
  }),
  methods: {
    async activeBairro(item) {
      this.activeConfirm(
        item.nome,
        "enderecos/bairros/" + item.id,
        async val => {
          if (val) this.tableKey++;
        }
      );
    },
    async desactiveBairro(item) {
      this.deleteConfirm(
        item.nome,
        "enderecos/bairros/" + item.id,
        async val => {
          if (val) this.tableKey++;
        }
      );
    }
  },
  async mounted() {
    this.route = "bairro";
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
