<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Tipos de contatos"
        route="tipos/contatos"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroTipoContato
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="mascara"> Mascara </vs-th>
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

            <vs-td :data="data[indextr].mascara">
              {{ data[indextr].mascara }}
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
                  <vs-button
                    icon="mode_edit"
                    type="flat"
                    @click="editarTipoContato(data[indextr])"
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
                    @click="desactiveTipoContato(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeTipoContato(data[indextr])"
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
    <ModalEditarTipoContato
      :modalEditarTipoContato="modalEditarTipoContato"
      :tipoContato="tipoContato"
      @update="() => tableKey++"
      @close="modalEditarTipoContato = false"
    />
  </div>
</template>

<script>
import ModalCadastroTipoContato from "@/views/cadastro/tipoContato/ModelCadastroTipoContato";
import ModalEditarTipoContato from "@/views/cadastro/tipoContato/ModalEditarTipoContato";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useRule from "@/common/mixins/useRule.js";
import useData from "@/common/mixins/useData";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroTipoContato,
    ModalEditarTipoContato,
    TableSSR
  },
  data: () => ({
    tipoContato: {},
    tableKey: 0,
    modalCadastroTipoContato: false,
    modalEditarTipoContato: false,
    descriptionItems: [3, 5, 15, 30, 50, 100]
  }),
  methods: {
    editarTipoContato(tipoContato) {
      this.tipoContato = tipoContato;
      this.modalEditarTipoContato = true;
    },
    async activeTipoContato(item) {
      this.activeConfirm(item.nome, "tipos/contatos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveTipoContato(item) {
      this.deleteConfirm(item.nome, "tipos/contatos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    }
  },
  async mounted() {
    this.route = "tiposContato";
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
