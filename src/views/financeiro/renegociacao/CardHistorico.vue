<template>
  <vs-card>
    <TableSSR
      title="Observações"
      route="renegociacao"
      :search="true"
      :key="tableKey"
      :customInit="`order=id&sort=desc&usuario=true&id_contas_receber=${idVenda}`"
      :customSearch="`order=id&sort=desc&usuario=true&id_contas_receber=${idVenda}`"
      :customPageChange="`order=id&sort=desc&usuario=true&id_contas_receber=${idVenda}`"
    >
      <template slot="head">
        <vs-th sort-key="obs"> Obs </vs-th>
        <vs-th sort-key="situacao"> Situação </vs-th>
        <vs-th sort-key="usuario"> Usuário </vs-th>
        <vs-th sort-key="created_at"> Data </vs-th>
        <vs-th> Ações </vs-th>
      </template>

      <template slot="actions">
        <ModalCadastrarRenegociacao
          :idVenda="idVenda"
          :idSacado="idSacado"
          @update="() => tableKey++"
        />
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].obs">
            {{ data[indextr].obs }}
          </vs-td>
          <vs-td :data="data[indextr].situacao">
            {{ data[indextr].situacao }}
          </vs-td>

          <vs-td :data="data[indextr].usuario">
            {{ data[indextr].usuario.nome }}
          </vs-td>

          <vs-td :data="data[indextr].created_at">
            {{ formatDateBrasil(data[indextr].created_at) }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            <vs-row vs-justify="flex-end">
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveHistorico(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeHistorico(data[indextr])"
                  color="danger"
                ></vs-button>
              </vs-col>
            </vs-row>
          </vs-td>
        </vs-tr>
      </template>
    </TableSSR>
    <vs-alert color="danger" icon="new_releases">
      <span
        >Itens desativados não são exibidos no resumo da ficha, mas continuam disponíveis
        aqui</span
      >
    </vs-alert>
  </vs-card>
</template>

<script>
import TableSSR from "@/components/TableSSR";
import useData from "@/common/mixins/useData";
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import ModalCadastrarRenegociacao from "./ModalCadastrarRenegociacao";
export default {
  components: {
    TableSSR,
    ModalCadastrarRenegociacao,
  },
  mixins: [useData, PromptActiveDesactive],
  props: {
    idVenda: { type: Number, required: true },
    idSacado: { type: Number, required: true },
  },
  data: () => ({
    tableKey: 0,
  }),
  methods: {
    async activeHistorico(item) {
      this.activeConfirm(item.obs, "renegociacao/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
    async desactiveHistorico(item) {
      this.deleteConfirm(item.obs, "renegociacao/" + item.id, async (val) => {
        if (val) {
          this.tableKey++;
        }
      });
    },
  },
};
</script>
