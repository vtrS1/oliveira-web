<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="id"
      v-model="value"
      :filterable="false"
      :options="options"
      @search="onSearch"
      :reduce="contrato => contrato.id"
      @option:selected="updateValue"
      @option:deselecting="resetValue"
    >
      <template slot="no-options">
        Digite para pesquisar
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.id }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.id }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import useData from "@/common/mixins/useData";
export default {
  mixins: [useData],
  props: {
    initialId: { type: Number | String | null, default: undefined },
    sacado: { type: Number, default: undefined },
    title: { type: String, default: "Contas a Receber" }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        this.$vs.loading();
        const res = await this.fetchContasReceber(
          true,
          `search=${search}&status=1${
            this.sacado != undefined ? "&id_sacado=" + this.sacado : ""
          }`
        );
        this.options = res.data;
        this.$vs.loading.close();
      }
    },
    updateValue() {
      this.$emit("update", this.value);
      const venda = this.options.find(x => x.numero == this.value.toString());
      if (venda != undefined) {
        this.$emit("sacado", venda.id_sacado);
      }
    },
    resetValue() {
      this.$emit("reset");
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchContasReceberById(true, this.initialId);
      if (res != null) {
        this.value = this.initialId;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else if (this.sacado != undefined) {
      this.$vs.loading();
      const res = await this.fetchContasReceber(
        true,
        `id_sacado=${this.sacado}&status=1`
      );
      this.options = res.data;
      this.$vs.loading.close();
    }
  }
};
</script>
