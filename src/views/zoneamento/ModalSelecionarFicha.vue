<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalState = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="addToList"
      @close="close"
      :active.sync="modalState"
      title="Selecione a ficha do aluno"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <vs-table
        search
        :max-items="3"
        pagination
        :data="fichas"
        notSpacer
        description
        description-title="Registros"
        description-connector="por"
        description-body="Páginas"
      >
        <template slot="thead">
          <vs-th sort-key="id"> Nº da Ficha </vs-th>
          <vs-th sort-key="contrato"> Contrato </vs-th>
          <vs-th sort-key="instituicos_nome"> Instituição </vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :key="indextr"
            v-for="(tr, indextr) in data"
            @click.native="setFicha(data[indextr])"
            :class="ficha == data[indextr].id ? 'bg-success' : ''"
          >
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].contrato">
              {{ data[indextr].contrato }}
            </vs-td>

            <vs-td :data="data[indextr].id">
              <!-- {{ aluno.instituicoes_nome }} -->
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
import useData from "@/common/mixins/useData";
export default {
  mixins: [useHTTP, useData, Validators],
  props: ["fichas", "aluno", "lista", "modalState"],
  data: () => ({
    ficha: null
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    async addToList() {
      const res = await this.createData("lista-alunos", {
        id_lista: this.lista,
        id_aluno: this.aluno.id,
        id_ficha: this.ficha
      });
      if (res != null) {
        this.close();
        this.ficha = null;
        this.$emit("update");
      }
    },
    setFicha(ficha) {
      this.ficha = ficha.id;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
