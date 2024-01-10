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
              {{ instituicao.nome }}
            </div>
          </vs-breadcrumb>
        </div>
        <div class="pt-3 pr-5">
          <vs-button class="float-right" @click="update" color="success" icon="done"
            >Atualizar</vs-button
          >
        </div>
      </div>
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome da instituição"
            class="w-4/12 pr-2"
            v-model="instituicao.nome"
          />
          <vs-input
            label-placeholder="Nome do responsável"
            class="w-4/12 pr-2"
            v-model="instituicao.nome_responsavel"
          />

          <vs-input
            label-placeholder="CNPJ"
            class="w-4/12 pl-2"
            v-mask="'##.###.###/####-##'"
            v-model="instituicao.cnpj"
          />
          <vs-input
            label-placeholder="Observações internas"
            class="w-full"
            v-model="instituicao.obs"
          />
        </div>
      </form>
      <form class="ml-8 mt-2 mb-5">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="CEP"
            class="w-2/12 mt-6 pr-2"
            v-model="instituicao.cep"
            v-mask="'#####-###'"
            @change="consultar"
          />
          <div class="w-5/12 pr-2 mt-1 my-2">
            <SelectEstado
              @update="(val) => setValue('id_estado', val)"
              :initialId="instituicao.id_estado"
            />
          </div>

          <div class="w-5/12 mt-1 my-2">
            <SelectCidade
              @update="(val) => setValue('id_cidade', val)"
              :estado="instituicao.id_estado"
              :initialId="instituicao.id_cidade"
            />
          </div>

          <div class="w-4/12 mt-0 my-2">
            <SelectBairro
              @update="(val) => setValue('id_bairro', val)"
              :cidade="instituicao.id_cidade"
              :initialId="instituicao.id_bairro"
            />
          </div>

          <vs-input
            label-placeholder="Logradouro"
            class="w-8/12 pl-2"
            @change="$forceUpdate()"
            v-model="instituicao.logradouro"
          />

          <vs-input
            label-placeholder="Complemento"
            @change="$forceUpdate()"
            class="w-11/12 mt-6 pr-2"
            v-model="instituicao.complemento"
          />

          <vs-input
            label-placeholder="Número"
            class="w-1/12 mt-6"
            v-model="instituicao.numero"
          />
        </div>
      </form>

      <ModalCadastroContatoInstituicao
        :key="contatosKey"
        :instituicao="instituicao"
        :contatosData="instituicao.contatos"
        @remove="removeContato"
      />
    </div>
  </vs-card>
</template>
<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
import ModalCadastroContatoInstituicao from "@/views/administracao/instituicao/ModalCadastroContatoInstituicao";
export default {
  mixins: [useHTTP, useData],
  components: {
    ModalCadastroContatoInstituicao,
    SelectEstado,
    SelectCidade,
    SelectBairro,
  },
  data: () => ({
    instituicao: {},
    contatosKey: 0,
    loading: true,
  }),
  methods: {
    async fetchInstituicao() {
      this.loading = true;
      this.$vs.loading();
      this.instituicao = await this.fetchInstituicaoById(
        true,
        this.$route.params.id,
        "contatos=1"
      );
      this.$vs.loading.close();
      this.loading = false;
    },
    removeContato(idx) {
      this.contatos.splice(idx, 1);
      this.contatosKey++;
    },
    addContato(contato) {
      this.contatos.push(contato);
      this.contatosKey++;
    },
    async update() {
      await this.updateData("instituicoes/" + this.$route.params.id, this.instituicao);
    },
    async consultar() {
      const data = await this.consultarCep(this.instituicao.cep);
      if (data != null) Object.assign(this.instituicao, data);
      this.$forceUpdate();
    },
    setValue(key, value) {
      this.instituicao[key] = value;
      this.$forceUpdate();
    },
  },
  async mounted() {
    await this.fetchInstituicao();
    // this.$forceUpdate();
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
