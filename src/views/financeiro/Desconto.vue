<template>
  <div>
    <vs-card>
      <TableSSR
        v-if="hasAccess('show', 'descontos')"
        :title="`Descontos`"
        route="cupons"
        :search="true"
        :key="tableKey"
        customInit="order=id&sort=desc"
        customSearch="order=id&sort=desc"
        customPageChange="order=id&sort=desc"
      >
        <template slot="actions">
          <div>
            <ModalCadastroCupom
              v-if="hasAccess('create')"
              @update="() => tableKey++"
            ></ModalCadastroCupom>
          </div>
          <div></div>
        </template>
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="nome">Código</vs-th>
          <vs-th sort-key="descricao">Descrição</vs-th>
          <vs-th sort-key="desconto">Desconto</vs-th>
          <vs-th sort-key="qtd">Qtd. de usos</vs-th>
          <vs-th sort-key="data_inicio">D. Início</vs-th>
          <vs-th sort-key="data_termino">D. Término</vs-th>
          <vs-th>D. Cadastro</vs-th>
          <vs-th>Ações</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>
            <vs-td :data="data[indextr].descricao">
              {{ data[indextr].descricao }}
            </vs-td>
            <vs-td :data="data[indextr].desconto"> {{ data[indextr].desconto }}% </vs-td>
            <vs-td :data="data[indextr].qtd">
              {{ data[indextr].qtd != null ? data[indextr].qtd : "Ilimitado" }}
            </vs-td>
            <vs-td :data="data[indextr].data_inicio">
              {{ formatDateBrasil(data[indextr].data_inicio) }}
            </vs-td>
            <vs-td :data="data[indextr].data_termino">
              {{ formatDateBrasil(data[indextr].data_termino) }}
            </vs-td>
            <vs-td :data="data[indextr].created_at">
              {{ formatDateBrasil(data[indextr].created_at) }}
            </vs-td>
            <vs-td :data="data[indextr].id">
              <vs-row vs-justify="flex-end">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('delete')"
                  vs-w="12"
                >
                  <ModalEditarCupom
                    v-if="hasAccess('update')"
                    @update="() => tableKey++"
                    :data="data[indextr]"
                  ></ModalEditarCupom>
                  <vs-tooltip text="Desativar cupom" v-if="hasAccess('delete')">
                    <vs-button
                      v-if="data[indextr].status && data[indextr].status != 2"
                      icon="toggle_on"
                      color="success"
                      type="flat"
                      size="large"
                      @click="desactiveCupom(data[indextr])"
                    ></vs-button>
                  </vs-tooltip>
                  <vs-tooltip text="Ativar cupom" v-if="hasAccess('delete')">
                    <vs-button
                      v-if="!data[indextr].status && data[indextr].status != 2"
                      icon="toggle_off"
                      size="large"
                      type="flat"
                      @click="activeCupom(data[indextr])"
                      color="danger"
                    ></vs-button>
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

<script lang="ts">
import TableSSR from "@/components/TableSSR";
import ModalCadastroCupom from "@/views/financeiro/cupons/ModalCadastroCupom";
import ModalEditarCupom from "@/views/financeiro/cupons/ModalEditarCupom";
import useData from "@/common/mixins/useData";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import useRule from "@/common/mixins/useRule.js";
import Validators from "@/common/mixins/Validators";
export default {
  components: {
    TableSSR,
    ModalCadastroCupom,
    ModalEditarCupom,
  },
  mixins: [useData, useRule, Validators, PromptActiveDesactive],
  data: () => ({
    tableKey: 0,
  }),
  methods: {
    setDate(date) {
      // this.dataRemessa = date;
      this.tableKey++;
    },
    async activeCupom(item) {
      this.activeConfirm(item.nome, "cupons/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveCupom(item) {
      this.deleteConfirm(item.nome, "cupons/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
  },
  mounted() {
    this.route = "descontos";
  },
};
</script>
