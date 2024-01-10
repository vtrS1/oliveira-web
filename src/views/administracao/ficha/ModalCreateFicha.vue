<template>
  <div>
    <vs-tooltip title="Cadastrar ficha">
      <vs-button
        class="mr-2 float-right"
        color="success"
        @click="modalStateCreateFicha = true"
        icon="add"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @accept="add"
      @close="close"
      :active.sync="modalStateCreateFicha"
      title="Cadastar ficha"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
      class="p-0 m-0"
      id="create-ficha"
    >
      <div>
        <form class="pl-8">
          <div class="flex vx-row w-full">
            <SelectAluno title="* Aluno" @update="(val) => setValue('id_aluno', val)" />

            <div class="w-full md:w-3/12 mt-0 my-2 pr-2">
              <SelectContrato
                title="* Contrato"
                @update="(val) => setValue('contrato', val)"
                @instituicao="(id) => (formFicha.id_instituicao = id)"
              />
            </div>

            <vs-input
              label-placeholder="* Número"
              class="w-full md:w-2/12 mt-6 pr-2"
              v-model="formFicha.numero"
              @change="verifyFicha"
            />

            <div class="w-full md:w-7/12 mt-0 my-2">
              <SelectInstituicao
                :key="formFicha.contrato"
                :initialId="formFicha.id_instituicao"
                :disabled="true"
              />
            </div>

            <div class="w-full md:w-3/12 pr-2 mt-0 my-2">
              <SelectCurso @update="(val) => setValue('id_curso', val)" />
            </div>
            <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
              <SelectTurma @update="(val) => setValue('id_turma', val)" />
            </div>

            <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
              <SelectTipoProduto
                title="* Produto"
                @update="(val) => setValue('id_tipo_produto', val)"
              />
            </div>

            <vs-input
              label-placeholder="Qtd. Fotos"
              class="w-full md:w-3/12 mt-6"
              v-model="formFicha.qtd_foto"
            />

            <div class="w-full md:w-3/12 pr-2">
              <SelectTipoBeca @update="(val) => setValue('id_tipo_beca', val)" />
            </div>

            <vs-input
              label-placeholder="Observação"
              class="w-full md:w-9/12 mt-6"
              v-model="formFicha.obs"
            />
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectAluno from "@/components/SelectAluno";
import SelectContrato from "@/components/SelectContrato";
import SelectInstituicao from "@/components/SelectInstituicao";
import SelectCurso from "@/components/SelectCurso";
import SelectTurma from "@/components/SelectTurma";
import SelectTipoProduto from "@/components/SelectTipoProduto";
import SelectTipoBeca from "@/components/SelectTipoBeca";
export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {
    SelectAluno,
    SelectTipoBeca,
    SelectTipoProduto,
    SelectTurma,
    SelectCurso,
    SelectInstituicao,
    SelectContrato,
  },
  props: ["aluno"],
  data: () => ({
    formFicha: {},
    modalStateCreateFicha: false,
    listAlunoKey: 0,
  }),
  methods: {
    close() {
      this.modalStateCreateFicha = false;
    },
    async add() {
      if (
        this.formFicha.id_aluno == null ||
        this.formFicha.id_aluno == undefined ||
        this.formFicha.id_tipo_produto == null ||
        this.formFicha.id_tipo_produto == undefined ||
        this.formFicha.contrato == null ||
        this.formFicha.contrato == undefined ||
        this.formFicha.numero == null ||
        this.formFicha.numero == undefined
      ) {
        this.$vs.notify({
          title: "Ops...",
          text: "Preencha os campos obrigatórios (*)",
          position: "top-center",
          color: "warning",
        });
      } else {
        const res = await this.createData("fichas", this.formFicha);
        if (res != null) {
          this.close();
          this.$emit("update");
          this.formFicha = {};
        }
      }
    },
    setValue(key, value) {
      this.formFicha[key] = value;
      this.$forceUpdate();
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
  },
};
</script>

<style>
#create-ficha > .con-vs-dialog .vs-dialog {
  max-width: 800px !important;
}
</style>
