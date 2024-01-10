<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Grupamento de Bairros"
        route="enderecos/bairro_grupamentos"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc&bairro=1&cidade=1&estado=1"
        customSearch="order=id&sort=desc&bairro=1&cidade=1&estado=1"
        customPageChange="order=id&sort=desc&bairro=1&cidade=1&estado=1"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroGrupamentoBairro
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="cidade"> Cidade </vs-th>
          <vs-th sort-key="sigla"> Bairros </vs-th>
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

            <vs-td :data="data[indextr].bairros">
              <div>
                <vs-chip
                  v-for="(item, idx) in data[indextr].bairros"
                  :key="idx"
                >
                  {{ item.nome }}
                </vs-chip>
              </div>
            </vs-td>

            <vs-td :data="data[indextr].id">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('update')"
                  vs-w="6"
                >
                  <vs-button
                    icon="mode_edit"
                    type="flat"
                    @click="toDetail(data[indextr].id)"
                    color="primary"
                  ></vs-button>
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
                    @click="desactiveEstado(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeEstado(data[indextr])"
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
import ModalCadastroGrupamentoBairro from "@/views/cadastro/grupamentoBairro/ModalCadastroGrupamentoBairro";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    ModalCadastroGrupamentoBairro,
    TableSSR
  },
  data: () => ({
    modalCadastroGrupamentoBairro: false,
    tableKey: 0
  }),
  methods: {
    async activeEstado(item) {
      this.activeConfirm(
        item.nome,
        "enderecos/bairro_grupamentos/" + item.id,
        async val => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    async desactiveEstado(item) {
      this.deleteConfirm(
        item.nome,
        "enderecos/bairro_grupamentos/" + item.id,
        async val => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    toDetail(id) {
      this.$router.push("/cadastro/bairro-grupamento/" + id);
    }
  },
  async mounted() {
    this.route = "bairrosGrupo";
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
