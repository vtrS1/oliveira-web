<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="nome"
      v-model="value"
      :taggable="false"
      :options="options"
      @search="onSearch"
      @option:selected="updateValue"
      :reduce="produto => produto.id"
    >
      <template slot="no-options">
        Digite para pesquisar
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.nome }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.nome }}
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
    title: { default: "Forma de pagamento", type: String },
    initialId: { default: undefined }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchFormasPagamento(
          true,
          `search=${search}&status=1`
        );
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchFormaPagamentoById(true, this.initialId);
      if (res != null) {
        this.value = res.id;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else {
      const res = await this.fetchFormasPagamento(true, `status=1`);
      this.options = res.data;
    }
  }
};
</script>
