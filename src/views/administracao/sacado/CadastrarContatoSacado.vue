<template>
  <div>
    <div class="vs-list--title text-xl ml-5 mb-2 mt-2">Contatos</div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <div class="w-3/12 mt-1">
          <SelectTipoContato
            @update="val => setValue('id_tipo_contato', val)"
            @nome="val => setValue('nome', val)"
            @mask="val => (maskContato = val)"
          />
        </div>

        <vs-input
          label-placeholder="Contato"
          class="w-8/12 pl-2 pr-2 mt-8"
          v-model="form.contato"
          v-mask="maskContato"
        />

        <vs-tooltip text="Adicionar contato" class="w-1/12 mt-8">
          <vs-button
            v-if="hasAccess('update')"
            icon="add"
            color="success"
            class="w-full"
            @click="add()"
          ></vs-button>
        </vs-tooltip>
      </div>
    </form>
    <ListarContato :contatos="contatos" @remove="remove" />
  </div>
</template>

<script>
import ListarContato from "./ListarContato";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
import useRule from "@/common/mixins/useRule.js";
import SelectTipoContato from "@/components/SelectTipoContato";

export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive, Validators],
  components: {
    ListarContato,
    SelectTipoContato
  },
  props: ["id_sacado", "contatos"],
  data: () => ({
    form: {
      id_tipo_contato: null,
      contato: null,
      tipoContato: {}
    },
    cttListKey: 1,
    errors: {},
    hasError: false,
    maskContato: ""
  }),
  methods: {
    async add() {
      if (this.id_sacado != undefined) {
        this.form.id_sacado = this.id_sacado;
        const res = await this.createData("contatos", this.form);
        if (res != null) {
          this.form = {
            id_tipo_contato: null,
            contato: null,
            tipoContato: {}
          };
          this.$emit("update");
        }
      } else {
        this.form.tipoContato.nome = this.form.nome;
        this.$emit("update", this.form);
        // this.contatos.push(this.form);
        this.form = {
          id_tipo_contato: null,
          id_sacado: null,
          contato: null,
          tipoContato: {}
        };
      }
    },
    async remove(id) {
      if (this.id_sacado != undefined) {
        await this.updateData("contatos/" + id, { status: false });
        this.cttListKey++;
      } else {
        this.contatos.splice(id, 1);
        this.cttListKey++;
      }
      this.$emit("update");
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  async mounted() {
    this.route = "sacado";
  }
};
</script>

<style></style>
