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
      @accept="cadastrar"
      @close="close"
      :active.sync="modalState"
      title="Cadastar vendedor"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full md:w-4/12 mt-5 pr-2 pt-1"
            v-model="form.nome"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-full md:w-2/12 pr-2 "
            v-model="form.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-full md:w-4/12 pl-2 mt-5 pt-1"
            v-mask="'###.###.###-##'"
            v-model="form.cpf"
          />
          <vs-input
            label-placeholder="RG"
            class="w-full md:w-2/12 pl-2 mt-5 pt-1"
            v-mask="'###########'"
            v-model="form.rg"
          />
        </div>
      </form>
      <div class="flex vx-row w-full pl-8">
        <vs-input
          label-placeholder="CEP"
          class="w-1/12 mt-8"
          v-model="form.cep"
          v-mask="'#####-###'"
          @change="consultar"
        />

        <div class="w-3/12 pl-2 mt-2 my-2">
          <SelectEstado @update="val => setValue('id_estado', val)" />
        </div>
        <div class="w-4/12 pl-2 mt-2 my-2">
          <SelectCidade
            :estado="form.id_estado"
            @update="val => setValue('id_cidade', val)"
          />
        </div>
        <div class="w-4/12 pl-2 mt-2 my-2 ">
          <SelectBairro
            :cidade="form.id_cidade"
            @update="val => setValue('id_bairro', val)"
          />
        </div>

        <vs-input
          label-placeholder="Logradouro"
          class="w-6/12"
          @change="$forceUpdate()"
          v-model="form.logradouro"
        />

        <vs-input
          label-placeholder="Número"
          class="w-1/12 pr-2 pl-2"
          v-model="form.numero"
        />
        <vs-input
          label-placeholder="Complemento"
          class="w-5/12"
          v-model="form.complemento"
        />
      </div>
      <CadastrarContatoVendedor
        :key="contatosKey"
        @update="addContato"
        :contatos="contatos"
      ></CadastrarContatoVendedor>
    </vs-prompt>
  </div>
</template>

<script>
import CadastrarContatoVendedor from "./CadastrarContatoVendedor";
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
export default {
  components: {
    CadastrarContatoVendedor,
    SelectEstado,
    SelectCidade,
    SelectBairro
  },
  mixins: [useHTTP, useData, Validators],
  data: () => ({
    form: {},
    contatos: [],
    errors: [],
    modalState: false,
    contatosKey: 0
  }),
  methods: {
    close() {
      this.form = {};
      this.contatos = [];
      this.contatosKey = 0;
      this.modalState = false;
    },
    addContato(contato) {
      this.contatos.push(contato);
      this.contatosKey++;
    },
    async cadastrarContatos(idVendedor) {
      let errors = 0;
      for (let i = 0; i < this.contatos.length; i++) {
        this.contatos[i].id_vendedor = idVendedor;
        const res = await this.createData("contatos", this.contatos[i], true);
        if (res == null) errors++;
      }
      if (errors > 0) {
        this.$vs.notify({
          title: "Ops...",
          text: `Ocorreu um erro ao cadastrar ${errors} contato(s), ${this
            .contatos.length - errors} foram cadastrados com sucesso`,
          color: "warning"
        });
      } else {
        this.$vs.notify({
          title: "Notificação",
          text: "Todoso os contatos foram cadastrados com sucesso",
          color: "success"
        });
      }
    },
    async consultar() {
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
    },
    async cadastrar() {
      const res = await this.createData("vendedores", this.form);
      await this.cadastrarContatos(res.id);
      if (res != null) {
        this.close();
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.form[key] = value;
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
