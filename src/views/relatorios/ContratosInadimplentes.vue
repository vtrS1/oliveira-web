<template>
  <div>
    <vx-card v-if="hasAccess('show')">
      <h3 class="ml-3">Inadimplentes por contrato</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo</label>
          <v-select
            class="w-full"
            v-model="form.type"
            label="name"
            :reduce="type => type.value"
            :options="types"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordernar por</label>
          <v-select
            class="w-full"
            v-model="form.order"
            label="name"
            :reduce="type => type.value"
            :options="orderBy"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordem</label>
          <v-select
            class="w-full"
            v-model="form.sort"
            label="name"
            :reduce="type => type.value"
            :options="sortTypes"
          ></v-select>
        </div>
        <div class="w-full md:w-4/12 pr-2 mt-0 my-2">
          <SelectContrato @update="val => setValue('contrato', val)" />
        </div>
        <div class="w-full md:w-2/12 pt-6">
          <vs-button class="float-right w-full" @click="openReport()"
            >Gerar relatório</vs-button
          >
        </div>
      </div>
    </vx-card>
    <vx-card class="mt-5" v-if="hasAccess('show')">
      <h3 class="ml-3">Inadimplentes por período</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Tipo</label>
          <v-select
            class="w-full"
            v-model="form.type"
            label="name"
            :reduce="type => type.value"
            :options="types"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordernar por</label>
          <v-select
            class="w-full"
            v-model="form.order"
            label="name"
            :reduce="type => type.value"
            :options="orderBy"
          ></v-select>
        </div>
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <label class="text-sm">Ordem</label>
          <v-select
            class="w-full"
            v-model="form.sort"
            label="name"
            :reduce="type => type.value"
            :options="sortTypes"
          ></v-select>
        </div>

        <vs-input
          label="Data incial *"
          class="w-full md:w-2/12 pr-2 pt-1 mt-0"
          v-model="form.dataInicial"
          type="date"
        />
        <vs-input
          label="Data final *"
          class="w-full md:w-2/12 pr-2 pt-1 mt-0"
          v-model="form.dataFinal"
          type="date"
        />

        <div class="w-full md:w-2/12 pt-6">
          <vs-button class="float-right w-full" @click="openReportInterval()"
            >Gerar relatório</vs-button
          >
        </div>
      </div>
    </vx-card>
    <p
      v-if="!hasAccess('show')"
      class="text-center py-10 font-semibold text-xl"
    >
      Uma permissão é necessária para acessar este conteúdo
    </p>
  </div>
</template>

<script>
import SelectInstituicao from "@/components/SelectInstituicao.vue";
import SelectContrato from "@/components/SelectContrato";
import useReport from "@/common/mixins/useReport.js";
import useRule from "../../common/mixins/useRule";
export default {
  components: { SelectInstituicao, SelectContrato },
  mixins: [useReport, useRule],
  data: () => ({
    currentDate: new Date(),
    form: {
      sort: "asc",
      order: "CAST(fichas.numero as UNSIGNED)",
      type: "sintetico",
      dataInicial: null,
      dataFinal: null
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" }
    ],
    orderBy: [
      { name: "Número da Ficha", value: "CAST(fichas.numero as UNSIGNED)" },
      { name: "Nome do aluno", value: "pessoa_alunos.nome" },
      { name: "Nome do sacado", value: "pessoa_sacados.nome" },
      { name: "CPF do sacado", value: "pessoa_sacados.cpf" }
    ],
    sortTypes: [
      { name: "Crescente", value: "asc" },
      { name: "Decrescente", value: "desc" }
    ]
  }),
  methods: {
    async openReport() {
      const formData = { ...this.form };
      delete formData.dataInicial;
      delete formData.dataFinal;
      await this.generateReport(this.route, formData);
    },
    async openReportInterval() {
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
        const formData = { ...this.form };
        delete formData.contrato;
        await this.generateReport(this.route, formData);
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  mounted() {
    this.currentDate = new Date();
    this.route = "relatorioVendasInadimplentes";
  }
};
</script>
