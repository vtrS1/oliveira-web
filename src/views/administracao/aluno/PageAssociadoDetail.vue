<template lang="html">
  <vs-card>
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
            {{ DATA_ALUNO.nome }}
          </div>
        </vs-breadcrumb>
      </div>
      <div class="pt-3 pr-5">
        <vs-button
          class="float-right"
          @click="update"
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
          v-model="DATA_ALUNO.nome"
        />

        <vs-input
          label="Data de Nascimento"
          class="w-2/12 pr-2 pt-1 mt-0"
          v-model="DATA_ALUNO.data_nascimento"
          type="date"
        />
        <vs-input
          label-placeholder="CPF"
          class="w-2/12 pr-2 mt-6"
          v-mask="'###.###.###-##'"
          v-model="DATA_ALUNO.cpf"
        />
        <vs-input
          label-placeholder="CEP"
          class="w-2/12 mt-6"
          v-model="DATA_ALUNO.cep"
          v-mask="'#####-###'"
          @change="consultar"
        />
      </div>
    </form>

    <div class="flex vx-row w-full pl-8">
      <div class="w-4/12 pr-2 mt-2 my-2">
        <label class="text-sm">Estado</label>
        <v-select
          class="w-full"
          @option:selected="fetchCidadesByIdEstado"
          v-model="DATA_ALUNO.id_estado"
          label="nome"
          :reduce="estado => estado.id"
          :options="DATA_ESTADOS"
        ></v-select>
      </div>
      <div class="w-4/12 pr-2 mt-2 my-2">
        <label class="text-sm">Cidade</label>
        <v-select
          class="w-full"
          @option:selected="fetchBairrosByIdCidade"
          v-model="DATA_ALUNO.id_cidade"
          label="nome"
          :reduce="cidade => cidade.id"
          :options="
            DATA_ESTADO_CIDADES.length == 0 ? DATA_CIDADES : DATA_ESTADO_CIDADES
          "
        ></v-select>
      </div>
      <div class="w-4/12  mt-2 my-2 ">
        <label class="text-sm">Bairro</label>
        <v-select
          class="w-full"
          v-model="DATA_ALUNO.id_bairro"
          label="nome"
          :reduce="bairro => bairro.id"
          :options="
            DATA_CIDADE_BAIRROS.length == 0 ? DATA_BAIRROS : DATA_CIDADE_BAIRROS
          "
        ></v-select>
      </div>

      <vs-input
        label-placeholder="Logradouro"
        class="w-4/12"
        v-model="DATA_ALUNO.logradouro"
      />

      <vs-input
        label-placeholder="Número"
        class="w-1/12 pr-2 pl-2"
        v-model="DATA_ALUNO.numero"
      />
      <vs-input
        label-placeholder="Complemento"
        class="w-7/12"
        v-model="DATA_ALUNO.complemento"
      />
    </div>

    <CadastrarContatoAluno :pessoas="[DATA_ALUNO]"></CadastrarContatoAluno>
  </vs-card>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import CadastrarContatoAluno from "@/views/administracao/aluno/CadastrarContatoAluno";
import useData from "@/common/mixins/useData";
export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {
    CadastrarContatoAluno
  },
  props: ["aluno"],
  data: () => ({
    contatos: [],
    modalEditarAluno: false,
    cttPessoasListKey: 0,
    formAssociado: {}
  }),
  methods: {
    async update() {
      await this.updateData(
        "pessoas/" + this.$route.params.id,
        this.DATA_ALUNO
      );
    },
    async consultar() {
      const data = await this.consultarCep(this.DATA_ALUNO.cep);
      if (data != null) Object.assign(this.DATA_ALUNO, data);
      this.$forceUpdate();
    }
  },
  async mounted() {
    await this.fetchAlunoById(this.$route.params.id);
    await this.fetchInstituicoes(true);
    await this.fetchEstados(true);
    await this.fetchCidades(true);
    await this.fetchBairros(true);
  }
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
