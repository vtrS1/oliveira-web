<template>
  <div>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalEditarEstado"
      title="Editar estado"
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
          <vs-input
            label-placeholder="Sigla"
            class="w-full"
            v-model="form.sigla"
            :danger="errors.sigla"
            danger-text="Digite uma sigla, Ex: AM"
          />
        </div>
      </form>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
export default {
  mixins: [useHTTP, Validators],
  props: ["modalEditarEstado", "estado"],
  data: () => ({
    errors: []
  }),
  methods: {
    close() {
      this.$emit("close", true);
    },
    async atualizar() {
      const res = await this.updateData(
        `enderecos/estados/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    }
  },
  computed: {
    form: function() {
      return this.estado;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
