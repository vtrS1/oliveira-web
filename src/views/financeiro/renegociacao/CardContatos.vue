<template>
  <div class="w-full">
    <vs-card>
      <div slot="header">
        <p>{{ title }}</p>
      </div>
      <vs-list>
        <vs-list-item
          v-if="contatos != null && contatos != undefined"
          v-for="(ctt, idx) in contatos"
          :key="`${ctt.id}-ctt`"
          :title="`${ctt.tipoContato.nome != null ? ctt.tipoContato.nome : ''} - ${
            ctt.pessoa != null ? ctt.pessoa : ''
          }`"
          :subtitle="`${ctt.contato}`"
        >
        </vs-list-item>
      </vs-list>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "Contatos" },
    contatos: { type: Array },
  },
  data: () => ({}),
};
</script>
