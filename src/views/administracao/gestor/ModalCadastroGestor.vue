<template>
  <div>
    <vs-tooltip text="Cadastrar novo gestor">
      <vs-button
        class="mr-2 float-right"
        color="success"
        type="filled"
        @click="modalCadastroGestor = true"
        icon="add"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      :active.sync="modalCadastroGestor"
      title="Cadastar Gestor Escolar"
      :buttons-hidden="true"
    >
      <form class="ml-8 mb-5" @submit.prevent="cadastrar">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome *"
            class="w-full"
            v-model="form.nome"
            :danger="errors.nome"
            danger-text="Digite um nome"
          />
          <vs-input
            label-placeholder="Comissão"
            class="w-full mt-8"
            v-model="form.comissao"
          />
          <vs-input
            label-placeholder="Observação"
            class="w-full mt-8"
            v-model="form.obs"
          />
          <vs-input
            label="Data de Nascimento"
            class="w-full md:w-1/2 sm:pr-2 mt-3"
            v-model="form.data_nascimento"
            type="date"
            :danger="errors.data_nascimento"
            danger-text="Digite a data de nascimento"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-full md:w-1/2 sm:pl-2 mt-8 pt-1"
            v-mask="'###.###.###-##'"
            v-model="form.cpf"
            @change="validateCpf"
            :danger="errors.cpf"
            danger-text="Digite um CPF válido"
          />
        </div>
      </form>

      <ModalCadastrarContato @add="addContato" @remove="removeContato" />

      <div class="vx-row flex flex-wrap justify-end pr-4">
        <vs-button
          color="danger"
          type="filled"
          icon="close"
          @click="modalCadastroGestor = false"
          >Cancelar</vs-button
        >
        <vs-button
          class="ml-5"
          @click="cadastrar"
          color="success"
          type="filled"
          icon="add"
          >Cadastrar</vs-button
        >
      </div>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import ModalCadastrarContato from "@/views/modals/ModalCadastrarContato";
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  components: {
    ModalCadastrarContato
  },
  mixins: [useHTTP, Validators],
  data: () => ({
    form: {},
    contatos: [],
    errors: [],
    modalCadastroGestor: false
  }),
  methods: {
    removeContato(idx) {
      this.contatos.splice(idx, 1);
    },
    addContato(contato) {
      this.contatos.push(contato);
    },
    async cadastrarContatos(idGestor) {
      let errors = 0;
      for (let i = 0; i < this.contatos.length; i++) {
        this.contatos[i].id_pessoa = idGestor;
        const res = await this.createData("contatos", this.contatos[i], true);
        if (res == null) errors++;
      }
      if (errors > 0) {
        this.$vs.notify({
          title: "Ops...",
          position: "top-center",
          text: `Ocorreu um erro ao cadastrar ${errors} contato(s), ${this
            .contatos.length - errors} foram cadastrados com sucesso`,
          color: "warning"
        });
      } else {
        this.$vs.notify({
          title: "Notificação",
          position: "top-center",
          text: "Todoso os contatos foram cadastrados com sucesso",
          color: "success"
        });
      }
    },
    async cadastrar() {
      this.form.tipo_pessoa = "GESTOR";
      const res = await this.createData("pessoas", this.form);
      if (res != null) {
        await this.cadastrarContatos(res.id);
        this.modalCadastroGestor = false;
        this.$emit("update");
      }
    },
    validateCpf() {
      if (!this.isValidCPF(this.form.cpf)) {
        this.errors.cpf = true;
        this.$vs.notify({
          title: "Ops...",
          position: "top-center",
          text: `O CPF digitado é inválido`,
          color: "warning"
        });
      } else {
        this.errors.cpf = false;
      }
      this.$forceUpdate();
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
