<template>
  <div>
    <vs-tooltip title="Editar ficha">
      <vs-button
        class="mr-2 float-right"
        color="success"
        type="flat"
        @click="modalStateEditFicha = true"
        icon="edit"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @accept="update"
      @close="close"
      :active.sync="modalStateEditFicha"
      title="Atualizar ficha"
      accept-text="Atualizar"
      cancel-text="Cancelar"
      class="p-0 m-0"
      id="create-ficha"
    >
      <div>
        <form class="pl-8">
          <div class="flex vx-row w-full">
            <div class="w-3/12  mt-0 my-2">
              <SelectContrato
                @update="val => setValue('id_contrato', val)"
                @instituicao="id => (formFicha.id_instituicao = id)"
                :initialId="formFicha.id_contrato"
              />
            </div>
            <div class="w-9/12 pl-2 mt-0 my-2">
              <SelectInstituicao
                :key="formFicha.id_contrato"
                @update="val => setValue('id_instituicao', val)"
                :disabled="true"
                :initialId="formFicha.contrato.id_instituicao"
              />
            </div>

            <vs-input
              label-placeholder="Número"
              class="w-1/12 mt-6 pr-2"
              v-model="formFicha.numero"
            />

            <div class="w-4/12 mt-0 my-2 pr-2">
              <SelectCurso
                @update="val => setValue('id_curso', val)"
                :initialId="formFicha.id_curso"
              />
            </div>

            <div class="w-3/12 mt-0 my-2 pr-2">
              <SelectTurma
                @update="val => setValue('id_turma', val)"
                :initialId="formFicha.id_turma"
              />
            </div>

            <div class="w-3/12 pr-2 mt-0 my-2">
              <SelectTipoProduto
                @update="val => setValue('id_tipo_produto', val)"
                :initialId="formFicha.id_tipo_produto"
              />
            </div>

            <vs-input
              label-placeholder="Qtd. Fotos"
              class="w-1/12 mt-6 pr-2"
              v-model="formFicha.qtd_foto"
            />

            <div class="w-full md:w-3/12 pr-2">
              <SelectTipoBeca
                @update="val => setValue('id_tipo_beca', val)"
                :initialId="formFicha.id_tipo_beca"
              />
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
import SelectTipoBeca from "@/components/SelectTipoBeca";
import SelectTipoProduto from "@/components/SelectTipoProduto";
import SelectCurso from "@/components/SelectCurso";
import SelectInstituicao from "@/components/SelectInstituicao";
import SelectTurma from "@/components/SelectTurma";
import SelectContrato from "@/components/SelectContrato";
export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {
    SelectInstituicao,
    SelectCurso,
    SelectTipoBeca,
    SelectTipoProduto,
    SelectTurma,
    SelectContrato
  },
  props: ["ficha"],
  data: () => ({
    modalStateEditFicha: false
  }),
  async mounted() {},
  methods: {
    close() {
      this.modalStateEditFicha = false;
    },
    async update() {
      const res = await this.updateData(
        `fichas/${this.ficha.id}`,
        this.formFicha
      );
      if (res != null) {
        this.close();
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.formFicha[key] = value;
      this.$forceUpdate();
    }
  },
  computed: {
    formFicha: function() {
      return this.ficha;
    }
  }
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1000px !important;
}
</style>
