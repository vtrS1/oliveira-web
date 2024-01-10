<template>
  <div class="w-full">
    <vs-card>
      <div slot="header" class="flex flex-wrap justify-between">
        <p>{{ title }}</p>
        <div class="w-min flex flex-wrap">
          <vs-tooltip text="Ver detalhes dessa pessoa">
            <vs-button class="mr-2" size="small" @click="$emit('detail')">
              Detalhes</vs-button
            ><span></span>
          </vs-tooltip>
        </div>
      </div>
      <vs-list>
        <vs-list-item
          :title="`Estado`"
          :subtitle="`${endereco.estado != null ? endereco.estado.nome : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`Cidade`"
          :subtitle="`${endereco.cidade != null ? endereco.cidade.nome : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`Bairro`"
          :subtitle="`${endereco.bairro != null ? endereco.bairro.nome : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`CEP`"
          :subtitle="`${endereco.cep != null ? endereco.cep : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`Logradouro`"
          :subtitle="`${endereco.logradouro != null ? endereco.logradouro : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`Complemento`"
          :subtitle="`${endereco.complemento != null ? endereco.complemento : ''}`"
        >
        </vs-list-item>
        <vs-list-item
          :title="`Número`"
          :subtitle="`${endereco.numero != null ? endereco.numero : ''}`"
        >
        </vs-list-item>
      </vs-list>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "Endereço" },
    endereco: { type: Object, required: true },
  },
  data: () => ({}),
};
</script>
