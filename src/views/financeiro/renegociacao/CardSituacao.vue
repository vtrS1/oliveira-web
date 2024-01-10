<template>
  <vs-card>
    <div slot="header">
      <p>{{ title }}</p>
    </div>
    <div class="w-full flex flex-wrap">
      <div class="w-full md:w-1/2">
        <vs-list>
          <vs-list-item
            title="Valor original da venda"
            :subtitle="`${formatMoneyBrasil(data.venda.valor_total)}`"
          >
          </vs-list-item>
          <vs-list-item
            title="Valor atrasado"
            :subtitle="`${formatMoneyBrasil(data.valorAtrasado)}`"
          >
          </vs-list-item>
          <vs-list-item
            title="Valor corrigido corrigido"
            :subtitle="`${formatMoneyBrasil(data.valorCorrigido)}`"
          >
          </vs-list-item>
          <vs-list-item
            title="Valor total corrigido"
            :subtitle="`${formatMoneyBrasil(data.valorRestante)}`"
          >
          </vs-list-item>
        </vs-list>
      </div>
      <div class="w-full md:w-1/2">
        <vs-list>
          <vs-list-item
            title="Valor multa"
            :subtitle="`${formatMoneyBrasil(data.valorMulta)}`"
          >
          </vs-list-item>
          <vs-list-item title="Valor base da multa" :subtitle="`${data.multa}%`">
          </vs-list-item>
          <vs-list-item title="Valor base do juros/dia" :subtitle="`${data.juros}%`">
          </vs-list-item>
          <vs-list-item
            title="Valor do juros"
            :subtitle="`${formatMoneyBrasil(data.valorJuros)}`"
          >
          </vs-list-item>
        </vs-list>
      </div>
    </div>
  </vs-card>
</template>

<script>
import useUtils from "@/common/mixins/useUtils";
import useData from "@/common/mixins/useData";
export default {
  props: {
    title: { type: String, default: "Informações" },
    data: { type: Object, required: true },
  },
  mixins: [useUtils, useData],
  data: () => ({}),
};
</script>
