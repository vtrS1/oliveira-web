<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">Becas</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-7/12 pr-2 mt-0 my-2">
          <SelectContrato @update="(val) => setValue('contrato', val)"></SelectContrato>
        </div>

        <div class="w-full md:w-3/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo (Opcional)</label>
          <v-select
            class="w-full"
            :disabled="hasAccess('analitico') ? false : true"
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
import SelectInstituicao from "@/components/SelectInstituicao.vue";
import SelectContrato from "@/components/SelectContrato";
import ENV from "./../../common/env";
import useRule from "@/common/mixins/useRule.js";
import useReport from "@/common/mixins/useReport.js";
import HTTP from "@/common/http.js";
export default {
  components: { SelectInstituicao, SelectContrato },
  mixins: [useRule, useReport],
  data: () => ({
    currentDate: new Date(),
    form: {
      sort: "asc",
      order: "id",
      type: "sintetico",
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" },
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
    this.route = "relatorioBecas";
    this.currentDate = new Date();
  },
};
</script>
