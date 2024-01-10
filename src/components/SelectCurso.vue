<template>
  <div class="w-full">
    <label class="text-sm">Curso</label>

    <v-select
      label="nome"
      v-model="value"
      :taggable="true"
      :options="options"
      @search="onSearch"
      @option:selected="updateValue"
      :create-option="storeNew"
      :reduce="curso => curso.id"
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
  props: { initialId: { type: Number, default: undefined } },
  data: () => ({
    value: null,
    options: [],
    newOption: null
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchCursos(true, `search=${search}&status=1`);
        this.options = res.data;
        loading(false);
      }
    },
    async updateValue() {
      if (this.value === undefined || this.value === null) {
        const res = await this.createData("tipos/cursos", {
          nome: this.newOption
        });
        if (res != null) {
          this.value = res.id;
          this.options.push(res);
        }
      }
      this.$emit("update", this.value);
    },
    storeNew(option) {
      this.newOption = option;
      return option;
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchCursoById(true, this.initialId);
      if (res != null) {
        this.value = this.initialId;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else {
      const res = await this.fetchCursos(true, `status=1`);
      this.options = res.data;
    }
  }
};
</script>
