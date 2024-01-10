<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">Fichas</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <SelectContrato
            title="Contrato"
            @update="(val) => setValue('contrato', val)"
          ></SelectContrato>
        </div>
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordernar por</label>
          <v-select
            class="w-full"
            v-model="form.order"
            label="name"
            :reduce="(type) => type.value"
            :options="orderBy"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordem</label>
          <v-select
            class="w-full"
            v-model="form.sort"
            label="name"
            :reduce="(type) => type.value"
            :options="sortTypes"
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
import SelectInstituicao from "@/components/SelectInstituicao.vue";
import SelectContrato from "@/components/SelectContrato";
import ENV from "./../../common/env";
import useReport from "@/common/mixins/useReport.js";
export default {
  components: { SelectInstituicao, SelectContrato },
  mixins: [useReport],
  data: () => ({
    currentDate: new Date(),
    form: {
      sort: "asc",
      order: "CAST(fichas.numero as UNSIGNED)",
      type: "analitico",
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" },
    ],
    orderBy: [
      { name: "Número da Ficha", value: "CAST(fichas.numero as UNSIGNED)" },
      { name: "Nome do aluno", value: "pessoa_alunos.nome" },
    ],
    sortTypes: [
      { name: "Crescente", value: "asc" },
      { name: "Decrescente", value: "desc" },
    ],
  }),
  methods: {
    async openReport() {
      if (this.form.contrato == null || this.form.contrato == undefined) {
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
    this.route = "relatorioFichasContrato";
  },
};
</script>
