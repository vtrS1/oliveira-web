<template>
  <div class="w-full">
    <label class="text-sm">Tipo do Contato</label>

    <v-select
      label="nome"
      v-model="value"
      :taggable="true"
      :options="options"
      @search="onSearch"
      @option:selected="updateValue"
      :reduce="tipoContato => tipoContato.id"
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
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchTipoContatos(
          true,
          `search=${search}&status=1`
        );
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
      const tipoContato = this.options.find(x => x.id == this.value);
      if (tipoContato != undefined) {
        this.$emit("nome", tipoContato.nome);
        this.$emit("mask", tipoContato.mascara ?? "");
      }
    }
  },
  async mounted() {
    const res = await this.fetchTipoContatos(true, `status=1`);
    this.options = res.data;
  }
};
</script>
