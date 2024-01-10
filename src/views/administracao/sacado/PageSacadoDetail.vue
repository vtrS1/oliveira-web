<template lang="html">
  <vs-card>
    <div v-if="loading == true">
      <p>Carregando...</p>
    </div>
    <div v-else>
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
              {{ sacadoDetail.nome }}
            </div>
          </vs-breadcrumb>
        </div>
        <div class="pt-3 pr-5">
          <vs-button
            class="float-right"
            @click="update"
            v-if="hasAccess('update')"
            color="success"
            icon="done"
            >Atualizar</vs-button
          >
        </div>
      </div>
      <form class="pl-8">
        <div class="flex vx-row w-full">
          <vs-input
            label-placeholder="Nome"
            class="w-6/12 pr-2 mt-6"
            v-model="sacadoDetail.nome"
          />

          <vs-input
            label="Data de Nascimento"
            class="w-2/12 pr-2 pt-1 mt-0"
            v-model="sacadoDetail.data_nascimento"
            type="date"
          />
          <vs-input
            label-placeholder="CPF"
            class="w-2/12 pr-2 mt-6"
            v-mask="'###.###.###-##'"
            v-model="sacadoDetail.cpf"
          />
          <vs-input
            label-placeholder="RG"
            class="w-2/12 mt-6"
            v-mask="'###############'"
            v-model="sacadoDetail.rg"
          />
        </div>
      </form>

      <div class="flex vx-row w-full pl-8">
        <vs-input
          label-placeholder="CEP"
          class="w-2/12 mt-8 pr-2"
          v-model="sacadoDetail.cep"
          v-mask="'#####-###'"
          @change="consultar"
        />
        <div class="w-3/12 pr-2 mt-2 my-2">
          <SelectEstado
            @update="(val) => setValue('id_estado', val)"
            :initialId="sacadoDetail.id_estado"
          />
        </div>
        <div class="w-3/12 pr-2 mt-2 my-2">
          <SelectCidade
            @update="(val) => setValue('id_cidade', val)"
            :estado="sacadoDetail.id_estado"
            :initialId="sacadoDetail.id_cidade"
          />
        </div>
        <div class="w-4/12 mt-2 my-2">
          <SelectBairro
            @update="(val) => setValue('id_bairro', val)"
            :cidade="sacadoDetail.id_cidade"
            :initialId="sacadoDetail.id_bairro"
          />
        </div>

        <vs-input
          label-placeholder="Logradouro"
          class="w-4/12"
          v-model="sacadoDetail.logradouro"
        />

        <vs-input
          label-placeholder="Número"
          class="w-1/12 pr-2 pl-2"
          v-model="sacadoDetail.numero"
        />
        <vs-input
          label-placeholder="Complemento"
          class="w-7/12"
          v-model="sacadoDetail.complemento"
        />
      </div>

      <CadastrarContatoSacado
        :contatos="sacadoDetail.contatos"
        :id_sacado="sacadoDetail.id"
        @update="fetchSacado"
      ></CadastrarContatoSacado>

      <div class="w-full pl-5 mt-10">
        <div class="vs-list--title text-xl mb-2 mt-2">Restrições</div>
        <vs-list class="px-3">
          <vs-list-item
            v-if="restricoes.length == 0"
            title="Sacado sem restrições"
            class="bg-success rounded-lg text-white py-2 pl-2"
          >
            <vs-button icon="check_circle" type="flat" color="dark"></vs-button>
          </vs-list-item>
          <vs-list-item
            v-else
            title="Sacado com restrições"
            class="bg-danger rounded-lg text-white pl-2"
          >
            <vs-tooltip title="Ver restrições do sacado">
              <vs-button
                icon="chevron_right"
                @click="toDetailNegativado(sacadoDetail.id)"
                type="flat"
                color="white"
              ></vs-button>
              <span></span>
            </vs-tooltip>
          </vs-list-item>
        </vs-list>
      </div>
      <div class="w-full pl-5">
        <div class="vs-list--title text-xl mb-2 mt-2">Histórico de vendas</div>
        <div class="rounded-lg" :key="idx" v-for="(ctt, idx) in vendas">
          <div class="vs-list--title text-base font-medium mb-2 mt-2">
            Contas a Receber # {{ ctt.id }}
          </div>
          <vs-list class="px-3">
            <vs-list-item title="OS" :subtitle="ctt.os.toString()">
              <vs-tooltip title="Contrato digital">
                <vs-button
                  icon="chevron_right"
                  type="flat"
                  @click="toContrato(ctt.os)"
                  color="primary"
                ></vs-button>
                <span></span>
              </vs-tooltip>
            </vs-list-item>

            <vs-list-item
              title="Aluno"
              :subtitle="ctt.ficha.id_aluno + ' - ' + ctt.ficha.aluno.nome"
            >
              <vs-tooltip title="Detalhes do aluno">
                <vs-button
                  icon="chevron_right"
                  type="flat"
                  @click="toDetailAluno(ctt.ficha.id_aluno)"
                  color="primary"
                ></vs-button>
                <span></span>
              </vs-tooltip>
            </vs-list-item>
            <vs-list-item
              v-if="ctt.renegociada == 0"
              title="Status"
              :subtitle="
                ctt.status == 0 ? 'Desativada' : ctt.status == 1 ? 'Ativa' : 'Paga'
              "
            >
              <vs-tooltip title="Detalhes do venda">
                <vs-button
                  icon="chevron_right"
                  type="flat"
                  @click="toDetailVenda(ctt.id)"
                  color="primary"
                ></vs-button>
                <span></span>
              </vs-tooltip>
            </vs-list-item>
            <vs-list-item
              v-if="ctt.renegociada == 1"
              title="Status"
              color="warning"
              subtitle="
               Renegociada
              "
            >
              <vs-tooltip title="Detalhes do venda">
                <vs-button
                  icon="chevron_right"
                  type="flat"
                  @click="toDetailVenda(ctt.id)"
                  color="primary"
                ></vs-button>
                <span></span>
              </vs-tooltip>
            </vs-list-item>
          </vs-list>
        </div>
      </div>
      <div class="w-full pl-5 mt-10">
        <div class="vs-list--title text-xl mb-2 mt-2">Boletos</div>

        <vs-list class="px-3">
          <vs-list-item title="Ver boletos do sacado">
            <vs-tooltip title="Ver todos os boletos">
              <vs-button
                icon="chevron_right"
                type="flat"
                @click="toDetailBoletos(sacadoDetail.id)"
                color="primary"
              ></vs-button>
              <span></span>
            </vs-tooltip>
          </vs-list-item>
        </vs-list>
      </div>
    </div>
  </vs-card>
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import CadastrarContatoSacado from "@/views/administracao/sacado/CadastrarContatoSacado";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import SelectBairro from "@/components/SelectBairro";
import SelectCidade from "@/components/SelectCidade";
import SelectEstado from "@/components/SelectEstado";
import ENV from "@/common/env.js";
export default {
  mixins: [useHTTP, useData, useRule, PromptActiveDesactive],
  components: {
    CadastrarContatoSacado,
    SelectBairro,
    SelectCidade,
    SelectEstado,
  },
  props: ["sacado"],
  data: () => ({
    contatos: [],
    modalEditarAluno: false,
    cttPessoasListKey: 0,
    formAssociado: {},
    sacadoDetail: {},
    idSacado: null,
    loading: true,
    vendas: [],
    boletos: [],
  }),
  methods: {
    async update() {
      await this.updateData(`sacados/${this.$route.params.id}`, this.sacadoDetail);
    },
    async consultar() {
      this.loading = true;
      this.$vs.loading();
      const data = await this.consultarCep(this.sacadoDetail.cep);
      if (data != null) Object.assign(this.sacadoDetail, data);
      this.$forceUpdate();
      this.loading = false;
      this.$vs.loading.close();
    },
    async fetchSacado() {
      this.loading = true;
      this.sacadoDetail = await this.fetchSacadoById(
        true,
        this.$route.params.id,
        "contatos=1"
      );
      this.loading = false;
    },
    async _fetchVendasByIdSacado() {
      this.loading = true;
      this.vendas = await this.fetchVendaByIdSacado(true, this.$route.params.id, "");
      this.loading = false;
    },
    async _fetchRestricoesByIdSacado() {
      this.loading = true;
      this.restricoes = await this.fetchRestricoesByIdSacado(
        true,
        this.$route.params.id,
        ""
      );

      this.loading = false;
    },
    toDetailBoletos(id) {
      this.$router
        .push({
          path: "/financeiro/boletos?idSacado=" + id,
        })
        .catch(() => {});
    },
    toDetailNegativado(id) {
      this.$router
        .push({
          path: "/financeiro/inadimplentes?idSacado=" + id,
        })
        .catch(() => {});
    },
    toDetailVenda(id) {
      this.$router.push("/financeiro/contas/receber/" + id);
    },
    toDetailAluno(id) {
      this.$router.push("/administracao/alunos/" + id);
    },
    toContrato(id) {
      window.open(ENV.API + "external/contrato/" + id, "_blank");
    },
  },
  async mounted() {
    this.route = "sacado";
    await this.fetchSacado();
    await this._fetchVendasByIdSacado();
    await this._fetchRestricoesByIdSacado();
  },
};
</script>

<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
