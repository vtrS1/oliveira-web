<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="nome"
      v-model="value"
      :filterable="false"
      :options="options"
      @search="onSearch"
      @option:selected="updateValue"
      :reduce="vendedor => vendedor.id"
    >
      <template slot="no-options">
        Digite para pesquisar
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.id + " - " + option.nome + " - " + option.cpf }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.id + " - " + option.nome + " - " + option.cpf }}
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
    title: { default: "Aluno", type: String },
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
        const res = await this.fetchAlunos(true, `search=${search}&status=1`);
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
      const res = await this.fetchAlunoById(true, this.initialId);
      this.options.push(res);
      this.value = this.initialId;
      this.$forceUpdate();
    }
  }
};
</script>
