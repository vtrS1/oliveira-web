<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Estados"
        route="enderecos/estados"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroEstado
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="sigla"> Sigla </vs-th>
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

            <vs-td :data="data[indextr].sigla">
              {{ data[indextr].sigla }}
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
                  <vs-button
                    icon="mode_edit"
                    type="flat"
                    @click="editarEstado(data[indextr])"
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
    <ModalEditarEstado
      :modalEditarEstado="modalEditarEstado"
      :estado="estado"
      @update="() => tableKey++"
      @close="modalEditarEstado = false"
    />
  </div>
</template>

<script>
import ModalCadastroEstado from "@/views/cadastro/estado/ModelCadastroEstado";
import ModalEditarEstado from "@/views/cadastro/estado/ModalEditarEstado";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useRule from "@/common/mixins/useRule.js";
import useData from "@/common/mixins/useData";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroEstado,
    ModalEditarEstado,
    TableSSR
  },
  data: () => ({
    modalCadastroEstado: false,
    modalEditarEstado: false,
    tableKey: 0,
    estado: {}
  }),
  methods: {
    editarEstado(estado) {
      this.estado = estado;
      this.modalEditarEstado = true;
    },
    async activeEstado(item) {
      this.activeConfirm(
        item.nome,
        "enderecos/estados/" + item.id,
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
        "enderecos/estados/" + item.id,
        async val => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    }
  },
  async mounted() {
    this.route = "estado";
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
