<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="success"
      type="filled"
      @click="modalCadastroGrupamentoBairro = true"
      icon="add"
    ></vs-button>
    <vs-prompt
      @cancel="close"
      @accept="cadastrar"
      @close="close"
      :active.sync="modalCadastroGrupamentoBairro"
      title="Cadastar grupamento de bairros"
      accept-text="Cadastrar"
      cancel-text="Cancelar"
    >
      <form class="ml-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-full"
            v-model="form.nome"
          />
        </div>
        <div class="flex vx-row w-full">
          <div class="w-3/12 mt-0 my-2 pr-2">
            <SelectEstado @update="val => setValue('id_estado', val)" />
          </div>
          <div class="w-4/12 pr-2 mt-0 my-2">
            <SelectCidade
              :estado="form.id_estado"
              :key="form.id_estado"
              @update="val => setValue('id_cidade', val)"
            />
          </div>
          <div class="w-4/12  mt-0 my-2 ">
            <SelectBairro
              :cidade="form.id_cidade"
              @update="val => setValue('id_bairro', val)"
              @bairro="val => (bairro = val)"
            />
          </div>

          <div class="w-1/12  float-right">
            <vs-tooltip text="Adicionar bairro do grupamento"
              ><vs-button
                class="mt-5 float-right"
                icon="add_circle"
                color="success"
                @click="addToList"
              ></vs-button>
            </vs-tooltip>
          </div>
        </div>
      </form>

      <vs-list
        class="px-3"
        :key="'lstBairroGrupo-' + bairrosAdicionados.lenght"
      >
        <vs-list-item
          v-for="(ctt, idx) in bairrosAdicionados"
          :title="ctt.nome"
          :key="idx"
        >
          <vs-tooltip text="Remover bairro do grupamento"
            ><vs-button
              icon="remove_circle"
              color="danger"
              @click="removeFromList(idx)"
            >
            </vs-button>
          </vs-tooltip>
        </vs-list-item>
      </vs-list>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";
export default {
  mixins: [useHTTP, useData, Validators],
  components: { SelectEstado, SelectCidade, SelectBairro },
  data: () => ({
    form: {},
    errors: [],
    bairro: {},
    bairrosAdicionados: [],
    modalCadastroGrupamentoBairro: false
  }),
  methods: {
    close() {
      this.modalCadastroGrupamentoBairro = false;
      this.bairrosAdicionados = [];
    },
    async cadastrar() {
      const res = await this.createData("enderecos/bairro_grupamentos", {
        ...this.form,
        bairros: this.bairrosAdicionados
      });
      if (res != null) {
        this.close();
        this.$emit("update");
        this.form = {};
      }
    },
    addToList() {
      if (this.form.id_bairro != null && this.form.id_bairro != undefined) {
        const exist = this.bairrosAdicionados.filter(
          x => x.id == this.form.id_bairro
        );
        if (exist.length == 0) {
          this.bairrosAdicionados.push(this.bairro);
        }
      }
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
    removeFromList(idx) {
      this.bairrosAdicionados.splice(idx, 1);
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
