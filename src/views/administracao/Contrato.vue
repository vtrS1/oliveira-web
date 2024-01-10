<template lang="html">
  <vs-card>
    <TableSSR
      title="Contratos"
      route="contratos"
      :search="true"
      customInit="instituicao=1&order=id&sort=desc"
      customSearch="instituicao=1&order=id&sort=desc"
      customPageChange="instituicao=1&order=id&sort=desc"
      :key="tableKey"
      v-if="hasAccess('show')"
    >
      <template slot="actions">
        <ModalCadastrarContrato
          v-if="hasAccess('create')"
          :modalCadastrarContrato="modalCadastrarContrato"
          @close="modalCadastrarContrato = false"
          @update="() => tableKey++"
        />
      </template>
      <template slot="head">
        <vs-th sort-key="numero"> Contrato </vs-th>
        <vs-th sort-key="id_instituicao"> Instituição </vs-th>
        <vs-th sort-key="evento"> Evento </vs-th>
        <vs-th sort-key="fase"> Fase </vs-th>
        <vs-th sort-key="comissao"> Comissão </vs-th>
        <vs-th sort-key="status">Opções</vs-th>
      </template>
      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].numero">
            {{ data[indextr].numero }}
          </vs-td>

          <vs-td :data="data[indextr].instituicao">
            {{ data[indextr].instituicao.nome }}
          </vs-td>

          <vs-td :data="data[indextr].evento">
            {{ data[indextr].evento }}
          </vs-td>

          <vs-td :data="data[indextr].fase">
            {{ data[indextr].fase }}
          </vs-td>

          <vs-td :data="data[indextr].forma_comissao">
            <vs-chip
              color="success"
              v-if="data[indextr].forma_comissao == true"
            >
              <vs-avatar icon="check" />
              Formar comissão
            </vs-chip>
            <vs-chip
              color="primary"
              v-if="
                data[indextr].forma_comissao == null ||
                  data[indextr].forma_comissao == false
              "
            >
              Sem comissão
            </vs-chip>
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
                <ModalEditarContrato
                  :contrato="data[indextr]"
                  @update="() => tableKey++"
                />
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                v-if="hasAccess('delete')"
                vs-w="6"
              >
                <vs-tooltip text="Desativar contrato">
                  <vs-button
                    v-if="data[indextr].status"
                    icon="toggle_on"
                    color="success"
                    type="flat"
                    size="large"
                    @click="desactiveContrato(data[indextr])"
                  ></vs-button>
                  <span></span>
                </vs-tooltip>
                <vs-tooltip text="Ativar contrato">
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeContrato(data[indextr])"
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
</template>

<script>
import ModalCadastrarContrato from "@/views/administracao/contrato/ModalCadastrarContrato";
import ModalEditarContrato from "@/views/administracao/contrato/ModalEditarContrato";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useRule, PromptActiveDesactive],
  components: {
    ModalEditarContrato,
    ModalCadastrarContrato,
    TableSSR
  },
  data: () => ({
    form: {},
    tipo: 0,
    modalCadastrarContrato: false,
    escola: 0,
    tableKey: 1
  }),
  methods: {
    updateStatemodalCadastrarContrato(state) {
      this.modalCadastrarContrato = state;
    },
    async activeContrato(item) {
      this.activeConfirm(item.numero, "contratos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveContrato(item) {
      this.deleteConfirm(item.numero, "contratos/" + item.id, async val => {
        if (val) {
          this.tableKey++;
        }
      });
    }
  },
  mounted() {
    this.route = "contrato";
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
