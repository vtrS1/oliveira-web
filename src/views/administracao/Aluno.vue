<template lang="html">
  <vs-card>
    <TableSSR
      title="Alunos"
      route="alunos"
      :search="true"
      :key="tableKey"
      customInit="order=id&sort=desc&endereco=1"
      customSearch="order=id&sort=desc&endereco=1"
      customPageChange="order=id&sort=desc&endereco=1"
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <ModalAdicionarAluno
          v-if="hasAccess('create')"
          @update="() => tableKey++"
        />
        <ModalAdicionarSomenteAluno
          v-if="hasAccess('create')"
          @update="() => tableKey++"
        />
      </template>
      <template slot="head">
        <vs-th sort-key="id">ID</vs-th>
        <vs-th sort-key="nome"> Nome </vs-th>
        <vs-th sort-key="cpf"> CPF </vs-th>
        <vs-th> Endereço </vs-th>
        <vs-th> Ações </vs-th>
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

          <vs-td>
            {{ getInstituicaoSimpleAddress(data[indextr]) }}
          </vs-td>

          <vs-td :data="data[indextr].id" style="width: 150px">
            <vs-row vs-justify="flex-end">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('show')"
                vs-w="4"
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
                v-if="hasAccess('delete')"
                vs-w="4"
              >
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveAluno(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeAluno(data[indextr])"
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
import ModalAdicionarAluno from "@/views/administracao/aluno/ModalAdicionarAluno";
import ModalAdicionarSomenteAluno from "@/views/administracao/aluno/ModalAdicionarSomenteAluno.vue";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useRule from "@/common/mixins/useRule.js";
import useData from "@/common/mixins/useData";
import TableSSR from "@/components/TableSSR";
import useUtils from "@/common/mixins/useUtils";
export default {
  mixins: [useHTTP, useUtils, useData, useRule, PromptActiveDesactive],
  components: {
    ModalAdicionarAluno,
    ModalAdicionarSomenteAluno,
    TableSSR
  },
  data: () => ({
    form: {},
    id_instituicao: 0,
    tableKey: 1
  }),
  methods: {
    updateStateModalCadastroAluno(state) {
      this.modalCadastroAluno = state;
    },
    setDefaultInstituicao(idx) {
      localStorage.setItem("instituicao", idx);
    },
    async activeAluno(item) {
      this.activeConfirm(item.nome, "alunos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveAluno(item) {
      this.deleteConfirm(item.nome, "alunos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/administracao/alunos/" + id);
    }
  },
  async mounted() {
    this.route = "aluno";
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
