<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Cidades"
        route="enderecos/cidades"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc&estado=1"
        customSearch="order=id&sort=desc&estado=1"
        customPageChange="order=id&sort=desc&estado=1"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroCidade
            @update="() => tableKey++"
            v-if="hasAccess('create')"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="sigla"> Estado </vs-th>
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

            <vs-td :data="data[indextr].estado">
              {{
                data[indextr].estado && data[indextr].estado.nome
                  ? data[indextr].estado.nome
                  : "-"
              }}
            </vs-td>

            <vs-td :data="data[indextr].id" style="width: 150px;">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  v-if="hasAccess('update')"
                  vs-align="center"
                  vs-w="6"
                >
                  <vs-button
                    icon="mode_edit"
                    type="flat"
                    @click="editarCidade(data[indextr])"
                    color="primary"
                  ></vs-button>
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  v-if="hasAccess('delete')"
                  vs-align="center"
                  vs-w="6"
                >
                  <vs-button
                    v-if="data[indextr].status"
                    icon="toggle_on"
                    color="success"
                    type="flat"
                    size="large"
                    @click="desactiveCidade(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeCidade(data[indextr])"
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
    <ModalEditarCidade
      :modalEditarCidade="modalEditarCidade"
      :cidade="cidade"
      @update="() => tableKey++"
      @close="modalEditarCidade = false"
    />
  </div>
</template>

<script>
import ModalCadastroCidade from "@/views/cadastro/cidade/ModelCadastroCidade";
import ModalEditarCidade from "@/views/cadastro/cidade/ModalEditarCidade";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    ModalCadastroCidade,
    ModalEditarCidade,
    TableSSR
  },
  data: () => ({
    cidade: {},
    modalEditarCidade: false,
    tableKey: 0
  }),
  methods: {
    editarCidade(cidade) {
      this.cidade = cidade;
      this.modalEditarCidade = true;
    },
    async activeCidade(item) {
      this.activeConfirm(
        item.nome,
        "enderecos/cidades/" + item.id,
        async val => {
          if (val) this.tableKey++;
        }
      );
    },
    async desactiveCidade(item) {
      this.deleteConfirm(
        item.nome,
        "enderecos/cidades/" + item.id,
        async val => {
          if (val) this.tableKey++;
        }
      );
    }
  },
  mounted() {
    this.route = "cidade";
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
