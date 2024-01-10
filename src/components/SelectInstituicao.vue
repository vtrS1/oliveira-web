<template>
  <div class="w-full">
    <label class="text-sm">Instituição</label>

    <v-select
      label="nome"
      v-model="value"
      :filterable="false"
      :options="options"
      :disabled="disabled"
      @search="onSearch"
      :reduce="instituicao => instituicao.id"
      @option:selected="updateValue"
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
    initialId: { type: String | Number, default: undefined },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchInstituicoes(
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
      console.log("🏫 tem id inicial");
      const res = await this.fetchInstituicaoById(true, this.initialId);
      if (res != null) {
        this.value = res.id;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else {
      const res = await this.fetchInstituicoes(true, `status=1`);
      this.options = res.data;
    }
  }
};
</script>
