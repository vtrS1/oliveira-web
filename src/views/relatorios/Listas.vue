<template>
  <div class="">
    <vx-card>
      <h3 class="ml-3">Lista</h3>
      <div class="flex vx-row w-full p-6">
        <div class="w-full md:w-2/12 pr-2 mt-0 my-2">
          <SelectLista @update="val => setValue('lista', val)"></SelectLista>
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
          <label class="text-sm">Situação</label>
          <v-select
            class="w-full"
            v-model="form.situacao"
            label="name"
            :reduce="type => type.value"
            :options="situacoes"
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
import SelectLista from "../../components/SelectLista.vue";
import useReport from "@/common/mixins/useReport.js";
export default {
  components: { SelectLista },
  mixins: [useReport],
  data: () => ({
    currentDate: new Date(),
    form: {
      sort: "asc",
      order: "CAST(fichas.numero as UNSIGNED)",
      type: "analitico",
      contratos: true,
      situacao: "all"
    },
    types: [
      { name: "Analítico", value: "analitico" },
      { name: "Sintético", value: "sintetico" }
    ],
    orderBy: [
      { name: "Número da Ficha", value: "CAST(fichas.numero as UNSIGNED)" },
      { name: "Nome do aluno", value: "pessoa_alunos.nome" }
    ],
    sortTypes: [
      { name: "Crescente", value: "asc" },
      { name: "Decrescente", value: "desc" }
    ],
    situacoes: [
      { name: "Todos", value: "all" },
      { name: "Vendida", value: "Vendida" },
      { name: "Recusado", value: "Recusado" },
      { name: "Retorno", value: "Retorno" },
      { name: "Outro", value: "Outro" },
      { name: "Em Aberto", value: "Em Aberto" }
    ]
  }),
  methods: {
    async openReport() {
      let formData = { ...this.form };
      if (formData.situacao === "all") {
        delete formData.situacao;
      }
      if (formData.lista == null || formData.lista == undefined) {
        this.$vs.notify({
          title: "Atenção",
          text: "Preencha todos os campos obrigatórios",
          position: "bottom-right",
          color: "warning"
        });
        return;
      } else {
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
    this.route = "relatorioLista";
  }
};
</script>
