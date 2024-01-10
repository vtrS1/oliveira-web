<template>
  <div>
    <vs-button
      class="w-full"
      color="primary"
      type="filled"
      @click="modalState = true"
      icon="person"
      >Copiar permissões</vs-button
    >

    <vs-prompt
      @cancel="modalState = false"
      @accept="copiar"
      @close="modalState = false"
      :active.sync="modalState"
      title="Copiar permissões de usuário"
      accept-text="Copiar"
      cancel-text="Cancelar"
    >
      <form class="ml-8" ref="form">
        <div class="flex vx-row w-full">
          <div class="w-full  mt-0 my-2 ">
            <SelectUsuario
              title="Usuário a ser copiado"
              @update="val => (form.id_usuario_origem = val)"
            />
          </div>

          <div class="w-full  mt-0 my-2 ">
            <SelectUsuario
              title="Usuário de destino"
              @update="val => (form.id_usuario_destino = val)"
            />
          </div>
        </div>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import SelectUsuario from "../../../components/SelectUsuario.vue";
export default {
  components: { SelectUsuario },
  mixins: [useHTTP],
  data: () => ({
    form: {},
    modalState: false
  }),
  methods: {
    async copiar() {
      const res = await this.updateData(
        "usuarios/copiar/permissoes",
        this.form
      );
      if (res != null) {
        this.modalState = false;
        this.form = {};
        this.$emit("update");
      }
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 800px !important;
}
</style>
