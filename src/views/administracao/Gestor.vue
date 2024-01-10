<template lang="html">
  <div>
    <vs-card>
      <vs-table
        search
        v-if="hasAccess('show')"
        :max-items="20"
        pagination
        :data="DATA_GESTORES"
        notSpacer
        description
        :description-items="descriptionItems"
        description-title="Registros"
        description-connector="por"
        description-body="Páginas"
      >
        <template slot="header">
          <h3 class="ml-3">
            Gestor
          </h3>
          <div class="w-full flex float-right text-right justify-end">
            <ModalCadastroGestor
              @update="fetchGestores"
              v-if="hasAccess('create')"
            />
          </div>
        </template>
        <template slot="thead">
          <vs-th sort-key="id">#</vs-th>
          <vs-th sort-key="instituicao"> Instituição </vs-th>
          <vs-th sort-key="nome"> Nome </vs-th>
          <vs-th sort-key="cpf"> CPF </vs-th>
          <vs-th> Contatos </vs-th>
          <vs-th>Operações</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr
            :key="indextr"
            v-for="(tr, indextr) in data"
            :class="!data[indextr].status ? 'bg-warning' : ''"
          >
            <vs-td :data="data[indextr].id">
              {{ data[indextr].id }}
            </vs-td>
            <vs-td :data="data[indextr].id">
              <vs-chip
                v-for="(item, idx) in data[indextr].instituicoes"
                :key="idx"
              >
                {{ item.nome }}
              </vs-chip>
            </vs-td>

            <vs-td :data="data[indextr].nome">
              {{ data[indextr].nome }}
            </vs-td>

            <vs-td :data="data[indextr].cpf">
              <vs-chip color="primary" v-if="data[indextr].cpf != null">
                {{ data[indextr].cpf }}
              </vs-chip>
              <vs-chip v-if="data[indextr].cpf == null">
                <vs-avatar size="large" icon="report" color="danger" />
                Preencha
              </vs-chip>
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
                  v-if="hasAccess('delete')"
                  vs-w="6"
                >
                  <vs-tooltip text="Desativar gestor">
                    <vs-button
                      v-if="data[indextr].status"
                      icon="toggle_on"
                      color="success"
                      type="flat"
                      size="large"
                      @click="desactiveGestor(data[indextr])"
                    ></vs-button>
                    <span></span>
                  </vs-tooltip>
                  <vs-tooltip text="Ativar gestor">
                    <vs-button
                      v-if="!data[indextr].status"
                      icon="toggle_off"
                      size="large"
                      type="flat"
                      @click="activeGestor(data[indextr])"
                      color="danger"
                    ></vs-button>
                    <span></span>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-else class="text-center py-10 font-semibold text-xl">
        Uma permissão é necessária para acessar este conteúdo
      </p>
    </vs-card>
  </div>
</template>

<script>
import ModalCadastroGestor from "@/views/administracao/gestor/ModalCadastroGestor";
import PromptActiveDesactive from "./../../common/mixins/PromptActiveDesactive";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
export default {
  mixins: [useHTTP, useData, PromptActiveDesactive, useRule],
  components: {
    ModalCadastroGestor
  },
  data: () => ({
    modalCadastroGestor: false,
    descriptionItems: [3, 5, 15, 30, 50, 100],
    rules: {}
  }),
  methods: {
    async activeGestor(item) {
      this.activeConfirm(item.nome, "pessoas/" + item.id, async val => {
        if (val) await this.fetchGestores(true);
      });
    },
    async desactiveGestor(item) {
      this.deleteConfirm(item.nome, "pessoas/" + item.id, async val => {
        if (val) await this.fetchGestores(true);
      });
    },
    toDetail(id) {
      this.$router.push("/administracao/gestor/" + id);
    }
  },
  mounted() {
    this.fetchGestores(true);
    this.route = "gestor";
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
