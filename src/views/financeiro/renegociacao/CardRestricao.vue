<template>
  <vx-card :class="`max-h-full ${restricoes.length == 0 ? 'bg-success' : 'bg-danger'}`">
    <div>
      <p class="text-white">{{ title }}</p>
    </div>
    <div class="w-full">
      <vs-list class="px-3">
        <vs-list-item
          v-if="restricoes.length == 0"
          title="Sacado sem restrições"
          class="rounded-lg text-white py-2 pl-2"
        >
          <vs-button
            @click="toDetailNegativado()"
            icon="check_circle"
            type="flat"
            color="dark"
          ></vs-button>
        </vs-list-item>
        <vs-list-item
          v-else
          title="Sacado com restrições"
          class="rounded-lg text-white pl-2"
        >
          <vs-tooltip title="Ver restrições do sacado">
            <vs-button
              icon="chevron_right"
              @click="toDetailNegativado()"
              type="flat"
              color="white"
            ></vs-button>
            <span></span>
          </vs-tooltip>
        </vs-list-item>
      </vs-list>
    </div>
  </vx-card>
</template>

<script>
import useUtils from "@/common/mixins/useUtils";
import useData from "@/common/mixins/useData";
export default {
  props: {
    title: { type: String, default: "Restrições" },
    idSacado: { type: Number, required: true },
  },
  mixins: [useUtils, useData],
  data: () => ({
    restricoes: [],
  }),
  methods: {
    async _fetchRestricoesByIdSacado() {
      this.restricoes = await this.fetchRestricoesByIdSacado(true, this.idSacado, "");
    },
    toDetailNegativado() {
      this.$router
        .push({
          path: "/financeiro/inadimplentes?idSacado=" + this.idSacado,
        })
        .catch(() => {});
    },
  },
  async mounted() {
    await this._fetchRestricoesByIdSacado();
  },
};
</script>
