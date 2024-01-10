<template>
  <vs-list class="px-3">
    <vs-list-item
      v-for="(ctt, idx) in contatos"
      :title="ctt.tipoContato.nome + ' - ' + ctt.pessoa"
      :subtitle="ctt.contato"
      :key="idx"
    >
      <!-- getContatoTitle(ctt) -->
      <vs-tooltip text="Remover contato"
        ><vs-button
          v-if="hasAccess('delete')"
          @click="remove(ctt.id != undefined ? ctt.id : idx)"
          icon="remove_circle"
          color="danger"
        >
        </vs-button>
      </vs-tooltip>
    </vs-list-item>
  </vs-list>
</template>

<script>
import useRule from "@/common/mixins/useRule.js";
export default {
  props: { contatos: Array },
  data: () => ({}),
  mixins: [useRule],
  methods: {
    async remove(idx) {
      this.$emit("remove", idx);
    }
  },
  mounted() {
    this.route = "aluno";
  }
};
</script>
