<template>
  <div>
    <div class="vs-list--title text-xl ml-5 mb-2 mt-2">Contatos</div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <div class="w-3/12 mt-3">
          <SelectTipoContato
            @update="val => setValue('id_tipo_contato', val)"
            @nome="val => setValue('nome', val)"
            @mask="val => (maskContato = val)"
          />
        </div>

        <vs-input
          label-placeholder="Pessoa"
          class="w-3/12 pl-2 pr-2 mt-8"
          v-model="form.pessoa"
        />

        <vs-input
          label-placeholder="Contato"
          class="w-5/12 pl-2 pr-2 mt-8"
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
  props: {
    id_aluno: { type: Number, default: undefined },
    contatosData: { type: Array, default: undefined }
  },
  data: () => ({
    form: {
      id_tipo_contato: null,
      contato: null,
      tipoContato: {}
    },
    cttListKey: 1,
    maskContato: ""
  }),
  methods: {
    async add() {
      if (this.id_aluno != undefined) {
        console.log("🙍 Cadastranco contato de aluno existente");
        this.form.id_aluno = this.id_aluno;
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
        console.log("⚠️ Cadastranco contato de aluno não cadastrado");
        this.$emit("update", this.form);
        this.form.tipoContato.nome = this.form.nome;
        this.form = {
          id_tipo_contato: null,
          id_aluno: null,
          contato: null,
          tipoContato: {}
        };
      }
    },
    async remove(id) {
      if (this.id_aluno != undefined) {
        await this.updateData("contatos/" + id, { status: false });
        this.$emit("update");
        this.cttListKey++;
      } else {
        this.contatos.splice(idx, 1);
        this.$emit("remove", id);

        this.cttListKey++;
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  async mounted() {
    this.route = "aluno";
  },
  computed: {
    contatos: function() {
      return this.contatosData != undefined ? this.contatosData : [];
    }
  }
};
</script>

<style></style>
