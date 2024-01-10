<template>
  <vs-card>
    <div slot="header" class="flex flex-wrap justify-between">
      <p>{{ title }}</p>
      <div class="w-min flex flex-wrap">
        <vs-tooltip text="Ver essa conta no Contas a Receber">
          <vs-button class="mr-2" size="small" @click="toDetailVenda(idVenda)">
            Financeiro</vs-button
          ><span></span>
        </vs-tooltip>
        <vs-tooltip text="Ver os boletos dessa conta">
          <vs-button size="small" @click="toDetailBoletos(idVenda)" color="danger">
            Boletos</vs-button
          >
          <span></span>
        </vs-tooltip>
      </div>
    </div>
    <vs-list
      v-if="parcelas != null && parcelas != undefined"
      v-for="(p, idx) in parcelas"
      :key="`${p.id}-parcela`"
    >
      <vs-list-item
        :title="`Parcela ${p.parcela}`"
        :subtitle="`${formatMoneyBrasil(p.valor_parcela)}`"
      >
        <div class="flex flex-row w-full justify-end">
          <p class="mr-2">{{ formatDateBrasil(p.data_vencimento) }}</p>
          <vs-tooltip v-if="p.status == 2" text="Quitada">
            <vs-chip color="success"></vs-chip>
            <span></span>
          </vs-tooltip>
          <vs-tooltip
            v-else-if="p.status == 1 && diffDates(p.data_vencimento, new Date()) < 0"
            :text="p.situacao"
          >
            <vs-chip color="danger"> </vs-chip>
            <span></span>
          </vs-tooltip>
          <vs-tooltip v-else-if="p.status == 1" text="Em dia">
            <vs-chip color="primary"></vs-chip>
            <span></span>
          </vs-tooltip>
          <vs-tooltip v-else text="Desativada">
            <vs-chip></vs-chip>
            <span></span>
          </vs-tooltip>
        </div>
      </vs-list-item>
    </vs-list>
  </vs-card>
</template>

<script>
import useUtils from "@/common/mixins/useUtils";
import useData from "@/common/mixins/useData";
import crypto from "crypto";
export default {
  props: {
    title: { type: String, default: "Parcelas" },
    idVenda: { type: Number, default: null },
    parcelas: { type: Array },
  },
  mixins: [useUtils, useData],
  data: () => ({}),
  methods: {
    toDetailBoletos(id) {
      this.$router
        .push({
          path: "/financeiro/boletos/venda/" + id,
        })
        .catch(() => {});
    },
    toDetailVenda(id) {
      this.$router.push("/financeiro/contas/receber/" + id);
    },
  },
};
</script>
