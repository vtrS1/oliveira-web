<template>
  <div>
    <div class="vs-list--title ml-5 mb-2 mt-2">Contatos</div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <div class="w-full md:w-2/12 mt-0">
          <SelectTipoContato
            @update="val => setValue('id_tipo_contato', val)"
            @mask="val => (maskContato = val)"
          />
        </div>
        <!-- @change="validate" -->
        <vs-input
          label-placeholder="Contato"
          class="w-full md:w-9/12 mt-5 pt-1 sm:pl-2"
          v-model="form.contato"
          :danger="errors.contato"
          v-on:keyup="validate"
          v-mask="maskContato"
          danger-text="Digite um contato válido"
        />
        <vs-tooltip
          text="Adicionar contato"
          class="w-full md:w-1/12 md:pl-4 mt-5 pt-1"
        >
          <vs-button
            icon="add"
            color="success"
            class="w-full"
            @click="add()"
          ></vs-button>
        </vs-tooltip>
      </div>
    </form>
    <vs-list class="px-3" :key="cttListKey">
      <vs-list-item
        v-for="(ctt, idx) in contatos"
        :title="
          ctt.tipoContato && ctt.tipoContato.nome ? ctt.tipoContato.nome : ''
        "
        :subtitle="ctt.contato"
        :key="idx"
      >
        <vs-tooltip text="Remover contato"
          ><vs-button
            @click="remove(idx, ctt)"
            icon="remove_circle"
            color="danger"
          >
          </vs-button>
        </vs-tooltip>
      </vs-list-item>
    </vs-list>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import SelectTipoContato from "@/components/SelectTipoContato";
export default {
  mixins: [useHTTP, Validators],
  props: ["contatosData", "instituicao"],
  components: { SelectTipoContato },
  data: () => ({
    form: {},
    tipoContatos: [],
    hasError: false,
    errors: {},
    maskContato: "",
    cttListKey: 0
  }),
  methods: {
    close() {
      this.$emit("close", true);
    },
    async remove(idx, ctt) {
      if (this.instituicao != null && this.instituicao != undefined) {
        const res = await this.updateData("contatos/" + ctt.id, { status: 0 });
        if (res != null) {
          this.contatos.splice(idx, 1);
          this.$emit("remove", idx);
          this.cttListKey++;
        }
      } else {
        this.contatos.splice(idx, 1);
        this.$emit("remove", idx);
        this.cttListKey++;
      }
    },
    async add() {
      this.validate();

      const res = await this.createData("contatos", {
        ...this.form,
        id_instituicao: this.instituicao.id
      });

      if (res != null) {
        this.contatos.push(res);
        this.form = {
          id_tipo_contato: null
        };
      }

      this.cttListKey++;
    },
    validate() {
      if (
        this.form.id_tipo_contato == undefined ||
        this.form.contato == undefined
      ) {
        this.hasError = true;
        if (this.form.id_tipo_contato == undefined) {
          this.errors.id_tipo_contato = true;
        } else this.errors.id_tipo_contato = false;
        if (this.form.contato == undefined) {
          this.errors.contato = true;
        } else this.errors.contato = false;
      } else {
        this.errors.contato = false;
        this.errors.id_tipo_contato = false;
        this.hasError = false;
      }
      this.$forceUpdate();
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
      this.validate();
    },
    getNomeByContato(ctt) {
      const res = this.tipoContatos.find(x => x.id == ctt.id_tipo_contato);
      if (res == undefined || res == null) return "";
      return res.nome;
    }
  },
  computed: {
    contatos: function() {
      return this.contatosData != null && this.contatosData != undefined
        ? this.contatosData
        : [];
    }
  }
};
</script>

<style></style>
