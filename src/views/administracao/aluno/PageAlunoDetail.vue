<template lang="html">
  <vs-card>
    <div v-if="loading == true">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <div class="w-full flex flex-wrap justify-between">
        <div class="pt-3 flex pl-2 flex-wrap">
          <vs-button
            class="float-left mt-3"
            color="success"
            icon="arrow_back_ios"
            @click="() => $router.back()"
            type="flat"
          ></vs-button>
          <vs-breadcrumb align="left">
            <div class="vs-list--title text-xl mb-2 mt-2">
              {{ alunoDetail.nome }}
            </div>
          </vs-breadcrumb>
        </div>
        <div class="pt-3 pr-5">
          <vs-button
            class="float-right"
            @click="update"
            v-if="hasAccess('update')"
            color="success"
            icon="done"
            >Atualizar</vs-button
          >
        </div>
      </div>
      <form class="pl-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-6/12 pr-2 mt-6"
            v-model="alunoDetail.nome"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-2/12 pr-2 pt-1 mt-0"
            v-model="alunoDetail.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-2/12 pr-2 mt-6"
            v-mask="'###.###.###-##'"
            v-model="alunoDetail.cpf"
          />
          <vs-input
            label-placeholder="CEP"
            class="w-2/12 mt-6"
            v-model="alunoDetail.cep"
            v-mask="'#####-###'"
            @change="consultar"
          />
        </div>
      </form>

      <div class="flex vx-row w-full pl-8">
        <div class="w-4/12 pr-2 mt-2 my-2">
          <SelectEstado
            @update="val => setValue('id_estado', val)"
            :initialId="alunoDetail.id_estado"
          />
        </div>
        <div class="w-4/12 pr-2 mt-2 my-2">
          <SelectCidade
            @update="val => setValue('id_cidade', val)"
            :estado="alunoDetail.id_estado"
            :initialId="alunoDetail.id_cidade"
          />
        </div>
        <div class="w-4/12 mt-2 my-2">
          <SelectBairro
            @update="val => setValue('id_bairro', val)"
            :cidade="alunoDetail.id_cidade"
            :initialId="alunoDetail.id_bairro"
          />
        </div>

        <vs-input
          label-placeholder="Logradouro"
          class="w-4/12"
          v-model="alunoDetail.logradouro"
        />

        <vs-input
          label-placeholder="Número"
          class="w-1/12 pr-2 pl-2"
          v-model="alunoDetail.numero"
        />
        <vs-input
          label-placeholder="Complemento"
          class="w-7/12"
          v-model="alunoDetail.complemento"
        />
      </div>
      <div class="pr-4">
        <div class="vs-list--title text-lg ml-5 mb-2 mt-5">Responsáveis</div>
        <div class="w-full flex flex-wrap">
          <vs-input
            label-placeholder="Nome do pai"
            class="w-6/12 pl-4 pr-2 mt-8"
            v-model="alunoDetail.nome_pai"
          />
          <vs-input
            label-placeholder="Nome da mãe"
            class="w-6/12 pl-4 pr-2 mt-8"
            v-model="alunoDetail.nome_mae"
          />
        </div>
      </div>

      <CadastrarContatoAluno
        :contatosData="alunoDetail.contatos"
        :id_aluno="alunoDetail.id"
        @update="fetchAluno"
      ></CadastrarContatoAluno>

      <div class="w-full pl-5">
        <div
          class="vs-list--title text-xl mb-2 mt-2 flex flex-row justify-between pr-4"
        >
          Fichas associadas
          <vs-tooltip title="Ver fichas do aluno">
            <vs-button
              icon="chevron_right"
              type="filled"
              @click="toFichasDetail(alunoDetail.id)"
              color="primary"
              >Ver todas</vs-button
            >
            <span></span>
          </vs-tooltip>
        </div>
        <div class="rounded-lg" :key="idx" v-for="(ctt, idx) in fichas">
          <vs-list class="px-3">
            <vs-list-item
              :title="`Ficha #${ctt.id} - Número ${ctt.numero}`"
              :subtitle="`Contrato ${ctt.id_contrato}`"
            >
              <vs-tooltip title="Ver ficha">
                <vs-button
                  icon="chevron_right"
                  type="flat"
                  @click="toFichaDetail(ctt.id)"
                  color="primary"
                ></vs-button>
                <span></span>
              </vs-tooltip>
            </vs-list-item>
          </vs-list>
        </div>
      </div>
    </div>
  </vs-card>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import CadastrarContatoAluno from "@/views/administracao/aluno/CadastrarContatoAluno";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import SelectBairro from "@/components/SelectBairro";
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    CadastrarContatoAluno,
    SelectBairro,
    SelectCidade,
    SelectEstado
  },
  props: ["aluno"],
  data: () => ({
    contatos: [],
    modalEditarAluno: false,
    cttPessoasListKey: 0,
    formAssociado: {},
    alunoDetail: {},
    loading: true,
    fichas: []
  }),
  methods: {
    async update() {
      await this.updateData(
        `alunos/${this.$route.params.id}`,
        this.alunoDetail
      );
    },
    async consultar() {
      this.$vs.loading();
      this.loading = true;
      const data = await this.consultarCep(this.alunoDetail.cep);
      if (data != null) Object.assign(this.alunoDetail, data);
      this.$forceUpdate();
      this.$vs.loading.close();
      this.loading = false;
    },
    toDetail(id) {
      this.$router.push("/administracao/associados/" + id);
    },
    toFichasDetail(id) {
      this.$router.push("/administracao/fichas?idAluno=" + id);
    },
    toFichaDetail(id) {
      this.$router.push("/administracao/fichas?id=" + id);
    },
    async fetchAluno() {
      this.loading = true;
      this.alunoDetail = await this.fetchAlunoById(
        true,
        this.$route.params.id,
        "contatos=1"
      );
      this.$forceUpdate();
      this.loading = false;
    },
    setValue(key, value) {
      this.alunoDetail[key] = value;
      this.$forceUpdate();
    },
    async _fetchFichas() {
      this.loading = true;
      this.fichas = await this.fetchFichaByIdAluno(
        true,
        this.$route.params.id,
        ""
      );
      this.loading = false;
    }
  },
  async mounted() {
    this.route = "aluno";
    await this.fetchAluno();
    await this._fetchFichas();
  }
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
