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
        Pesquise pelo id, nome ou CPF
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
    title: { default: "Sacado", type: String },
    initialId: { default: undefined },
    checkPendencia: { default: false }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchSacados(true, `search=${search}&status=1`);
        this.options = res.data;
        loading(false);
      }
    },
    async updateValue() {
      if (this.checkPendencia != false) {
        this.$emit("update", this.value);
      }
      const res = await this.fetchNegativadoByIdSacado(false, this.value);
      if (res && res.id != undefined && res.id != null) {
        this.$vs.notify({
          title: "Ops...",
          text: `Este sacado (#${this.value}) está bloqueado para novas contas, verifique a página de [Inadimplentes] para saber mais`,
          position: "bottom-right",
          color: "warning",
          time: 5000
        });
        this.value = null;
      } else {
        this.$emit("update", this.value);
      }
    }
  },
  async mounted() {
    if (this.checkPendencia != false) {
      if (this.initialId != undefined) {
        const res = await this.fetchNegativadoByIdSacado(false, this.initialId);
        if (res && res.id != undefined && res.id != null) {
          this.$vs.notify({
            title: "Ops...",
            text: `Este sacado (#${this.value}) está bloqueado para novas contas, verifique a página de [Inadimplentes] para saber mais`,
            position: "bottom-right",
            color: "warning",
            time: 5000
          });
          this.value = null;
        }
      }
    } else {
      if (this.initialId != undefined) {
        const res = await this.fetchSacadoById(true, this.initialId);
        this.options.push(res);
        this.value = this.initialId;
        this.$forceUpdate();
      }
    }
  }
};
</script>
