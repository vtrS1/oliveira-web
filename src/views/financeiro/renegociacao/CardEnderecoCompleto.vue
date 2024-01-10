<template>
  <div class="w-full">
    <vs-card>
      <div slot="header" class="flex flex-wrap justify-between">
        <p>{{ title }}</p>
      </div>
      <div class="w-full pb-4" v-if="enderecoSacado != null">
        <p>
          {{ enderecoSacado.estado != null ? enderecoSacado.estado.nome : "" }}
          {{ enderecoSacado.cidade != null ? " - " + enderecoSacado.cidade.nome : "" }}
          {{ enderecoSacado.bairro != null ? " - " + enderecoSacado.bairro.nome : "" }}
          {{ enderecoSacado.cep != null ? " - " + enderecoSacado.cep : "" }}
          {{ enderecoSacado.logradouro != null ? " - " + enderecoSacado.logradouro : "" }}
          {{
            enderecoSacado.complemento != null ? " - " + enderecoSacado.complemento : ""
          }}
          {{ enderecoSacado.numero != null ? " - " + enderecoSacado.numero : "" }}
        </p>
      </div>
      <div class="w-full" v-if="enderecoAluno != null">
        <p>
          {{ enderecoAluno.estado != null ? enderecoAluno.estado.nome : "" }}
          {{ enderecoAluno.cidade != null ? " - " + enderecoAluno.cidade.nome : "" }}
          {{ enderecoAluno.bairro != null ? " - " + enderecoAluno.bairro.nome : "" }}
          {{ enderecoAluno.cep != null ? " - " + enderecoAluno.cep : "" }}
          {{ enderecoAluno.logradouro != null ? " - " + enderecoAluno.logradouro : "" }}
          {{ enderecoAluno.complemento != null ? " - " + enderecoAluno.complemento : "" }}
          {{ enderecoAluno.numero != null ? " - " + enderecoAluno.numero : "" }}
        </p>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "Endereços" },
    enderecoSacado: { type: Object, required: true },
    enderecoAluno: { type: Object, required: true },
  },
  data: () => ({}),
};
</script>
