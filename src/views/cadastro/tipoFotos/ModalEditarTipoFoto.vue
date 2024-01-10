<template>
  <div>
    <vs-button
      icon="mode_edit"
      type="flat"
      @click="modalState = true"
      color="primary"
    ></vs-button>
    <vs-prompt
      @cancel="modalState = false"
      @accept="atualizar"
      @close="modalState = false"
      :active.sync="modalState"
      title="Editar tipo de foto"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full"
            v-model="form.nome"
          />
          <vs-textarea label="Descrição" v-model="form.descricao" />
        </div>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  props: ["tipo"],
  data: () => ({
    modalState: false,
  }),
  methods: {
    async atualizar() {
      const res = await this.updateData(
        `tipos/produtos/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.modalState = false;
        this.$emit("update");
      }
    },
  },
  computed: {
    form: function () {
      return this.tipo;
    },
  },
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
