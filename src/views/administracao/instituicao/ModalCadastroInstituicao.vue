<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="openModalCadastroInstituicao()"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="modalState = false"
      @accept="cadastrar"
      @close="modalState = false"
      :active.sync="modalState"
      title="Cadastar Instituição"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      class="p-0 m-0"
    >
      <div class=" overflow-y-auto">
        <form class="ml-8">
          <div class="flex vx-row w-full">
            <vs-input
              label-placeholder="Nome da instituição *"
              class="w-4/12 pr-2 mt-6"
              v-model="form.nome"
            />

            <vs-input
              label-placeholder="Nome responsável *"
              class="w-4/12 pr-2 mt-6"
              v-model="form.nome_responsavel"
            />

            <vs-input
              label-placeholder="Cargo do responsável"
              class="w-2/12 pl-2 mt-6"
              v-model="form.cargo_responsavel"
            />

            <vs-input
              label-placeholder="CNPJ"
              class="w-2/12 pl-2 mt-6"
              v-mask="'##.###.###/####-##'"
              v-model="form.cnpj"
            />
            <vs-input
              label-placeholder="Observações internas"
              class="w-10/12"
              v-model="form.obs"
            />
            <vs-input
              label-placeholder="CEP *"
              class="w-2/12 pl-2 mt-5"
              v-model="form.cep"
              v-mask="'#####-###'"
              @change="consultar"
            />
          </div>
        </form>
        <form class="ml-8 mt-2 mb-5">
          <div class="flex vx-row w-full">
            <div class="w-4/12 mt-0 my-2 pr-2">
              <SelectEstado @update="val => setValue('id_estado', val)" />
            </div>
            <div class="w-4/12 pr-2 mt-0 my-2">
              <SelectCidade
                :key="form.id_estado"
                @update="val => setValue('id_cidade', val)"
                :estado="form.id_estado"
              />
            </div>
            <div class="w-4/12  mt-0 my-2 ">
              <SelectBairro
                :key="form.id_cidade"
                @update="val => setValue('id_bairro', val)"
                :cidade="form.id_cidade"
              />
            </div>

            <vs-input
              label-placeholder="Logradouro"
              class="w-6/12 pr-2"
              v-model="form.logradouro"
              @change="$forceUpdate()"
            />

            <vs-input
              label-placeholder="Complemento"
              class="w-5/12 pr-2"
              v-model="form.complemento"
            />

            <vs-input
              label-placeholder="Número"
              class="w-1/12"
              v-model="form.numero"
            />
          </div>
        </form>

        <ModalCadastrarContato @add="addContato" @remove="removeContato" />
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import ModalCadastrarContato from "@/views/modals/ModalCadastrarContato";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import axios from "axios";
export default {
  mixins: [useHTTP, useData],
  components: {
    ModalCadastrarContato,
    SelectEstado,
    SelectCidade,
    SelectBairro
  },
  data: () => ({
    form: {},
    contatos: [],
    modalState: false
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    removeContato(idx) {
      this.contatos.splice(idx, 1);
    },
    addContato(contato) {
      this.contatos.push(contato);
    },
    async cadastrar() {
      const res = await this.createData("instituicoes", this.form);
      if (res != null) {
        await this.createMultiContatosData(res.id, this.contatos, true, true);
        this.close();
        this.$emit("update");
        this.form = {};
      }
    },
    async consultar() {
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
    },
    async openModalCadastroInstituicao() {
      this.modalState = true;
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

#vs8__listbox {
  z-index: 99999 !important;
}
</style>
