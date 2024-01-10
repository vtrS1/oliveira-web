<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">Relatório de vendas por vendedor e lista</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <SelectVendedor @update="(val) => setValue('id_vendedor', val)" />
        </div>
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <SelectLista
            :vendedor="form.id_vendedor"
            @update="(val) => setValue('id_lista', val)"
          ></SelectLista>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo</label>
          <v-select
            class="w-full"
            v-model="form.type"
            label="name"
            :reduce="(type) => type.value"
            :options="types"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pt-6">
          <vs-button class="float-right w-full" @click="openReport()"
            >Gerar relatório</vs-button
          >
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import ENV from "./../../common/env";
import useReport from "@/common/mixins/useReport.js";
import SelectVendedor from "@/components/SelectVendedor";
import SelectLista from "@/components/SelectLista";
export default {
  components: { SelectVendedor, SelectLista },
  mixins: [useReport],
  data: () => ({
    currentDate: new Date(),
    form: {
      sort: "asc",
      order: "id",
      type: "analitico",
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" },
    ],
  }),
  methods: {
    async openReport() {
      if (
        this.form.id_vendedor == null ||
        this.form.id_vendedor == undefined ||
        this.form.id_lista == null ||
        this.form.id_lista == undefined
      ) {
        this.$vs.notify({
          title: "Atenção",
          text: "Preencha todos os campos obrigatórios",
          position: "bottom-right",
          color: "warning",
        });
        return;
      } else {
        await this.generateReport(this.route, this.form);
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
  },
  mounted() {
    this.currentDate = new Date();
    this.route = "relatorioVendasVendedorLista";
  },
};
</script>
