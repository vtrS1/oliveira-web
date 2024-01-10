<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalState = true"
      icon="add"
      >Aluno e ficha</vs-button
    >
    <vs-prompt
      @cancel="close"
      @accept="add"
      @close="close"
      :active.sync="modalState"
      title="Cadastar aluno e ficha"
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
              <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
                <SelectContrato
                  title="Contrato *"
                  @update="(val) => setValueFicha('contrato', val)"
                  @instituicao="(val) => setValueFicha('id_instituicao', val)"
                />
              </div>

              <vs-input
                label-placeholder="Nº da Ficha *"
                class="w-full md:w-1/12 mt-6 pr-2"
                v-model="formFicha.numero"
                @change="verifyFicha"
              />

              <div
                class="w-full md:w-5/12 pr-2 mt-0 my-2"
                :key="formFicha.id_instituicao"
              >
                <SelectInstituicao
                  :initialId="formFicha.id_instituicao"
                  @update="(val) => setValueFicha('id_instituicao', val)"
                  :disabled="true"
                />
              </div>

              <div class="w-full md:w-2/12 mt-0 my-2 pr-2">
                <SelectCurso @update="(val) => setValueFicha('id_curso', val)" />
              </div>

              <div class="w-full md:w-2/12 mt-0 my-2 pr-2">
                <SelectTurma @update="(val) => setValueFicha('id_turma', val)" />
              </div>

              <vs-input
                label-placeholder="Nome *"
                class="w-full md:w-4/12 pr-2 mt-6"
                v-model="form.nome"
              />

              <vs-input
                label="Data de Nascimento"
                class="w-full md:w-2/12 pr-2 pt-1 mt-0"
                v-model="form.data_nascimento"
                type="date"
              />
              <vs-input
                label-placeholder="CPF"
                class="w-full md:w-2/12 pr-2 mt-6"
                v-mask="'###.###.###-##'"
                v-model="form.cpf"
              />

              <vs-input
                label-placeholder="Nome do pai"
                class="w-full md:w-4/12 pr-2 mt-6"
                v-model="form.nome_pai"
              />
              <vs-input
                label-placeholder="Nome da mãe"
                class="w-full md:w-4/12 pr-2 mt-6"
                v-model="form.nome_mae"
              />

              <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
                <SelectTipoProduto
                  title="Produto *"
                  @update="(val) => setValueFicha('id_tipo_produto', val)"
                />
              </div>

              <vs-input
                label-placeholder="Qtd. Fotos"
                class="w-full md:w-1/12 mt-6 pr-2"
                v-model="formFicha.qtd_foto"
              />

              <div class="w-full md:w-2/12 pr-2">
                <SelectTipoBeca @update="(val) => setValueFicha('id_tipo_beca', val)" />
              </div>

              <vs-input
                label-placeholder="Observação"
                class="w-full md:w-3/12 mt-6"
                v-model="formFicha.obs"
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
                :estado="form.id_estado"
                :initialId="form.id_cidade"
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
          <CadastrarContatoAluno
            :key="contatosKey"
            :contatosData="contatos"
            @update="addContato"
            @remove="removeContato"
          ></CadastrarContatoAluno>
        </div>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import CadastrarContatoAluno from "@/views/administracao/aluno/CadastrarContatoAluno";
import SelectBairro from "@/components/SelectBairro";
import SelectCidade from "@/components/SelectCidade";
import SelectInstituicao from "@/components/SelectInstituicao";
import SelectEstado from "@/components/SelectEstado";
import SelectCurso from "@/components/SelectCurso";
import SelectContrato from "@/components/SelectContrato";
import SelectTurma from "@/components/SelectTurma";
import SelectTipoProduto from "@/components/SelectTipoProduto";
import SelectTipoBeca from "@/components/SelectTipoBeca";

export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {
    CadastrarContatoAluno,
    SelectBairro,
    SelectCidade,
    SelectEstado,
    SelectInstituicao,
    SelectCurso,
    SelectContrato,
    SelectTurma,
    SelectTipoProduto,
    SelectTipoBeca,
  },
  data: () => ({
    form: {},
    formFicha: {},
    modalState: false,
    isValid: false,
    contatosKey: 0,
    contatos: [],
    loading: false,
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    async add() {
      if (
        this.contatos == null ||
        this.contatos == undefined ||
        this.contatos.length == 0
      ) {
        this.$vs.notify({
          title: "Ops...",
          text: "Adicione pelo menos um contato",
          position: "top-center",
          color: "warning",
        });
        return 0;
      }
      if (
        this.formFicha.id_tipo_produto == null ||
        this.formFicha.id_tipo_produto == undefined ||
        this.formFicha.contrato == null ||
        this.formFicha.contrato == undefined ||
        this.formFicha.numero == null ||
        this.formFicha.numero == undefined ||
        this.form.nome == null ||
        this.form.nome == undefined ||
        this.form.nome == "" ||
        this.form.nome == " "
      ) {
        this.$vs.notify({
          title: "Ops...",
          text: "Preencha os campos obrigatórios (*)",
          position: "top-center",
          color: "warning",
        });
      } else {
        const res = await this.createData("alunos", this.form);
        if (res != null) {
          await this.createData("fichas", {
            ...this.formFicha,
            id_aluno: res.id,
          });
          for (let contato of this.contatos) {
            contato.id_aluno = res.id;
            await this.createData("contatos", contato);
          }
          this.close();
          this.$emit("update");
          this.form = {};
          this.formFicha = {};
        }
      }
    },
    async consultar() {
      this.loading = true;
      this.$vs.loading();
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
      this.loading = false;
      this.$vs.loading.close();
    },
    addContato(ctt) {
      this.contatos.push(ctt);
      this.contatosKey++;
    },
    removeContato(idx) {
      this.contatos.splice(idx, 1);
      this.contatosKey++;
    },
    async verifyFicha() {
      const res = await this.simplePost("fichas/verificar", this.formFicha, true);
      if (res != null) {
        if (res.id != undefined) {
          this.formFicha.numero = null;
          this.$vs.notify({
            title: "Ops...",
            text: "Já existe uma ficha com essa numeração associada a esse contrato",
            position: "top-center",
            color: "warning",
          });
        }
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
    setValueFicha(key, value) {
      this.formFicha[key] = value;
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
