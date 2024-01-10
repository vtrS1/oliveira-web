<template>
  <div>
    <vs-tooltip text="Editar contrato">
      <vs-button
        icon="mode_edit"
        type="flat"
        @click="modalEditarContrato = true"
        color="primary"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalEditarContrato"
      title="Editar contrato"
      accept-text="Atualizar"
      cancel-text="Cancelar"
      class="p-0 m-0"
    >
      <div class="flex vx-row w-full pl-8">
        <div class="w-full">
          <SelectInstituicao
            :initialId="contrato.id_instituicao"
            @update="val => setValue('id_instituicao', val)"
          />
        </div>

        <vs-input
          label-placeholder="Evento"
          class="w-full"
          v-model="form.evento"
        />
        <div class="w-full py-2">
          <label class="text-sm mt-8">Valor da despesa</label>
          <money
            class="vs-input--input"
            v-model="form.valor_despesa"
            v-bind="formatMoney()"
          ></money>
        </div>
        <vs-switch
          color="dark"
          vs-icon-on="check"
          vs-icon-off="block"
          class="mt-8"
          v-model="form.forma_comissao"
        >
          <span slot="on">Forma comissão</span>
          <span slot="off">Não forma comissão</span>
        </vs-switch>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectInstituicao from "@/components/SelectInstituicao";
export default {
  props: ["contrato"],
  mixins: [useHTTP, useData],
  components: { SelectInstituicao },
  data: () => ({
    modalEditarContrato: false
  }),
  methods: {
    close() {
      this.modalEditarContrato = false;
    },
    async atualizar() {
      const res = await this.updateData(
        "contratos/" + this.contrato.id,
        this.form
      );
      if (res != null) {
        this.modalEditarContrato = false;
      }
      this.$emit("update");
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  computed: {
    form: function() {
      return this.contrato;
    }
  }
};
</script>
