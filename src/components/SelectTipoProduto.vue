<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="nome"
      v-model="value"
      :options="options"
      :taggable="true"
      @search="onSearch"
      @option:selected="updateValue"
      :reduce="(produto) => produto.id"
    >
      <template slot="no-options"> Digite para pesquisar </template>
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
    initialId: { type: Number | String, default: undefined },
    title: { type: String, default: "Produto" },
  },
  data: () => ({
    value: null,
    options: [],
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchTipoProdutos(true, `search=${search}&status=1`);
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
    },
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchTipoProdutoById(true, this.initialId);
      if (res != null) {
        this.value = res.id;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else {
      const res = await this.fetchTipoProdutos(true, `status=1`);
      this.options = res.data;
    }
  },
};
</script>
