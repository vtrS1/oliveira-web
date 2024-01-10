<template>
  <div class="w-full">
    <label class="text-sm">{{ title }}</label>

    <v-select
      label="id"
      v-model="value"
      :filterable="false"
      :options="options"
      @search="onSearch"
      :reduce="(contrato) => contrato.id"
      @option:selected="updateValue"
    >
      <template slot="no-options">
        Pesquise pelo id da ficha, id do aluno ou numero da ficha
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{
            `ID: ${option.id} Nº: ${option.numero} ${
              option.aluno != null ? "Aluno: " + option.aluno.nome : ""
            }`
          }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{
            `ID: ${option.id} Nº: ${option.numero} ${
              option.aluno != null ? "Aluno: " + option.aluno.nome : ""
            }`
          }}
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
    status: { type: Number | String | null, default: undefined },
    contrato: { type: Number | String, default: undefined },
    title: { type: String, default: "Ficha" },
  },
  data: () => ({
    value: null,
    statusParam: "&status=1",
    options: [],
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchFichas(
          true,
          `search=${search}${this.statusParam}&aluno=1${
            this.contrato != undefined ? "&idContrato=" + this.contrato : ""
          }`
        );
        this.options = res.data;
        loading(false);
      }
    },
    updateValue() {
      this.$emit("update", this.value);
      const ficha = this.options.find((x) => x.id == this.value);
      if (ficha != undefined) {
        this.$emit("contrato", ficha.id);
      }
    },
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchFichaById(true, this.initialId, "aluno=1");
      if (res != null) {
        this.value = this.initialId;
        this.options.push(res);
        this.$forceUpdate();
      }
    } else if (this.contrato != undefined) {
      const res = await this.fetchFichas(true, `aluno=1&idContrato=${this.contrato}`);
      this.options = res.data;
      this.$forceUpdate();
    }
    if (this.status != undefined) {
      if (this.status == "all") {
        this.statusParam = "";
      }
    }
  },
};
</script>
