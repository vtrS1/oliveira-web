<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Usuários"
        route="usuarios"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc&endereco=1&contatos=1&vendedor=1"
        customSearch="order=id&sort=desc&endereco=1&contatos=1&vendedor=1"
        customPageChange="order=id&sort=desc&endereco=1&contatos=1&vendedor=1"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroUsuario
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>

        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="email"> Email/usuário </vs-th>
          <vs-th sort-key="id_vendedor"> Vendedor </vs-th>
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

            <vs-td :data="data[indextr].email">
              {{ data[indextr].email }}
            </vs-td>

            <vs-td :data="data[indextr].id_vendedor">
              {{
                data[indextr].vendedor && data[indextr].vendedor.nome
                  ? data[indextr].vendedor.id +
                    " - " +
                    data[indextr].vendedor.nome
                  : ""
              }}
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
                  <ModalEditarUsuario
                    :usuario="data[indextr]"
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
                    @click="desactiveUsuario(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeUsuario(data[indextr])"
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
import ModalCadastroUsuario from "@/views/administracao/usuario/ModalCadastroUsuario";
import ModalEditarUsuario from "@/views/administracao/usuario/ModalEditarUsuario";
import PromptActiveDesactive from "../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroUsuario,
    ModalEditarUsuario,
    TableSSR
  },
  data: () => ({
    modalCadastroUsuario: false,
    tableKey: 0
  }),
  methods: {
    async activeUsuario(item) {
      this.activeConfirm(item.nome, "usuarios/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveUsuario(item) {
      this.deleteConfirm(item.nome, "usuarios/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    }
  },
  async mounted() {
    this.route = "usuario";
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
