<template>
  <div>
    <vs-tooltip title="Histórico de tentativas de renegociação">
      <vs-button
        class="mr-2 float-right"
        color="warning"
        type="flat"
        @click="modalState = true"
        icon="question_answer"
      ></vs-button>
      <span></span>
    </vs-tooltip>
    <vs-prompt
      :active.sync="modalState"
      title="Histórico de tentativas de renegociação"
      accept-text=""
      cancel-text="Cancelar"
    >
      <TableSSR
        title=""
        route="renegociacao"
        :search="true"
        :customInit="
          `order=id&sort=desc&usuario=1&id_sacado=${id_sacado}&id_contas_receber=${id_contas_receber}`
        "
        :customSearch="
          `order=id&sort=desc&usuario=1&id_sacado=${id_sacado}&id_contas_receber=${id_contas_receber}`
        "
        :customPageChange="
          `order=id&sort=desc&usuario=1&id_sacado=${id_sacado}&id_contas_receber=${id_contas_receber}`
        "
      >
        <template slot="head">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="id_usuario">Usuário</vs-th>
          <vs-th sort-key="situacao">Situação</vs-th>
          <vs-th sort-key="obs">Obs</vs-th>
          <vs-th sort-key="created_at">Data</vs-th>
        </template>

        <template slot="body" slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].id_usuario">
              {{ data[indextr].id_usuario }} -
              {{ data[indextr].usuario && data[indextr].usuario.nome }}
            </vs-td>
            <vs-td :data="data[indextr].situacao">
              {{ data[indextr].situacao }}
            </vs-td>
            <vs-td :data="data[indextr].obs">
              {{ data[indextr].obs }}
            </vs-td>
            <vs-td :data="data[indextr].created_at">
              {{ formatDateBrasil(data[indextr].created_at) }}
            </vs-td>
          </vs-tr>
        </template>
      </TableSSR>
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
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useHTTP, useData, Validators],
  props: {
    id_sacado: { type: Number, required: true },
    id_contas_receber: { type: Number, required: true }
  },
  components: { TableSSR },
  data: () => ({
    form: {},
    errors: [],
    modalState: false
  })
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
