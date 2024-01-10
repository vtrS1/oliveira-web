<template>
  <div>
    <vs-button
      icon="mode_edit"
      type="flat"
      @click="modalState = true"
      color="primary"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalState"
      title="Editar forma de pagamento"
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
        </div>
        <!-- <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Max. Parcelas"
            class="w-full"
            v-model="form.parcela"
          />
        </div> -->
        <vs-switch
          color="dark"
          vs-icon-on="check"
          vs-icon-off="block"
          class="mt-8"
          v-model="form.boleto"
        >
          <span slot="on">É boleto</span>
          <span slot="off">Não é boleto</span>
        </vs-switch>
        <vs-switch
          color="dark"
          vs-icon-on="check"
          vs-icon-off="block"
          class="mt-8"
          v-model="form.entrada"
        >
          <span slot="on">Pode ser usado na entrada</span>
          <span slot="off">Não pode ser usado na entrada</span>
        </vs-switch>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
export default {
  mixins: [useHTTP, useData, Validators],
  props: ["formaPagamento"],
  data: () => ({
    modalState: false
  }),
  methods: {
    close() {
      this.$emit("close", true);
    },
    async atualizar() {
      const res = await this.updateData(
        `forma-pagamentos/${this.form.id}`,
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
      return this.formaPagamento;
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
