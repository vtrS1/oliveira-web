<template>
  <div>
    <vs-tooltip title="Editar parametro">
      <vs-button color="primary" icon="edit" @click="modalEditParametro = true">
      </vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @accept="update"
      @close="close"
      :active.sync="modalEditParametro"
      title="Editar parâmetro"
      accept-text="Atualizar"
      cancel-text="Cancelar"
      class="p-0 m-0"
      id="edit-parametro"
    >
      <div>
        <form class="pl-8">
          <div class="flex vx-row w-full">
            <vs-input class="w-full mt-6 pr-2" v-model="formParametro.valor" />
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
export default {
  mixins: [useHTTP, useData, PromptActiveDesactive],
  components: {},
  props: ["parametro"],
  data: () => ({
    formParametro: {},
    modalEditParametro: false
  }),
  async mounted() {
    this.formParametro = this.parametro;
  },
  methods: {
    close() {
      this.modalEditParametro = false;
    },
    async update() {
      const res = await this.updateData(
        "parametros/" + this.parametro.id,
        this.formParametro
      );
      if (res != null) {
        this.close();
        this.$emit("update");
        this.formParametro = {};
      }
    }
  }
};
</script>

<style>
#edit-parametro > .con-vs-dialog .vs-dialog {
  max-width: 800px !important;
}
</style>
