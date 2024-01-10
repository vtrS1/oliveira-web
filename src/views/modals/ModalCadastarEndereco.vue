<template>
  <div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <vs-input
          label-placeholder="CEP"
          class="w-1/5 mt-8"
          v-model="form.cep"
        />
        <vs-select
          class="w-2/5 mt-2 pl-2"
          v-model="form.id_estado"
          label="Estado"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in gestores"
          />
        </vs-select>
        <vs-select
          class="w-2/5 mt-2 pl-2"
          v-model="form.id_cidade"
          label="Cidade"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in gestores"
          />
        </vs-select>
        <vs-select class="w-full mt-2" v-model="form.id_bairro" label="Bairro">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in gestores"
          />
        </vs-select>
        <vs-input
          label-placeholder="Endereço"
          class="w-full mt-8"
          v-model="form.endereco"
        />

        <vs-input
          label-placeholder="Complemento"
          class="w-10/12 mt-8 pr-2"
          v-model="form.complemento"
        />

        <vs-input
          label-placeholder="Número"
          class="w-2/12 mt-8"
          v-model="form.numero"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {},
    gestores: [
      { text: "Gestor 1", value: 0 },
      { text: "Gestor 2", value: 1 },
      { text: "Gestor 3", value: 2 }
    ]
  }),
  methods: {
    close() {
      this.$emit("close", true);
    },
    cadastrar() {
      this.close();
      console.log(this.form);
    }
  }
};
</script>

<style></style>
