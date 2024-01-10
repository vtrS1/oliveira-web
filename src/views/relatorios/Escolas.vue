<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">
        Escolas
      </h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <SelectInstituicao
            @update="val => setValue('id_instituicao', val)"
          ></SelectInstituicao>
        </div>

        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <SelectContrato
            title="Contrato (Opcional)"
            :instituicao="form.id_instituicao"
            @update="val => setValue('contrato', val)"
          ></SelectContrato>
        </div>

        <div class="w-full md:w-2/12 pr-2 pt-5  mt-0 my-2">
          <vs-checkbox v-model="form.contratos">Todos os contratos</vs-checkbox>
        </div>

        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo (opcional)</label>
          <v-select
            class="w-full"
            v-model="form.type"
            label="name"
            :reduce="type => type.value"
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
      contratos: true
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" }
    ]
  }),
  methods: {
    async openReport() {
      if (
        this.form.id_instituicao == null ||
        this.form.id_instituicao == undefined ||
        ((this.form.contrato == undefined || this.form.contrato == null) &&
          this.form.contratos == false)
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
    this.route = "relatorioEscolas";
  }
};
</script>
