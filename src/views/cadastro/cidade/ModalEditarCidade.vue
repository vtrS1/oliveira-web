<template>
  <div>
    <vs-prompt
      @cancel="close"
      @accept="update"
      @close="close"
      :active.sync="modalEditarCidade"
      title="Editar cidade"
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
              :initialId="form.id_estado"
              @update="val => (form.id_estado = val)"
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
import SelectEstado from "@/components/SelectEstado";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectEstado },
  props: ["modalEditarCidade", "cidade"],
  data: () => ({
    errors: []
  }),
  methods: {
    close() {
      this.$emit("close", true);
    },
    async update() {
      const res = await this.updateData(
        `enderecos/cidades/${this.form.id}`,
        this.form
      );
      if (res != null) {
        this.close();
        this.$emit("update");
      }
    }
  },
  mounted() {},
  computed: {
    form: function() {
      return this.cidade;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
