<template>
  <div class="w-full">
    <label class="text-sm">Bairro</label>

    <v-select
      label="nome"
      v-model="value"
      :options="options"
      :taggable="true"
      :create-option="storeNew"
      @search="onSearch"
      @option:selected="updateValue"
      :reduce="bairro => bairro.id"
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
    cidade: { default: undefined, type: Number },
    initialId: { type: Number, default: undefined }
  },
  data: () => ({
    value: null,
    options: []
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchBairros(
          true,
          `search=${search}&id_cidade=${this.cidade}&status=1`
        );
        this.options = res.data;
        loading(false);
      }
    },
    async updateValue() {
      if (this.value === undefined || this.value === null) {
        if (this.cidade !== undefined) {
          const res = await this.createData("enderecos/bairros", {
            id_cidade: this.cidade,
            nome: this.newOption
          });
          if (res != null) {
            this.value = res.id;
            this.options.push(res);
          }
        } else {
          this.$vs.notify({
            title: "Atenção",
            text:
              "Antes de cadastrar um novo bairro, selecione primeiro a Cidade",
            position: "bottom-right",
            color: "warning"
          });
        }
      }
      this.$emit("update", this.value);
      const bairroRes = this.options.find(x => x.id === this.value);
      if (bairroRes != undefined) {
        this.$emit("bairro", bairroRes);
      }
    },
    storeNew(option) {
      if (this.cidade !== undefined) {
        this.newOption = option;
        return option;
      }

      this.$vs.notify({
        title: "Atenção",
        text: "Antes de cadastrar um novo bairro, selecione primeiro a Cidade",
        position: "bottom-right",
        color: "warning"
      });
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchBairroById(true, this.initialId);
      if (res != null) {
        this.value = res.id;
        this.options.push(res);
        this.$forceUpdate();
      }
    }
    // else {
    //   const res = await this.fetchBairros(true);
    //   this.options = res.data;
    // }
  }
};
</script>
