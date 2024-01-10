<template>
  <vs-card>
    <div class="w-full flex flex-wrap justify-start">
      <div class="pt-3 flex pl-2 flex-wrap">
        <vs-button
          class="float-left"
          color="success"
          icon="arrow_back_ios"
          @click="() => $router.back()"
          type="flat"
        ></vs-button>
      </div>
      <div class="font-semibold text-lg pl-4 mb-2 mt-5">
        Anexos do serviço {{ this.$route.params.id }}
      </div>
    </div>
    <TableSSR
      title="Mídias da OS"
      route="ficha-midias"
      :search="true"
      :key="tableKey"
      :customInit="`order=id&sort=desc&os=${$route.params.id}`"
      :customSearch="`order=id&sort=desc&os=${$route.params.id}`"
      :customPageChange="`order=id&sort=desc&os=${$route.params.id}`"
      v-if="hasAccess('show')"
    >
      <template slot="head">
        <vs-th sort-key="id">#</vs-th>
        <vs-th sort-key="id_venda">Imagem</vs-th>
        <vs-th>Ações</vs-th>
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id" style="width: 90px;">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].url">
            {{ data[indextr].tipo }}
          </vs-td>

          <vs-td :data="data[indextr].id" style="width: 90px;">
            <vs-button
              icon="image"
              type="flat"
              @click="openImage(data[indextr].url)"
              color="primary"
              >Visualizar</vs-button
            >
          </vs-td>
        </vs-tr>
      </template>
    </TableSSR>
  </vs-card>
</template>

<script>
import useRule from "@/common/mixins/useRule.js";
import ENV from "./../../common/env";
import useData from "@/common/mixins/useData";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useRule, useData],
  components: { TableSSR },
  data: () => ({
    tableKey: 0,
    midias: []
  }),
  methods: {
    async openImage(url) {
      window.open(url, "_blank");
    }
  },
  async mounted() {
    this.route = "relatorioServicos";
  }
};
</script>
