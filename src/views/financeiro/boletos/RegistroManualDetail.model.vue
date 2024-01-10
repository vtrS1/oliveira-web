<template>
  <div>
    <vs-button
      class="mr-2 float-right"
      color="primary"
      type="flat"
      @click="modalState = true"
      icon="info"
    ></vs-button>
    <vs-prompt
      :active.sync="modalState"
      @accept="toSacadoDetail()"
      title="Detalhes do boleto"
      accept-text="Ver sacado"
    >
      <div class="w-full flex flex-row">
        <div class="w-4/12">
          <vs-list>
            <vs-list-item
              title="Nome do Sacado"
              class="cursor-pointer"
              @click.native="toSacadoDetail()"
              :subtitle="`${getValue(boleto.id_sacado)} - ${getValue(
                boleto.sacado && boleto.sacado.nome
              )}`"
            >
            </vs-list-item>
            <vs-list-item
              title="CPF"
              :subtitle="`${getValue(boleto.sacado && boleto.sacado.cpf)}`"
            >
              <vs-chip
                v-if="!isValidCPF(getValue(boleto.sacado && boleto.sacado.cpf))"
                color="danger"
                >CPF Inválido</vs-chip
              >
            </vs-list-item>
            <vs-list-item
              title="RG"
              :subtitle="`${getValue(boleto.sacado && boleto.sacado.rg)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Data de nascimento"
              :subtitle="`${formatDateBrasil(
                boleto.sacado && boleto.sacado.data_nascimento
              )}`"
            >
            </vs-list-item>

            <vs-list-item
              title="CEP"
              :subtitle="`${getValue(boleto.sacado && boleto.sacado.cep)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Estado"
              :subtitle="`${getValue(boleto.sacado.estado && boleto.sacado.estado.nome)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Cidade"
              :subtitle="`${getValue(boleto.sacado.cidade && boleto.sacado.cidade.nome)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Bairro"
              :subtitle="`${getValue(boleto.sacado.bairro && boleto.sacado.bairro.nome)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Logradouro"
              :subtitle="`${getValue(
                boleto.sacado && boleto.sacado.logradouro
              )} ${getValue(boleto.sacado && boleto.sacado.numero)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Complemento e Referência"
              :subtitle="`${getValue(
                boleto.sacado && boleto.sacado.complemento
              )} ${getValue(boleto.sacado && boleto.sacado.referencia)}`"
            >
            </vs-list-item>
          </vs-list>
        </div>
        <div class="w-4/12">
          <vs-list>
            <vs-list-item
              title="Nome do aluno"
              class="cursor-pointer"
              @click.native="toAlunoDetail(boleto.ficha && boleto.ficha.id_aluno)"
              :subtitle="`${getValue(boleto.ficha && boleto.ficha.id_aluno)} - ${getValue(
                boleto.ficha.aluno && boleto.ficha.aluno.nome
              )}`"
            >
            </vs-list-item>
            <vs-list-item
              title="CEP"
              :subtitle="`${getValue(boleto.ficha.aluno && boleto.ficha.aluno.cep)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Estado"
              :subtitle="`${getValue(
                boleto.ficha.aluno.estado && boleto.ficha.aluno.estado.nome
              )}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Cidade"
              :subtitle="`${getValue(
                boleto.ficha.aluno.cidade && boleto.ficha.aluno.cidade.nome
              )}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Bairro"
              :subtitle="`${getValue(
                boleto.ficha.aluno.bairro && boleto.ficha.aluno.bairro.nome
              )}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Logradouro"
              :subtitle="`${getValue(
                boleto.ficha.aluno && boleto.ficha.aluno.logradouro
              )} ${getValue(boleto.ficha.aluno && boleto.ficha.aluno.numero)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Complemento e Referência"
              :subtitle="`${getValue(
                boleto.ficha.aluno && boleto.ficha.aluno.complemento
              )} ${getValue(boleto.ficha.aluno && boleto.ficha.aluno.referencia)}`"
            >
            </vs-list-item>
          </vs-list>
        </div>
        <!-- Detalhes -->
        <div class="w-2/12">
          <vs-list>
            <vs-list-item title="OS" :subtitle="`${getValue(boleto.os)}`"> </vs-list-item>
            <vs-list-item
              title="Incluído na remessa"
              :subtitle="`${getValue(boleto.remesa)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Código no arquivo retorno"
              :subtitle="`${getValue(boleto.cod_retorno)}`"
            >
            </vs-list-item>
            <vs-list-item title="Contrato" :subtitle="`${boleto.ficha.id_contrato}`">
            </vs-list-item>
            <vs-list-item title="Número da Ficha" :subtitle="`${boleto.ficha.numero}`">
            </vs-list-item>
            <vs-list-item title="ID da Ficha" :subtitle="`${boleto.ficha.id}`">
            </vs-list-item>
          </vs-list>
        </div>
        <!-- Boleto -->
        <div class="w-2/12">
          <vs-list>
            <vs-list-item title="ID" :subtitle="`${boleto.id}`"> </vs-list-item>
            <vs-list-item title="Nosso Número" :subtitle="`${boleto.nosso_numero}`">
            </vs-list-item>
            <vs-list-item
              title="Data de vencimento"
              :subtitle="`${formatDateBrasil(boleto.data_vencimento)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Data de geração"
              :subtitle="`${formatDateBrasil(boleto.created_at)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Data do recebimento"
              :subtitle="`${formatDateBrasil(boleto.data_recebimento)}`"
            >
            </vs-list-item>
            <vs-list-item title="Valor do boleto" :subtitle="`R$ ${boleto.valor}`">
            </vs-list-item>
            <vs-list-item
              title="Valor recebido"
              :subtitle="`R$ ${getValue(boleto.valor_recebido)}`"
            >
            </vs-list-item>
            <vs-list-item
              title="Parcela"
              :subtitle="`${getValue(
                boleto.vendaParcela && boleto.vendaParcela.parcela
              )}`"
            >
            </vs-list-item>
          </vs-list>
        </div>
      </div>
    </vs-prompt>
    <!-- </vs-popup> -->
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
import SelectContaReceber from "@/components/SelectContaReceber";
import SelectSacado from "@/components/SelectSacado";
export default {
  mixins: [useHTTP, useData, Validators],
  props: ["boleto"],
  data: () => ({
    sacado: {},
    modalState: false,
  }),
  methods: {
    getValue(value) {
      if (value != undefined && value != null && value != "None") {
        return value;
      }
      return "-";
    },
    toSacadoDetail(id) {
      this.$router.push("/administracao/sacados/" + this.boleto.id_sacado);
    },
    toAlunoDetail(id) {
      this.$router.push("/administracao/alunos/" + id);
    },
  },
};
</script>
<style scoped>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
