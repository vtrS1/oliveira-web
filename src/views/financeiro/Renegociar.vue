<template>
  <div>
    <div v-if="hasAccess('show')">
      <vs-card>
        <div class="w-full flex flex-wrap justify-start">
          <div class="pt-3 flex pl-2 flex-wrap">
            <vs-button
              class="float-left"
              color="success"
              icon="arrow_back_ios"
              @click="() => $router.back()"
              type="flat"
            ></vs-button>
          </div>
          <div class="font-semibold text-lg pl-4 mb-2 mt-5">Renegociar</div>
        </div>
        <vs-alert color="warning" icon="new_releases" class="my-2">
          <span
            >Lembre-se de colocar o número da ficha <b>exatamente</b> como cadastrado (Ex:
            04 é diferente de 4)</span
          >
        </vs-alert>
        <form class="flex flex-wrap">
          <div class="w-full md:w-5/12">
            <vs-input
              label="Contrato"
              class="w-full"
              placeholder="Ex: 2031"
              v-model="form.contrato"
              @keyup.enter="setParams()"
            />
          </div>
          <div class="w-full md:w-5/12 md:pl-2">
            <vs-input
              @keyup.enter="setParams()"
              class="w-full"
              label="Número da Ficha"
              placeholder="Ex: 1"
              v-model="form.numero"
            />
          </div>
          <div class="w-full md:w-2/12 md:pl-2 pt-5">
            <vs-button @click="setParams()" class="w-full">Buscar detalhes</vs-button>
          </div>
        </form>
      </vs-card>
      <div v-if="data != null" :key="tableKey">
        <div class="w-full">
          <div class="w-full flex flex-wrap">
            <div class="w-full md:w-5/12">
              <CardSituacao title="Situação" :data="data"></CardSituacao>
            </div>
            <div class="w-full md:w-4/12 md:pl-2">
              <!-- Restrições -->
              <CardRestricao :idSacado="data.venda.id_sacado"></CardRestricao>
              <div class="w-full pt-2">
                <vx-card
                  @click.native="openReport()"
                  slot="no-body"
                  class="cursor-pointer text-center bg-primary-gradient hover:bg-white"
                >
                  <feather-icon
                    icon="FileIcon"
                    class="p-2 mb-1 bg-primary inline-flex rounded-full text-white shadow"
                    svgClasses="h-6 w-6"
                  ></feather-icon>
                  <h4 class="mb-1 text-white">Imprimir estes dados</h4>
                </vx-card>
              </div>
            </div>
            <div class="w-full md:w-3/12 md:pl-2">
              <!-- Contatos -->
              <CardContatos :contatos="data.contatos"></CardContatos>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-wrap">
          <div class="w-6/12 pr-1">
            <vs-card>
              <div slot="header" class="flex flex-wrap justify-between">
                <p>Informações</p>
              </div>
              <vs-list>
                <vs-list-item
                  title="Sacado"
                  :subtitle="
                    data.venda.sacado.nome.toUpperCase() + ' - ' + data.venda.sacado.cpf
                  "
                >
                  <vs-tooltip text="Ver detalhes do sacado">
                    <vs-button
                      block
                      class="mr-2"
                      size="small"
                      @click="toDetailSacado(data.venda.id_sacado)"
                    >
                      Detalhes</vs-button
                    ><span></span>
                  </vs-tooltip>
                </vs-list-item>
                <vs-list-item
                  title="Aluno"
                  :subtitle="data.ficha.aluno.nome.toUpperCase()"
                >
                  <vs-tooltip text="Ver detalhes do aluno">
                    <vs-button
                      block
                      class="mr-2"
                      size="small"
                      @click="toDetailAluno(data.ficha.id_aluno)"
                    >
                      Detalhes</vs-button
                    ><span></span>
                  </vs-tooltip>
                </vs-list-item>
              </vs-list>
            </vs-card>
          </div>
          <div class="w-6/12 pl-1">
            <CardEnderecoCompleto
              :enderecoSacado="data.enderecosSacado"
              :enderecoAluno="data.enderecosAluno"
              title="Endereços"
            ></CardEnderecoCompleto>
          </div>
        </div>

        <div class="w-full">
          <CardHistorico :idVenda="data.venda.id" :idSacado="data.venda.id_sacado" />
        </div>

        <!-- Parcelas -->
        <div class="w-full flex flex-wrap">
          <div class="w-full md:w-6/12">
            <CardParcelas
              :idVenda="data.venda.id"
              :parcelas="data.parcelas"
              :title="`Parcelas da conta #${data.venda.id}`"
            ></CardParcelas>
          </div>
          <div class="w-full md:w-6/12 md:pl-2">
            <CardRenegociar
              v-if="hasAccess('create')"
              :id_venda="data.venda.id"
              :valor="data.valorCorrigido"
              :cupons="data.cupons"
            ></CardRenegociar>
          </div>
        </div>

        <div class="w-full">
          <CardContasReceber
            :idVendaAtual="data.venda.id"
            :idSacado="data.venda.id_sacado"
          ></CardContasReceber>
        </div>
      </div>
    </div>
    <p v-else class="text-center py-10 font-semibold text-xl">
      Uma permissão é necessária para acessar este conteúdo
    </p>
  </div>
</template>

<script>
import useData from "@/common/mixins/useData";
import useHTTP from "@/common/mixins/useHTTP";
import useRule from "@/common/mixins/useRule.js";
import SelectContrato from "@/components/SelectContrato";
import SelectFicha from "@/components/SelectFicha";
import RC from "./renegociacao/_.js";
import useReport from "@/common/mixins/useReport.js";

export default {
  mixins: [useData, useHTTP, useRule, useReport],
  components: {
    SelectContrato,
    SelectFicha,
    ...RC,
  },
  data: () => ({
    tableKey: 0,
    form: {},
    data: null,
    modalState: false,
    modalContent: "",
  }),
  methods: {
    setValue(key, value) {
      this.form[key] = value;
      this.$forceUpdate();
    },
    setParams() {
      this.$router
        .push({
          path: "/financeiro/renegociar",
          query: {
            contrato: this.form.contrato,
            numero: this.form.numero,
          },
          params: {
            contrato: this.form.contrato,
            numero: this.form.numero,
          },
        })
        .catch(() => {});
      if (this.$route.query.contrato != undefined && this.$route.query.contrato != null) {
        this.searchDetail();
      }
    },
    async searchDetail() {
      this.form = {
        contrato: this.$route.query.contrato,
        numero: this.$route.query.numero,
      };
      this.data = await this.simplePost("renegociar", this.form);
      if (this.data.error != undefined) {
        this.$vs.notify({
          title: "Ops...",
          text: this.data.error ?? "404 - Não encontrado",
          color: "warning",
        });
        this.data = null;
      }
      console.log(this.data);
      this.tableKey++;
      this.$forceUpdate();
    },

    toDetailAluno(id) {
      this.$router.push("/administracao/alunos/" + id);
    },
    toDetailSacado(id) {
      this.$router.push("/administracao/sacados/" + id);
    },
    async openReport() {
      await this.generateReport("relatorioVendaCobrancaResumo", {
        id: this.data.venda.id,
      });
    },
  },
  async mounted() {
    this.route = "renegociar";
    if (this.$route.query.contrato != undefined && this.$route.query.contrato != null) {
      this.searchDetail();
    }
  },
};
</script>
