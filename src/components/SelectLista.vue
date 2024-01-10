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
    >
      <template slot="no-options">
        Pesquise pelo numero da lista
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.id }} - {{ option.vendedor && option.vendedor.nome }}
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
    title: { type: String, default: "Lista" },
    vendedor: { type: Number, default: undefined }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchListas(
          true,
          `vendedor=1&search=${search}&status=1&aluno=1${
            this.vendedor != undefined ? "&id_vendedor=" + this.vendedor : ""
          }`
        );
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
      const lista = this.options.find(x => x.id == this.value);
      if (lista != undefined) {
        this.$emit("lista", lista.id);
      }
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchListaById(
        true,
        this.initialId,
        "aluno=1&vendedor=1"
      );
      if (res != null) {
        this.value = this.initialId;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else if (this.vendedor != undefined) {
      const res = await this.fetchListas(
        true,
        `vendedor=1&search=${search}&status=1&aluno=1&id_vendedor=${this.vendedor}`
      );
      this.options = res.data;
      this.$forceUpdate();
    }
  }
};
</script>
