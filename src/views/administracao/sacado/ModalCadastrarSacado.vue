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
      @accept="add"
      @close="close"
      :active.sync="modalState"
      title="Cadastar sacado"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      :scroll="true"
      class="p-0 m-0 overflow-y-scroll"
    >
      <div v-if="loading == true">
        <p>Carregando...</p>
      </div>
      <div v-else>
        <div class="">
          <form class="pl-8">
            <div class="flex vx-row w-full">
              <vs-input
                label-placeholder="Nome *"
                class="w-full md:w-6/12 pr-2 mt-6"
                v-model="form.nome"
              />

              <vs-input
                label="Data de Nascimento"
                class="w-full md:w-2/12 pr-2 mt-0"
                v-model="form.data_nascimento"
                type="date"
              />
              <vs-input
                label-placeholder="CPF"
                class="w-full md:w-2/12 mt-6"
                v-mask="'###.###.###-##'"
                v-model="form.cpf"
              />
              <vs-input
                label-placeholder="RG"
                class="w-full md:w-2/12 pl-2 mt-6"
                v-mask="'###############'"
                v-model="form.rg"
              />
            </div>
          </form>

          <div class="flex vx-row w-full pl-8">
            <vs-input
              label-placeholder="CEP"
              class="w-full md:w-1/12 mt-8"
              v-model="form.cep"
              v-mask="'#####-###'"
              @change="consultar"
            />

            <div class="w-full md:w-3/12 pl-2 mt-2 my-2">
              <SelectEstado
                :initialId="form.id_estado"
                @update="(val) => setValue('id_estado', val)"
              />
            </div>
            <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
              <SelectCidade
                :initialId="form.id_cidade"
                :estado="form.id_estado"
                @update="(val) => setValue('id_cidade', val)"
              />
            </div>
            <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
              <SelectBairro
                :initialId="form.id_bairro"
                :cidade="form.id_cidade"
                @update="(val) => setValue('id_bairro', val)"
              />
            </div>

            <vs-input
              label-placeholder="Logradouro"
              class="w-full md:w-6/12"
              @click="$forceUpdate()"
              v-model="form.logradouro"
            />

            <vs-input
              label-placeholder="Número"
              class="w-full md:w-1/12 pr-2 pl-2"
              v-model="form.numero"
            />
            <vs-input
              label-placeholder="Complemento"
              class="w-full md:w-5/12"
              v-model="form.complemento"
            />
          </div>
          <CadastrarContatoSacado
            :key="contatosKey"
            @update="addContato"
            :contatos="contatos"
          ></CadastrarContatoSacado>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import CadastrarContatoSacado from "@/views/administracao/sacado/CadastrarContatoSacado";
import SelectBairro from "@/components/SelectBairro";
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";

export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {
    CadastrarContatoSacado,
    SelectBairro,
    SelectCidade,
    SelectEstado,
  },
  data: () => ({
    form: {},
    formFicha: {},
    modalState: false,
    isValid: false,
    contatos: [],
    contatosKey: 0,
    loading: false,
  }),
  methods: {
    close() {
      this.contatos = [];
      this.contatosKey = 0;
      this.formFicha = {};
      this.form = {};
      this.modalState = false;
    },
    async add() {
      const res = await this.createData("sacados", this.form);
      if (res != null) {
        for (let contato of this.contatos) {
          contato.id_sacado = res.id;
          await this.createData("contatos", contato);
        }
        this.close();
        this.$emit("update");
        this.form = {};
        this.formFicha = {};
      }
    },
    async consultar() {
      this.$vs.loading();
      this.loading = true;
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
      this.$vs.loading.close();
      this.loading = false;
    },
    addContato(ctt) {
      this.contatos.push(ctt);
      this.contatosKey++;
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
