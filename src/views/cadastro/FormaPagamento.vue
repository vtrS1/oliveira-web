<template lang="html">
  <div>
    <vs-card>
      <TableSSR
        title="Formas de pagamento"
        route="tipos/pagamentos"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
        v-if="hasAccess('show')"
      >
        <template slot="actions">
          <ModalCadastraFormaPagamento
            v-if="hasAccess('create')"
            @update="() => tableKey++"
          />
        </template>

        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="entrada"> Aceito como entrada </vs-th>
          <vs-th sort-key="boleto"> É boleto </vs-th>
          <!-- <vs-th sort-key="parcela"> Max. Parcelas </vs-th> -->
          <vs-th>Operações</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].entrada">
              <vs-chip
                :color="data[indextr].entrada ? 'primary' : 'danger'"
                class="cursor-pointer"
                >{{ data[indextr].entrada ? "Sim" : "Não" }}</vs-chip
              >
            </vs-td>

            <vs-td :data="data[indextr].boleto">
              <vs-chip
                :color="data[indextr].boleto ? 'primary' : 'danger'"
                class="cursor-pointer"
                >{{ data[indextr].boleto ? "Sim" : "Não" }}</vs-chip
              >
            </vs-td>
            <!-- 
            <vs-td :data="data[indextr].parcela">
              {{ data[indextr].parcela }}
            </vs-td> -->

            <vs-td :data="data[indextr].id">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="6"
                  v-if="hasAccess('update')"
                >
                  <ModalEditarFormaPagamento
                    :formaPagamento="data[indextr]"
                    @update="() => tableKey++"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="6"
                  v-if="hasAccess('delete')"
                >
                  <vs-button
                    v-if="data[indextr].status"
                    icon="toggle_on"
                    color="success"
                    type="flat"
                    size="large"
                    @click="desactiveFormaPagamento(data[indextr])"
                  ></vs-button>
                  <vs-button
                    v-if="!data[indextr].status"
                    icon="toggle_off"
                    size="large"
                    type="flat"
                    @click="activeFormaPagamento(data[indextr])"
                    color="danger"
                  ></vs-button>
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
import ModalCadastraFormaPagamento from "@/views/cadastro/formaPagamento/ModalCadastraFormaPagamento";
import ModalEditarFormaPagamento from "@/views/cadastro/formaPagamento/ModalEditarFormaPagamento";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCadastraFormaPagamento,
    ModalEditarFormaPagamento,
    TableSSR
  },
  data: () => ({
    tableKey: 0
  }),
  methods: {
    async activeFormaPagamento(item) {
      this.activeConfirm(
        item.nome,
        "tipos/pagamentos/" + item.id,
        async val => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    },
    async desactiveFormaPagamento(item) {
      this.deleteConfirm(
        item.nome,
        "tipos/pagamentos/" + item.id,
        async val => {
          if (val) {
            this.tableKey++;
          }
        }
      );
    }
  },
  mounted() {
    this.route = "formaPagamento";
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
