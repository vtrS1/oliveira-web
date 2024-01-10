<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">Contas a receber</h3>
      <div class="flex vx-row w-full p-6">
        <vs-input
          label="Data incial"
          class="w-full md:w-2/12 pr-2 pt-1 mt-0"
          v-model="form.dataInicial"
          type="date"
        />
        <vs-input
          label="Data final"
          class="w-full md:w-2/12 pr-2 pt-1 mt-0"
          v-model="form.dataFinal"
          type="date"
        />
        <div class="w-full md:w-3/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo</label>
          <v-select
            class="w-full"
            v-model="form.type"
            label="name"
            :reduce="type => type.value"
            :options="types"
          ></v-select>
        </div>
        <div class="w-full md:w-3/12 pr-2 mt-0 my-2">
          <label class="text-sm">Exibição</label>
          <v-select
            class="w-full"
            v-model="form.compact"
            label="name"
            :reduce="type => type.value"
            :options="exibicoes"
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
      order: "id",
      type: "analitico",
      compact: false
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" }
    ],
    exibicoes: [
      { name: "Normal", value: false },
      { name: "Compacto", value: true }
    ]
  }),
  methods: {
    async openReport() {
      if (
        this.form.dataFinal == null ||
        this.form.dataFinal == undefined ||
        this.form.dataInicial == null ||
        this.form.dataInicial == undefined
      ) {
        this.$vs.notify({
          title: "Atenção",
          text: "Preencha todos os campos obrigatórios",
          position: "bottom-right",
          color: "warning"
        });
        return;
      } else {
        await this.generateReport(this.route, this.form);
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  mounted() {
    this.currentDate = new Date();
    this.route = "relatorioContasReceber";
  }
};
</script>
