<template>
  <div class="w-full">
    <label class="text-sm">Estado</label>

    <v-select
      :key="keySelect"
      label="nome"
      v-model="value"
      :options="options"
      @search="onSearch"
      :reduce="(estado) => estado.id"
      @option:selected="updateValue"
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
  props: { initialId: { type: Number, default: undefined } },
  data: () => ({
    value: null,
    options: [],
    keySelect: 0,
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchEstados(true, `search=${search}&status=1`);
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
    },
  },
  async mounted() {
    console.log(`🪐 Initial State ID: ${this.initialId}`);
    if (this.initialId != undefined) {
      this.value = this.initialId;
      const res = await this.fetchEstadoById(true, this.initialId);
      console.log(res);
      if (res != null) {
        this.options.push(res);
        // this.keySelect++;
        this.$forceUpdate();
      }
    } else {
      const res = await this.fetchEstados(true, `status=1`);
      this.options = res.data;
    }
  },
};
</script>
