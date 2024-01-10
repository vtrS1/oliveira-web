<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Vendedores"
        route="vendedores"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc&endereco=1&contatos=1"
        customSearch="order=id&sort=desc&endereco=1&contatos=1"
        customPageChange="order=id&sort=desc&endereco=1&contatos=1"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroVendedor
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>

        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="cpf"> CPF </vs-th>
          <vs-th sort-key="data_nascimento"> Data de Nascimento </vs-th>
          <vs-th> Contatos </vs-th>
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

            <vs-td :data="data[indextr].cpf">
              {{ data[indextr].cpf }}
            </vs-td>

            <vs-td :data="data[indextr].data_nascimento">
              {{ formatDateBrasil(data[indextr].data_nascimento) }}
            </vs-td>

            <vs-td :data="data[indextr].contatos">
              <div>
                <vs-chip
                  v-for="(item, idx) in data[indextr].contatos"
                  :key="idx"
                >
                  {{ item.contato }}
                </vs-chip>
              </div>
            </vs-td>

            <vs-td :data="data[indextr].id">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('show')"
                  vs-w="6"
                >
                  <vs-button
                    icon="visibility"
                    type="flat"
                    @click="toDetail(data[indextr].id)"
                    color="primary"
                  ></vs-button>
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
                    @click="desactiveVendedor(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeVendedor(data[indextr])"
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
import ModalCadastroVendedor from "@/views/administracao/vendedor/ModalCadastroVendedor";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    ModalCadastroVendedor,
    TableSSR
  },
  data: () => ({
    modalCadastroVendedor: false,
    tableKey: 0
  }),
  methods: {
    async activeVendedor(item) {
      this.activeConfirm(item.nome, "vendedores/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveVendedor(item) {
      this.deleteConfirm(item.nome, "vendedores/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/administracao/vendedores/" + id);
    }
  },
  mounted() {
    this.route = "vendedor";
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
