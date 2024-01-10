<template>
  <div>
    <vs-prompt
      @cancel="close"
      @close="close"
      :active.sync="state"
      title="Adicionar a Lista"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      style="z-index: 9000;
      "
    >
      <vs-table search :max-items="20" pagination :data="alunos" notSpacer>
        <template slot="header">
          <h3 class="ml-3">
            Alunos
          </h3>
        </template>
        <template slot="thead">
          <vs-th sort-key="id"> # </vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="nome"> Instituicao </vs-th>
          <vs-th sort-key="nome"> Contrato </vs-th>
          <vs-th> Opções </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :key="indextr"
            v-for="(tr, indextr) in data"
            :class="!data[indextr].status ? 'bg-warning' : ''"
          >
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].id">
              <vs-button
                icon="add"
                type="flat"
                @click="addAluno(data[indextr])"
                color="primary"
              ></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  props: ["state"],
  data: () => ({
    form: {},
    contatos: [],
    errors: [],
    alunos: []
  }),
  methods: {
    async fetchAlunos() {
      const res = await this.fetchData("pessoas/tipo/ALUNO");
      if (res != null) {
        this.alunos = res;
      }
    },
    close() {
      this.$emit("close");
    },
    addAluno(al) {
      this.$emit("close", al);
    }
  },
  mounted() {
    this.fetchAlunos();
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
