<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Instituições"
        route="instituicoes"
        :key="tableKey"
        :search="true"
        customInit="contatos=1&estado=1&cidade=1&bairro=1&order=id&sort=desc"
        customSearch="contatos=1&estado=1&cidade=1&bairro=1&order=id&sort=desc"
        customPageChange="contatos=1&estado=1&cidade=1&bairro=1&order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastroInstituicao
            @update="() => tableKey++"
            v-if="hasAccess('create')"
          />
        </template>
        <template slot="head">
          <vs-th sort-key="if">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="nome_responsavel"> Responsavel </vs-th>
          <vs-th sort-key="id"> Contatos </vs-th>
          <vs-th sort-key="id"> Localização </vs-th>
          <vs-th sort-key="id"> Operações </vs-th>
        </template>
        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].nome_responsavel">
              {{ getInstituicaoResponsavelDetail(data[indextr]) }}
            </vs-td>

            <vs-td :data="data[indextr].contatos">
              <div>
                <vs-chip
                  v-for="(item, idx) in data[indextr].contatos"
                  :key="idx"
                >
                  {{ item.contato }}
                </vs-chip>
              </div>
            </vs-td>

            <vs-td :data="data[indextr].cep">
              {{ getInstituicaoSimpleAddress(data[indextr]) }}
            </vs-td>

            <vs-td :data="data[indextr].id">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('update')"
                  vs-w="6"
                >
                  <vs-button
                    icon="mode_edit"
                    type="flat"
                    @click="toDetail(data[indextr].id)"
                    color="primary"
                  ></vs-button>
                </vs-col>

                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="6"
                  v-if="hasAccess('delete')"
                >
                  <vs-tooltip text="Desativar instituição">
                    <vs-button
                      v-if="data[indextr].status"
                      icon="toggle_on"
                      color="success"
                      type="flat"
                      size="large"
                      @click="desactiveInstituicao(data[indextr])"
                    ></vs-button>
                    <span></span>
                  </vs-tooltip>
                  <vs-tooltip text="Ativar instituição">
                    <vs-button
                      v-if="!data[indextr].status"
                      icon="toggle_off"
                      size="large"
                      type="flat"
                      @click="activeInstituicao(data[indextr])"
                      color="danger"
                    ></vs-button>
                    <span></span>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
            </vs-td>
          </vs-tr>
        </template>
      </TableSSR>

      <p v-else class="text-center py-10 font-semibold text-xl">
        Uma permissão é necessária para acessar este conteúdo
      </p>
    </vs-card>
  </div>
</template>

<script>
import ModalCadastroInstituicao from "@/views/administracao/instituicao/ModalCadastroInstituicao";
import ModalCadastroTurmas from "@/views/administracao/instituicao/ModalCadastroTurmas";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import useUtils from "@/common/mixins/useUtils";
import TableSSR from "@/components/TableSSR";

export default {
  mixins: [useHTTP, useData, useRule, useUtils, PromptActiveDesactive],
  components: {
    ModalCadastroInstituicao,
    ModalCadastroTurmas,
    TableSSR
  },
  data: () => ({
    modalCadastroInstituicao: false,
    modalEditarTurmas: false,
    route: "",
    tableKey: 0
  }),
  methods: {
    async activeInstituicao(item) {
      this.activeConfirm(item.nome, `instituicoes/${item.id}`, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveInstituicao(item) {
      this.deleteConfirm(item.nome, `instituicoes/${item.id}`, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    toDetail(id) {
      this.$router.push("/administracao/instituicoes/" + id);
    }
  },
  async mounted() {
    this.route = "instituicao";
  }
};
</script>

<style>
.vs-con-table,
.vs-con-tbody {
  border: none !important;
}
.vs-table--tbody-table tr {
  height: 50px;
}
</style>
