<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Turmas"
        route="tipos/turmas"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroTurmaVue
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th>Operações</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id" style="width: 70px;">
              {{ data[indextr].id }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
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
                  <ModalEditarTurmaVue
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
                    @click="desactiveTipoCurso(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeTipoCurso(data[indextr])"
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
import ModalCadastroTurmaVue from "./turmas/ModalCadastroTurma.vue";
import ModalEditarTurmaVue from "./turmas/ModalEditarTurma.vue";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastroTurmaVue,
    ModalEditarTurmaVue,
    TableSSR
  },
  data: () => ({
    tableKey: 0
  }),
  methods: {
    async activeTipoCurso(item) {
      this.activeConfirm(item.nome, "tipos/turmas/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveTipoCurso(item) {
      this.deleteConfirm(item.nome, "tipos/turmas/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    }
  },
  mounted() {
    this.route = "tiposTurmas";
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
