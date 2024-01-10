<template lang="html">
  <vs-card>
    <TableSSR
      :title="`Fichas ${subtitle}`"
      route="fichas"
      :search="true"
      :key="tableKey"
      :customInit="`order=id&sort=desc&aluno=1&beca=1&produto=1&contrato=1&os=1${custom}`"
      :customSearch="`order=id&sort=desc&aluno=1&beca=1&produto=1&contrato=1&os=1${custom}`"
      :customPageChange="`order=id&sort=desc&aluno=1&beca=1&produto=1&contrato=1&os=1${custom}`"
      v-if="hasAccess('show')"
    >
    
      <template slot="head">
        <vs-th sort-key="id"> Ficha </vs-th>
        <vs-th sort-key="id"> Número </vs-th>
        <vs-th sort-key="pessoas_nome"> Aluno </vs-th>
        <vs-th sort-key="contrato"> Contrato </vs-th>
        <vs-th sort-key="qtd_foto"> Qtd. Fotos </vs-th>
        <vs-th sort-key="tamanho_beca"> Tam. da beca </vs-th>
        <vs-th sort-key="id_tipo"> Tipo </vs-th>
        <vs-th sort-key="status"> Situação </vs-th>
        <vs-th> Ações </vs-th>
      </template>

      <template slot="actions">
          <ModalCreateFicha @update="() => tableKey++" v-if="hasAccess('create')" />
      </template>

      <template slot="body" slot-scope="{ data }">
        <vs-tr
          :key="indextr"
          v-for="(tr, indextr) in data"
       
        >
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].numero">
            {{ data[indextr].numero }}
          </vs-td>

          <vs-td :data="data[indextr].aluno">
            <vs-chip @click.native="toDetailAluno(data[indextr].aluno.id)">
            {{ data[indextr].aluno && data[indextr].aluno.nome ? data[indextr].aluno.id + ' - ' + data[indextr].aluno.nome : ''}}
          </vs-chip></vs-td>

          <vs-td :data="data[indextr].id_contrato">
            {{ data[indextr].id_contrato }}
          </vs-td>

          <vs-td :data="data[indextr].qtd_foto">
            <div v-if="data[indextr].qtd_foto">
              {{ data[indextr].qtd_foto }}
            </div>
            <div v-else>
              <vs-chip color="warning">
                Preencha
              </vs-chip>
            </div>
          </vs-td>

          <vs-td :data="data[indextr].tipoBeca">
            <div v-if="data[indextr].tipoBeca">
              {{ data[indextr].tipoBeca && data[indextr].tipoBeca.nome ? data[indextr].tipoBeca.nome : '' }}
            </div>
            <div v-else>
              <vs-chip color="warning">
                Preencha
              </vs-chip>
            </div>
          </vs-td>


          <vs-td :data="data[indextr].tipoProduto">
            <div v-if="data[indextr].tipoProduto">
              {{ data[indextr].tipoProduto && data[indextr].tipoProduto.nome ? data[indextr].tipoProduto.nome : '' }}
            </div>
            <div v-else>
              <vs-chip color="danger">
                Preencha
              </vs-chip>
            </div>
          </vs-td>

          <vs-td :data="data[indextr].status">
            
            <vs-chip
              v-if="data[indextr].os != null"
              color="primary"
              class="cursor-pointer"
              @click.native="toDetailLista(data[indextr].os.id_lista)"
            >
              {{ 'Em rota ' + data[indextr].os.id_lista }}</vs-chip
            >
            <span v-else>{{ data[indextr].situacao }}</span>
          </vs-td>
          </vs-td>

          <vs-td :data="data[indextr].id" style="width: 150px">
            <vs-row vs-justify="flex-end">
              <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  v-if="hasAccess('update')"
                  vs-w="6"
                >
                  <ModalEditFicha
                    :ficha="data[indextr]"
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
                <vs-button
                  v-if="data[indextr].status"
                  icon="toggle_on"
                  color="success"
                  type="flat"
                  size="large"
                  @click="desactiveFicha(data[indextr])"
                ></vs-button>
                <vs-button
                  v-if="!data[indextr].status"
                  icon="toggle_off"
                  size="large"
                  type="flat"
                  @click="activeFicha(data[indextr])"
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
</template>

<script>
import PromptActiveDesactive from "@/common/mixins/PromptActiveDesactive";
import ModalCreateFicha from "./ficha/ModalCreateFicha";
import ModalEditFicha from "./ficha/ModalEditFicha";
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import TableSSR from '@/components/TableSSR';
export default {
  mixins: [useHTTP, useRule, useData, PromptActiveDesactive],
  components: {
    ModalCreateFicha,
    ModalEditFicha,
    TableSSR
  },
  data: () => ({
    fichas: [],
    tableKey: 0,
    subtitle: "",
    custom: ""
  }),
  methods: {
    async activeFicha(item) {
      this.activeConfirm("Ficha " + item.id, "fichas/" + item.id, async val => {
        if (val) this.tableKey++;
      });
    },
    async desactiveFicha(item) {
      this.deleteConfirm("Ficha " + item.id, "fichas/" + item.id, async val => {
        if (val) this.tableKey++;
      });
    },
      toDetailLista(id) {
      this.$router.push("/zoneamento/" + id);
    },
  },
  mounted() {
    this.route = "ficha";
    if (this.$route.query.idAluno != undefined) {
      this.subtitle = " do aluno " + this.$route.query.idAluno;
      this.custom = this.$route.query.idAluno
        ? `&idAluno=${this.$route.query.idAluno}`
        : "";
    } else if (this.$route.query.id) {
      this.subtitle = " com o ID #" + this.$route.query.id;
      this.custom = this.$route.query.id
        ? `&id=${this.$route.query.id}`
        : "";
    }
  }
};
</script>
