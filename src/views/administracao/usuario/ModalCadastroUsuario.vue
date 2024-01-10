<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalState = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="modalState = false"
      @accept="cadastrar"
      @close="modalState = false"
      :active.sync="modalState"
      title="Cadastar usuário"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8" ref="form">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome *"
            v-model="form.nome"
            class="w-full md:1/3 mt-6"
          />
          <vs-input
            label-placeholder="Email / usuário *"
            v-model="form.email"
            class="w-full md:1/3 mt-8"
          />
          <vs-input
            label-placeholder="Senha *"
            v-model="form.senha"
            class="w-full md:1/3 mt-8"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-full md:w-2/12 pl-2"
            v-model="form.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-full md:w-4/12 pl-2 mt-5 pt-1"
            v-mask="'###.###.###-##'"
            v-model="form.cpf"
          />
          <vs-input
            label-placeholder="RG"
            class="w-full md:w-3/12 pl-2 mt-5 pt-1"
            v-mask="'###########'"
            v-model="form.rg"
          />

          <vs-input
            label-placeholder="CEP"
            class="w-full md:w-3/12 pl-2 mt-5 pt-1"
            v-model="form.cep"
            v-mask="'#####-###'"
            @change="consultar"
          />

          <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
            <SelectEstado @update="val => setValue('id_estado', val)" />
          </div>
          <div class="w-full md:w-4/12 pl-2 mt-2 my-2">
            <SelectCidade
              :estado="form.id_estado"
              @update="val => setValue('id_cidade', val)"
            />
          </div>
          <div class="w-full md:w-4/12 pl-2 mt-2 my-2 ">
            <SelectBairro
              :cidade="form.id_cidade"
              @update="val => setValue('id_bairro', val)"
            />
          </div>

          <vs-input
            label-placeholder="Logradouro"
            class="w-full md:w-6/12 pl-2"
            @change="$forceUpdate()"
            v-model="form.logradouro"
          />

          <vs-input
            label-placeholder="Número"
            class="w-full md:w-1/12 pr-2 pl-2"
            v-model="form.numero"
          />
          <vs-input
            label-placeholder="Complemento"
            class="w-full md:w-5/12"
            v-model="form.complemento"
          />

          <div class="w-full mt-0 my-2">
            <SelectVendedor
              title="Vendedor associado (Opcional)"
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
import permissionsScheme from "@/common/permissions";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
import Validators from "../../../common/mixins/Validators";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectVendedor, SelectEstado, SelectCidade, SelectBairro },
  data: () => ({
    form: {},
    modalState: false
  }),
  methods: {
    async cadastrar() {
      const res = await this.createData("usuarios", this.form);
      if (res != null) {
        const perm = [];
        permissionsScheme.forEach(x => {
          const actions = {
            value: x.value,
            create: true,
            update: true,
            view: true,
            disable: true,
            renegociar: false,
            remessa: false,
            retorno: false,
            quitar: false
          };
          perm.push(actions);
        });

        await this.updateData("usuarios/permissoes/" + res.id, {
          permissoes: perm
        });

        this.modalState = false;
        this.form = {};
        this.$emit("update");
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
    async consultar() {
      const data = await this.consultarCep(this.form.cep);
      if (data != null) Object.assign(this.form, data);
      this.$forceUpdate();
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
