<template>
  <div class="w-full">
    <label class="text-sm">Cidade</label>

    <v-select
      label="nome"
      v-model="value"
      :taggable="true"
      :options="options"
      @search="onSearch"
      @option:selected="updateValue"
      :create-option="storeNew"
      :reduce="cidade => cidade.id"
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
    estado: { default: undefined, type: Number },
    initialId: { type: Number, default: undefined }
  },
  data: () => ({
    value: null,
    options: [],
    newOption: null
  }),
  methods: {
    async onSearch(search, loading) {
      if (search.length) {
        loading(true);
        const res = await this.fetchCidades(
          true,
          `search=${search}&id_estado=${this.estado}&status=1`
        );
        this.options = res.data;
        loading(false);
      }
    },
    async updateValue() {
      if (this.value === undefined || this.value === null) {
        if (this.estado !== undefined) {
          const res = await this.createData("enderecos/cidades", {
            id_estado: this.estado,
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
              "Antes de cadastrar uma nova cidade, selecione primeiro o Estado",
            position: "bottom-right",
            color: "warning"
          });
        }
      }
      this.$emit("update", this.value);
    },
    storeNew(option) {
      if (this.estado !== undefined) {
        this.newOption = option;
        return option;
      }

      this.$vs.notify({
        title: "Atenção",
        text: "Antes de cadastrar uma nova cidade, selecione primeiro o Estado",
        position: "bottom-right",
        color: "warning"
      });
    }
  },
  async mounted() {
    if (this.initialId != undefined) {
      const res = await this.fetchCidadeById(true, this.initialId);
      if (res != null) {
        this.value = res.id;
        this.options.push(res);
        this.$forceUpdate();
      }
    }
    // else {
    //   const res = await this.fetchCidades(true);
    //   this.options = res.data;
    // }
  }
};
</script>
