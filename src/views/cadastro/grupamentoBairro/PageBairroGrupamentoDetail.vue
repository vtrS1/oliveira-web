<template>
  <vs-card>
    <div class="w-full flex flex-wrap justify-between">
      <div class="pt-3 flex pl-2 flex-wrap">
        <vs-button
          class="float-left mt-3"
          color="success"
          icon="arrow_back_ios"
          @click="() => $router.back()"
          type="flat"
        ></vs-button>
        <vs-breadcrumb align="left">
          <div class="vs-list--title text-xl mb-2 mt-2">
            {{ grupamentoDetalhes.nome }}
          </div>
        </vs-breadcrumb>
      </div>
      <div class="pt-3 pr-5">
        <vs-button
          class="float-right"
          @click="update"
          color="success"
          icon="done"
          >Atualizar</vs-button
        >
      </div>
    </div>
    <form class="ml-8">
      <div class="flex vx-row w-full">
        <vs-input
          label-placeholder="Nome"
          class="w-full"
          v-model="grupamentoDetalhes.nome"
        />
      </div>
      <div class="flex vx-row w-full">
        <div class="w-full md:w-3/12  my-6">
          <SelectEstado
            :initialId="grupamentoDetalhes.cidade.id_estado"
            :disabled="true"
          />
        </div>
        <div class="w-full md:w-3/12  my-6 pl-2">
          <SelectCidade
            :initialId="grupamentoDetalhes.id_cidade"
            :disabled="true"
          />
        </div>
        <div class="w-full md:w-5/12  my-6 pl-2">
          <SelectBairro
            :cidade="grupamentoDetalhes.id_cidade"
            @update="val => setValue('id_bairro', val)"
          />
        </div>

        <div class="w-full md:w-1/12  my-6  pl-2 float-right">
          <vs-tooltip text="Adicionar bairro do grupamento"
            ><vs-button
              class="float-righ w-full mt-5"
              icon="add_circle"
              color="success"
              @click="addToList"
            ></vs-button>
          </vs-tooltip>
        </div>
      </div>
      <vs-list class="px-3">
        <vs-list-item
          v-for="(ctt, idx) in grupamentoDetalhes.bairros"
          :title="ctt.nome"
          :key="idx"
        >
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <vs-button
              v-if="ctt.status"
              icon="delete"
              color="danger"
              type="flat"
              size="large"
              @click="desactiveBairroGrupo(ctt)"
            ></vs-button>
          </vs-col>
        </vs-list-item>
      </vs-list>
    </form>
  </vs-card>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import PromptActiveDesactive from "../../../common/mixins/PromptActiveDesactive";
import SelectEstado from "@/components/SelectEstado";
import SelectCidade from "@/components/SelectCidade";
import SelectBairro from "@/components/SelectBairro";

export default {
  mixins: [useHTTP, useData, Validators, PromptActiveDesactive],
  components: { SelectEstado, SelectCidade, SelectBairro },
  data: () => ({
    errors: [],
    form: {},
    grupamentoDetalhes: {}
  }),
  methods: {
    async update() {
      await this.updateData(
        `enderecos/bairro_grupamentos/${this.$route.params.id}`,
        this.grupamentoDetalhes
      );
    },
    async addToList() {
      if (this.form.id_bairro != undefined && this.form.id_bairro != null) {
        const exist = this.grupamentoDetalhes.bairros.filter(
          x => x.id == this.form.id_bairro
        );
        if (exist.length == 0) {
          await this.createData("enderecos/bairro_grupos", {
            ...this.form,
            id_bairro_grupamento: this.$route.params.id
          });
          await this.fetchDetailGrupamento();
        }
      }
    },
    async fetchDetailGrupamento() {
      const res = await this.fetchBairroGrupamentoById(
        true,
        this.$route.params.id,
        "bairro=1&cidade=1"
      );
      if (res != null) {
        this.grupamentoDetalhes = res;
      }
    },
    async desactiveBairroGrupo(item) {
      await this.deleteData(
        `enderecos/bairro_grupos/grupamento/${this.$route.params.id}/${item.id}`
      );
      await this.fetchDetailGrupamento();
    },
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    }
  },
  async mounted() {
    await this.fetchDetailGrupamento();
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
