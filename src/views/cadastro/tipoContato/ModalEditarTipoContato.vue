<template>
  <div>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalEditarTipoContato"
      title="Editar tipo de contato"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full md:w-1/2 pr-2"
            v-model="form.nome"
          />
          <vs-input
            label-placeholder="Mascara"
            class="w-full md:w-1/2 pl-2"
            v-model="form.mascara"
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
  props: ["modalEditarTipoContato", "tipoContato"],
  data: () => ({}),
  methods: {
    close() {
      this.$emit("close", true);
    },
    async atualizar() {
      const res = await this.updateData(
        `tipos/contatos/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.close();
        this.$emit("update");
      }
    }
  },
  computed: {
    form: function() {
      return this.tipoContato;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
