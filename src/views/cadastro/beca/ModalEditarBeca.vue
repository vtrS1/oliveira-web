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
      title="Editar beca"
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
  props: ["beca"],
  data: () => ({
    errors: [],
    modalState: false
  }),
  methods: {
    async atualizar() {
      const res = await this.updateData(
        `tipos/becas/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.modalState = false;
        this.$emit("update");
      }
    }
  },
  computed: {
    form: function() {
      return this.beca;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
