<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="numero"
      v-model="value"
      :filterable="false"
      :options="options"
      @search="onSearch"
      :reduce="contrato => contrato.numero"
      @option:selected="updateValue"
      @option:deselecting="resetValue"
    >
      <template slot="no-options">
        Digite para pesquisar
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.numero }} -
          {{ option.instituicao && option.instituicao.nome }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.numero }}
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
    instituicao: { type: Number, default: undefined },
    title: { type: String, default: "Contrato" }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchContratos(
          true,
          `instituicao=1&search=${search}&status=1${
            this.instituicao != undefined
              ? "&id_instituicao=" + this.instituicao
              : ""
          }`
        );
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
      const contrato = this.options.find(
        x => x.numero == this.value.toString()
      );
      if (contrato != undefined) {
        this.$emit("instituicao", contrato.id_instituicao);
      }
    },
    resetValue() {
      this.$emit("reset");
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchContratoByNumero(true, this.initialId);
      if (res != null) {
        this.value = this.initialId;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else if (this.instituicao != undefined) {
      this.$vs.loading();
      const res = await this.fetchContratos(
        true,
        `instituicao=1&id_instituicao=${this.instituicao}&status=1`
      );
      this.options = res.data;
      this.$vs.loading.close();
    }
  }
};
</script>
