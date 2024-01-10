<template>
  <div>
    <vs-button
      icon="mode_edit"
      type="flat"
      @click="modalEditarBairro = true"
      color="primary"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalEditarBairro"
      title="Editar bairro"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full"
            v-model="form.nome"
            :danger="errors.nome"
            danger-text="Digite um nome"
          />
          <div class="w-full mt-0 my-2 pr-2">
            <SelectEstado
              :initialId="
                form.cidade && form.cidade.id_estado
                  ? form.cidade.id_estado
                  : undefined
              "
              @update="
                val => {
                  setValue('id_estado', val);
                  form.id_cidade = undefined;
                }
              "
            />
          </div>
          <div class="w-full  pr-2 mt-0 my-2">
            <SelectCidade
              :key="form.id_estado"
              :estado="form.id_estado"
              :initialId="form.id_cidade"
              @update="val => setValue('id_cidade', val)"
            />
          </div>
        </div>
      </form>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectCidade, SelectEstado },
  props: {
    bairro: { type: Object | undefined, default: undefined }
  },
  data: () => ({
    errors: [],
    form: {},
    modalEditarBairro: false
  }),
  methods: {
    close() {
      this.modalEditarBairro = false;
    },
    async atualizar() {
      const res = await this.updateData(
        `enderecos/bairros/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.close();
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  mounted() {
    if (this.bairro != undefined) {
      this.form = this.bairro;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
