<template>
  <div>
    <vs-tooltip text="Ver, cadastrar e editar turmas" v-if="hasAccess('show')">
      <vs-button
        icon="view_module"
        type="flat"
        @click="openModalTurmas()"
        color="primary"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @close="close"
      :active.sync="modalState"
      title="Cadastar e editar turmas"
      cancel-text="Fechar"
      button-accept="false"
      class="p-0 m-0"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <div class="w-full md:w-4/12 pr-2">
            <SelectCurso @update="val => setValue('id_curso', val)" />
          </div>
          <div class="w-full md:w-3/12">
            <SelectTurma @update="val => setValue('id_turma', val)" />
          </div>
          <vs-input
            label-placeholder="Número"
            class="w-2/12 pl-2 mt-6"
            v-mask="'########'"
            v-model="form.numero"
          />
          <vs-input
            label-placeholder="Qtd. de alunos"
            class="w-2/12 pl-2 pr-2 mt-6"
            v-mask="'########'"
            v-model="form.qtd_aluno"
          />

          <vs-tooltip text="Adicionar turma" class="w-1/12  mt-5">
            <vs-button
              icon="add"
              v-if="hasAccess('create')"
              color="success"
              class="float-right w-full"
              @click="add()"
            ></vs-button>
          </vs-tooltip>
        </div>
      </form>
      <TableSSR
        title=""
        route="instituicao-turmas"
        customInit="curso=1&turma=1&order=id&sort=desc"
        customSearch="curso=1&turma=1&order=id&sort=desc"
        customPageChange="curso=1&turma=1&order=id&sort=desc"
        :key="tableKey"
      >
        <template slot="head">
          <vs-th>
            Curso
          </vs-th>
          <vs-th>
            Turma
          </vs-th>
          <vs-th>
            Número
          </vs-th>
          <vs-th>
            Qtd. Alunos
          </vs-th>
          <vs-th v-if="hasAccess('delete')"> Operações</vs-th>
        </template>
        <template slot="body" slot-scope="{ data }">
          <vs-tr
            :key="indextr"
            v-for="(tr, indextr) in data"
            :class="!data[indextr].status ? 'bg-warning' : ''"
          >
            <vs-td :data="data[indextr].curso.nome">
              {{ data[indextr].curso.nome }}
            </vs-td>

            <vs-td :data="data[indextr].turma.nome">
              {{ data[indextr].turma.nome }}
            </vs-td>

            <vs-td :data="data[indextr].numero">
              {{ data[indextr].numero }}
            </vs-td>

            <vs-td :data="data[indextr].qtd_aluno">
              {{ data[indextr].qtd_aluno }}
            </vs-td>

            <vs-td :data="data[indextr].id" v-if="hasAccess('delete')">
              <vs-button
                key="btnDesactiveTurma"
                v-if="data[indextr].status"
                icon="toggle_on"
                color="success"
                type="flat"
                size="large"
                @click="desactiveInstituicao(data[indextr])"
              ></vs-button>

              <vs-button
                key="btnActiveTurma"
                v-if="!data[indextr].status"
                icon="toggle_off"
                size="large"
                type="flat"
                @click="activeInstituicao(data[indextr])"
                color="danger"
              ></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </TableSSR>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import PromptActiveDesactive from "./../../../common/mixins/PromptActiveDesactive";
import useRule from "@/common/mixins/useRule.js";
import SelectCurso from "@/components/SelectCurso";
import SelectTurma from "@/components/SelectTurma";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useHTTP, useRule, PromptActiveDesactive],
  props: ["instituicao"],
  components: { SelectCurso, SelectTurma, TableSSR },
  data: () => ({
    form: {},
    turmas: [],
    modalState: false,
    tableKey: 1
  }),
  methods: {
    close() {
      this.modalState = false;
    },

    async add() {
      this.form.id_instituicao = this.instituicao.id;
      const res = await this.createData("instituicao-turmas", this.form);
      if (res != null) {
        this.form = {};
      }
      this.tableKey++;
      this.$forceUpdate();
    },
    remove(idx) {
      this.turmas.splice(idx, 1);
      this.$forceUpdate();
    },
    async activeInstituicao(item) {
      this.close();
      this.activeConfirm(
        `${item.curso.nome} - ${item.turma.nome}`,
        `instituicao-turmas/${item.id}`,
        async val => {
          if (val) {
            this.modalState = true;
          }
        }
      );
    },
    async desactiveInstituicao(item) {
      this.close();
      this.deleteConfirm(
        `${item.curso.nome} - ${item.turma.nome}`,
        `instituicao-turmas/${item.id}`,
        async val => {
          if (val) {
            this.modalState = true;
          }
        }
      );
    },
    async openModalTurmas() {
      this.modalState = true;
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  mounted() {
    this.route = "curso";
  }
};
</script>

<style></style>
