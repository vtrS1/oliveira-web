<template>
  <vs-card>
    <TableSSR
      title="Listas"
      route="listas"
      :search="true"
      :key="tableKey"
      customInit="order=id&sort=desc&vendedor=1&os=1"
      customSearch="order=id&sort=desc&vendedor=1&os=1"
      customPageChange="order=id&sort=desc&vendedor=1&os=1"
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <ModalAdicionarLista v-if="hasAccess('create')" @update="() => tableKey++" />
      </template>
      <template slot="head">
        <vs-th sort-key="id"> Lista </vs-th>
        <vs-th sort-key="nome"> Vendedor </vs-th>
        <vs-th> Qtd. Fichas </vs-th>
        <vs-th sort-key="data_inicio">Ínicio</vs-th>
        <vs-th sort-key="data_conclusao">Validade</vs-th>
        <vs-th sort-key="data_entrega">Entrega</vs-th>
        <vs-th sort-key="situacao"> Situação </vs-th>
        <vs-th> Opções </vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>
          <vs-td :data="data[indextr].vendedor">
            {{
              data[indextr].vendedor != null
                ? data[indextr].vendedor.id + " - " + data[indextr].vendedor.nome
                : ""
            }}
          </vs-td>

          <vs-td :data="data[indextr].qtd_alunos">
            {{ data[indextr].os && data[indextr].os.length }}
          </vs-td>

          <vs-td :data="data[indextr].data_inicio">
            {{ formatDateBrasil(data[indextr].data_inicio) }}
          </vs-td>

          <vs-td :data="data[indextr].data_conclusao">
            {{ formatDateBrasil(data[indextr].data_conclusao) }}
          </vs-td>

          <vs-td :data="data[indextr].data_entrega">
            {{
              data[indextr].data_entrega != null
                ? formatDateBrasil(data[indextr].data_entrega)
                : ""
            }}
          </vs-td>

          <vs-td :data="data[indextr].situacao">
            {{ data[indextr].situacao }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <vs-button
                  icon="group"
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
                  @click="desactiveLista(data[indextr])"
                ></vs-button>

                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeLista(data[indextr])"
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
</template>

<script>
import ModalAdicionarLista from "@/views/zoneamento/ModalCadastroLista";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    ModalAdicionarLista,
    TableSSR,
  },
  data: () => ({
    form: {},
    modalCadastrarLista: false,
    modalEditarAluno: false,
    tableKey: 0,
  }),
  methods: {
    async activeLista(item) {
      this.activeConfirm(
        "Lista " + item.id + " (Será exibido no aplivativo)",
        "listas/" + item.id,
        async (val) => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    async desactiveLista(item) {
      this.deleteConfirm(
        "Lista " + item.id + " (Não será exibida no aplivativo)",
        "listas/" + item.id,
        async (val) => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    toDetail(id) {
      this.$router.push("/zoneamento/" + id);
    },
  },
  async mounted() {
    this.route = "lista";
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
