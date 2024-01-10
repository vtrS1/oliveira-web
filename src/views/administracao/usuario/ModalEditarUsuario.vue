<template>
  <div>
    <vs-button
      icon="mode_edit"
      type="flat"
      @click="modalState = true"
      color="primary"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="atualizar"
      @close="close"
      :active.sync="modalState"
      title="Editar usuário"
      accept-text="Atualizar"
      cancel-text="Cancelar"
    >
      <form class="ml-8 mb-3">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full md:w-1/3 pl-2 mt-6"
            v-model="usuarioEdit.nome"
          />
          <vs-input
            label-placeholder="Email / Usuário *"
            class="w-full pl-2 md:w-1/3 pr-2 mt-8"
            v-model="usuarioEdit.email"
            type="email"
          />
          <vs-input
            label-placeholder="Senha (Deixe em branco para não alterar a senha)"
            class="w-full md:w-1/3 pl-2 mt-8"
            v-model="usuarioEdit.senha"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-full md:w-2/12 pl-2"
            v-model="usuarioEdit.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-full md:w-4/12 pl-2 mt-5 pt-1"
            v-mask="'###.###.###-##'"
            v-model="usuarioEdit.cpf"
          />
          <vs-input
            label-placeholder="RG"
            class="w-full md:w-3/12 pl-2 mt-5 pt-1"
            v-mask="'###########'"
            v-model="usuarioEdit.rg"
          />

          <vs-input
            label-placeholder="CEP"
            class="w-full md:w-3/12 pl-2 mt-5 pt-1"
            v-model="usuarioEdit.cep"
            v-mask="'#####-###'"
            @change="consultar"
          />

          <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
            <SelectEstado
              @update="val => setValue('id_estado', val)"
              :initialId="usuarioEdit.id_estado"
            />
          </div>
          <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
            <SelectCidade
              :estado="usuarioEdit.id_estado"
              @update="val => setValue('id_cidade', val)"
              :initialId="usuarioEdit.id_cidade"
            />
          </div>
          <div class="w-full md:w-4/12 pl-2 mt-2 my-2 ">
            <SelectBairro
              :cidade="usuarioEdit.id_cidade"
              @update="val => setValue('id_bairro', val)"
              :initialId="usuarioEdit.id_bairro"
            />
          </div>

          <vs-input
            label-placeholder="Logradouro"
            class="w-full md:w-6/12 pl-2"
            @change="$forceUpdate()"
            v-model="usuarioEdit.logradouro"
          />

          <vs-input
            label-placeholder="Número"
            class="w-full md:w-1/12 pr-2 pl-2"
            v-model="usuarioEdit.numero"
          />
          <vs-input
            label-placeholder="Complemento"
            class="w-full md:w-5/12"
            v-model="usuarioEdit.complemento"
          />
          <div class="w-full  mt-0 pl-2">
            <SelectVendedor
              title="Vendedor associado (Opcional)"
              :initialId="usuarioEdit.id_vendedor"
              @update="val => setValue('id_vendedor', val)"
            />
          </div>
        </div>
      </form>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import SelectVendedor from "@/components/SelectVendedor";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
import Validators from "../../../common/mixins/Validators";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectVendedor, SelectEstado, SelectCidade, SelectBairro },
  props: ["usuario", "vendedores"],
  data: () => ({
    modalState: false
  }),
  methods: {
    close() {
      this.modalState = false;
    },
    async atualizar() {
      const res = await this.updateData(
        "usuarios/" + this.usuarioEdit.id,
        this.usuarioEdit
      );
      if (res != null) {
        this.modalState = false;
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.usuarioEdit[key] = value;
      this.$forceUpdate();
    },
    async consultar() {
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
    }
  },
  computed: {
    usuarioEdit: function() {
      if (this.usuario != undefined) return this.usuario;
      else return {};
    }
  },
  mounted() {
    if (this.usuarioEdit.data_nascimento != null)
      try {
        this.usuarioEdit.data_nascimento = this.formatDate(
          this.usuarioEdit.data_nascimento
        );

        console.log(this.usuarioEdit.data_nascimento);
      } catch (e) {
        console.error(e);
      }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
