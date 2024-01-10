<template>
  <div>
    <div class="vs-list--title ml-5 mb-2 mt-2">Contatos</div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <div class="w-full md:w-2/12 mt-0">
          <SelectTipoContato
            style="z-index: 100;"
            @update="val => setValue('id_tipo_contato', val)"
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
        :title="getNomeByContato(ctt)"
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
  props: ["contatosData", "pessoa", "instituicao"],
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
      console.log(ctt);
      console.log(this.contatos);
      if (
        (this.pessoa != null && this.pessoa != undefined) ||
        (this.instituicao != null && this.instituicao != undefined)
      ) {
        const res = await this.updateData("contatos/" + ctt.id, { status: 0 });
        if (res != null) {
          this.contatos.splice(idx, 1);
          this.$emit("remove", idx);
          this.cttListKey++;
        }
      } else {
        console.log(idx);
        this.contatos.splice(idx, 1);
        this.$emit("remove", idx);
        this.cttListKey++;
      }
      console.log(this.contatos);
    },
    async add() {
      this.validate();
      if (this.pessoa != null && this.pessoa != undefined) {
        if (!this.hasError) {
          const res = await this.createData("contatos", {
            ...this.form,
            id_pessoa: this.pessoa.id
          });
          console.log(res);
          if (res != null) {
            this.contatos.push(res);
            this.form = {
              id_tipo_contato: null,
              id_pessoa: null
            };
          }
        }
      } else if (this.instituicao != null && this.instituicao != undefined) {
        if (!this.hasError) {
          const res = await this.createData("contatos", {
            ...this.form,
            id_instituicao: this.instituicao.id
          });
          console.log(res);
          if (res != null) {
            this.contatos.push(res);
            this.form = {
              id_tipo_contato: null,
              id_pessoa: null
            };
          }
        }
      } else {
        this.$emit("add", this.form);
        this.contatos.push(this.form);
        this.form = {
          id_tipo_contato: null,
          id_pessoa: null
        };
      }
      this.cttListKey++;
    },

    validate() {
      this.getMaskContato();
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
    async fetchTipoContatos() {
      const res = await this.fetchData("tipos/contatos");
      if (res != null) this.tipoContatos = res;
    },
    getMaskContato() {
      const tipo = this.tipoContatos.find(
        x => x.id == this.form.id_tipo_contato
      );
      if (this.isValidValue(tipo)) {
        switch (tipo.nome) {
          case "TELEFONE":
            this.maskContato = "(##) ####-####";
            break;
          case "CELULAR":
            this.maskContato = "(##) #####-####";
            break;
          case "WHATSAPP":
            this.maskContato = "(##) #####-####";
            break;
          case "EMAIL":
            this.maskContato = "";
            break;
          default:
            this.maskContato = "";
            break;
        }
        this.$forceUpdate();
      }
    },
    getNomeByContato(ctt) {
      const res = this.tipoContatos.find(x => x.id == ctt.id_tipo_contato);
      if (res == undefined || res == null) return "";
      return res.nome;
    }
  },
  computed: {
    contatos: function() {
      return this.contatosData != null ? this.contatosData : [];
    }
  }
};
</script>

<style></style>
