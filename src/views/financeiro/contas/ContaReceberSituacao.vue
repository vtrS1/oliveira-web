<template>
  <div :key="tableKey">
    <vs-chip color="warning" v-if="venda == null"> - </vs-chip>
    <vs-chip color="warning" v-else-if="venda.status == 0">
      Desativada {{ venda.renegociada == 1 ? " | Renegociada" : " " }}
    </vs-chip>
    <vs-chip color="success" v-else-if="tudoPago">
      Finalizado {{ venda.renegociada == 1 ? " | Renegociada" : " " }}
    </vs-chip>
    <vs-chip color="danger" v-else-if="qtdAtrasada > 0">
      {{ qtdAtrasada + " Parcela(s) atrasada(s)" }}
      {{ venda.renegociada == 1 ? " | Renegociada" : " " }}
    </vs-chip>
    <vs-chip color="primary" v-else>
      Pagamento em dia
      {{ venda.renegociada == 1 ? " | Renegociada" : " " }}
    </vs-chip>
  </div>
</template>

<script>
import useData from "@/common/mixins/useData";
export default {
  mixins: [useData],
  props: { venda: { type: Object, default: null } },
  data: () => ({
    tableKey: 0,
    qtdPago: null,
    qtdAtrasada: null,
    tudoPago: false,
  }),
  mounted() {
    if (this.venda != null) {
      const parcelas = this.venda.parcelas.filter((x) => x.status != 0);
      this.qtdPago = parcelas.filter((q) => q.status == 2).length;
      this.qtdAtrasada = parcelas.filter(
        (q) => q.status == 1 && this.diffDates(q.data_vencimento, new Date()) < 0
      ).length;
      if (parcelas.length == this.qtdPago) {
        this.tudoPago = true;
      }
      this.tableKey++;
      this.$forceUpdate();
    }
  },
};
</script>
