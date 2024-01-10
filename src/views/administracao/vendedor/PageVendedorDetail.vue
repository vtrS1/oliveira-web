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
              {{ vendedorDetail.nome }}
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
            v-model="vendedorDetail.nome"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-2/12 pr-2 pt-1 mt-0"
            v-model="vendedorDetail.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-2/12 pr-2 mt-6"
            v-mask="'###.###.###-##'"
            v-model="vendedorDetail.cpf"
          />
          <vs-input
            label-placeholder="RG"
            class="w-2/12 mt-6"
            v-mask="'###############'"
            v-model="vendedorDetail.rg"
          />
        </div>
      </form>

      <div class="flex vx-row w-full pl-8">
        <vs-input
          label-placeholder="CEP"
          class="w-2/12 mt-8 pr-2"
          v-model="vendedorDetail.cep"
          v-mask="'#####-###'"
          @change="consultar"
        />
        <div class="w-3/12 pr-2 mt-2 my-2">
          <SelectEstado
            @update="(val) => setValue('id_estado', val)"
            :initialId="vendedorDetail.id_estado"
          />
        </div>
        <div class="w-3/12 pr-2 mt-2 my-2">
          <SelectCidade
            @update="(val) => setValue('id_cidade', val)"
            :estado="vendedorDetail.id_estado"
            :initialId="vendedorDetail.id_cidade"
          />
        </div>
        <div class="w-4/12 mt-2 my-2">
          <SelectBairro
            @update="(val) => setValue('id_bairro', val)"
            :cidade="vendedorDetail.id_cidade"
            :initialId="vendedorDetail.id_bairro"
          />
        </div>

        <vs-input
          label-placeholder="Logradouro"
          class="w-4/12"
          v-model="vendedorDetail.logradouro"
        />

        <vs-input
          label-placeholder="Número"
          class="w-1/12 pr-2 pl-2"
          v-model="vendedorDetail.numero"
        />
        <vs-input
          label-placeholder="Complemento"
          class="w-7/12"
          v-model="vendedorDetail.complemento"
        />
      </div>

      <CadastrarContatoVendedor
        :contatos="vendedorDetail.contatos"
        :id_vendedor="vendedorDetail.id"
        @update="fetchVendedor"
      ></CadastrarContatoVendedor>
    </div>
  </vs-card>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import CadastrarContatoVendedor from "@/views/administracao/vendedor/CadastrarContatoVendedor";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import SelectBairro from "@/components/SelectBairro";
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    CadastrarContatoVendedor,
    SelectBairro,
    SelectCidade,
    SelectEstado,
  },
  props: ["vendedor"],
  data: () => ({
    contatos: [],
    modalEditarAluno: false,
    cttPessoasListKey: 0,
    formAssociado: {},
    vendedorDetail: {},
    loading: true,
  }),
  methods: {
    async update() {
      await this.updateData(`vendedores/${this.$route.params.id}`, this.vendedorDetail);
    },
    async consultar() {
      const data = await this.consultarCep(this.vendedorDetail.cep);
      if (data != null) Object.assign(this.vendedorDetail, data);
      this.$forceUpdate();
    },
    async fetchVendedor() {
      this.loading = true;
      this.vendedorDetail = await this.fetchVendedorById(
        true,
        this.$route.params.id,
        "contatos=1"
      );
      this.loading = false;
    },
  },
  async mounted() {
    this.route = "vendedor";
    await this.fetchVendedor();
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
