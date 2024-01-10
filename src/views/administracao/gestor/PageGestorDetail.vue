<template lang="html">
  <div>
    <vs-card>
      <div class="w-full flex flex-wrap justify-between">
        <div class="pt-3 flex pl-2 flex-wrap">
          <vs-button
            class="float-left mt-3"
            color="success"
            icon="arrow_back_ios"
            @click="() => $router.push('/administracao/gestor')"
            type="flat"
          ></vs-button>
          <vs-breadcrumb align="left">
            <div class="vs-list--title text-xl mb-2 mt-2">
              {{ DATA_GESTOR.nome }}
            </div>
          </vs-breadcrumb>
        </div>
        <div class="pt-3 pr-5">
          <vs-button
            v-if="hasAccess('update')"
            class="float-right"
            @click="update"
            color="success"
            icon="done"
            >Atualizar</vs-button
          >
        </div>
      </div>
      <form class="ml-8 mb-5">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome *"
            class="w-full"
            v-model="DATA_GESTOR.nome"
          />

          <vs-input
            label-placeholder="Comissão"
            class="w-full mt-8"
            v-model="DATA_GESTOR.comissao"
          />
          <vs-input
            label-placeholder="Observação"
            class="w-full mt-8"
            v-model="DATA_GESTOR.obs"
          />

          <vs-input
            label-placeholder="Data de Nascimento"
            class="w-full md:w-1/2 md:pr-2 mt-8"
            type="date"
            v-model="DATA_GESTOR.data_nascimento"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-full md:w-1/2 md:pl-2 mt-8"
            v-model="DATA_GESTOR.cpf"
          />
        </div>
      </form>
      <ModalCadastrarContato
        :contatosData="DATA_CONTATOS"
        :pessoa="DATA_GESTOR"
      />
    </vs-card>
  </div>
</template>

<script>
import ModalCadastrarContato from "@/views/modals/ModalCadastrarContato";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
export default {
  mixins: [useHTTP, useData, useRule],
  components: {
    ModalCadastrarContato
  },
  data: () => ({
    contatos: []
  }),
  methods: {
    async update() {
      let dataUpdate = this.DATA_GESTOR;
      delete dataUpdate.contatos;
      delete dataUpdate.instituicoes;
      if (
        dataUpdate.data_nascimento == null ||
        dataUpdate.data_nascimento == "Data inválida"
      ) {
        dataUpdate.data_nascimento = this.getCurrentDate();
      }
      if (dataUpdate.data_nascimento.length > 10) {
        dataUpdate.data_nascimento = dataUpdate.data_nascimento.substr(0, 10);
      }
      await this.updateData("pessoas/" + this.DATA_GESTOR.id, dataUpdate);
    }
  },
  async mounted() {
    this.route = "gestor";
    await this.fetchGestorById(this.$route.params.id);
    await this.fetchContatosByIdPessoa(this.$route.params.id);
  }
};
</script>
