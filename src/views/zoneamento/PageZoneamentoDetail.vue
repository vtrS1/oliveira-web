<template>
  <div>
    <vs-card>
      <div class="w-full flex flex-wrap justify-between">
        <div class="pt-3 flex pl-2 flex-wrap">
          <vs-button
            class="float-left mt-3"
            color="success"
            icon="arrow_back_ios"
            @click="() => $router.back()"
            type="flat"
          ></vs-button>
          <vs-breadcrumb align="left">
            <div class="vs-list--title text-xl mb-2 mt-2">Lista {{ listaDetail.id }}</div>
          </vs-breadcrumb>
        </div>
        <div class="pt-3 pr-5">
          <vs-button
            class="float-right"
            v-if="hasAccess('update')"
            @click="update"
            color="success"
            icon="done"
            >Atualizar</vs-button
          >
        </div>
      </div>
      <form class="ml-8" v-if="hasAccess('update')">
        <div class="flex vx-row w-full">
          <div class="w-6/12 mt-0 my-2">
            <SelectVendedor
              :disabled="true"
              :key="listaDetail.id_vendedor"
              :initialId="listaDetail.id_vendedor"
              @update="(val) => setValue('id_vendedor', val)"
            />
          </div>

          <div class="w-2/12 mt-0 my-2 pl-2">
            <label class="text-sm">Data de início</label>
            <vs-input
              class="w-full pr-2 mt-0"
              v-model="listaDetail.data_inicio"
              type="date"
            />
          </div>
          <div class="w-2/12 mt-0 my-2">
            <label class="text-sm">Data final</label>
            <vs-input
              class="w-full pr-2 mt-0"
              v-model="listaDetail.data_conclusao"
              type="date"
            />
          </div>
          <div class="w-2/12 mt-0 my-2">
            <label class="text-sm">Data da entregada da lista</label>
            <vs-input
              class="w-full pr-2 mt-0"
              v-model="listaDetail.data_entrega"
              type="date"
            />
          </div>
        </div>
      </form>

      <div class="ml-4 mr-6 mb-2">
        <vs-alert active="true">
          Para remover uma OS da lista você deve clicar no botão "Remover" ao lado da OS.
          Verifique se o STATUS da mesma esta correto antes da remoção.
        </vs-alert>
      </div>

      <vs-tabs>
        <vs-tab label="Fichas na lista">
          <div>
            <TableSSR
              title=""
              :route="`fichas/na-lista/${$route.params.id}`"
              :search="true"
              :key="tableInListKey"
              customInit="order=id&sort=desc&endereco=1&grupamento=1"
              customSearch="order=id&sort=desc&endereco=1&grupamento=1"
              customPageChange="order=id&sort=desc&endereco=1&grupamento=1"
              v-if="hasAccess('show')"
            >
              <template slot="head">
                <vs-th sort-key="os">OS</vs-th>
                <vs-th sort-key="nome">Nome</vs-th>
                <vs-th sort-key="fichas">Contrato e Ficha</vs-th>
                <vs-th sort-key="estado"> Estado </vs-th>
                <vs-th sort-key="cidade"> Cidade </vs-th>
                <vs-th sort-key="bairro"> Bairro </vs-th>
                <vs-th sort-key="bairro"> Zona </vs-th>
                <vs-th sort-key="obs">Obs</vs-th>
                <vs-th sort-key="status">Situação</vs-th>
                <vs-th>Opções</vs-th>
              </template>

              <template slot="body" slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    {{ data[indextr].id }}
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <vs-chip
                      color="primary"
                      class="cursor-pointer"
                      @click.native="toDetailAluno(data[indextr].ficha.id_aluno)"
                    >
                      {{ data[indextr].ficha.aluno.nome }}</vs-chip
                    >
                  </vs-td>

                  <vs-td :data="data[indextr].ficha.id_contrato">
                    <vs-chip color="primary">
                      Contrato: {{ data[indextr].ficha.id_contrato }}</vs-chip
                    >
                    <vs-chip
                      color="primary"
                      @click.native="toFichaDetail(data[indextr].ficha.id)"
                      class="cursor-pointer"
                    >
                      Ficha: {{ data[indextr].ficha.numero }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].ficha.aluno.estado
                        ? data[indextr].ficha.aluno.estado.nome
                        : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].ficha.aluno.cidade
                        ? data[indextr].ficha.aluno.cidade.nome
                        : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].ficha.aluno.bairro
                        ? data[indextr].ficha.aluno.bairro.nome
                        : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].ficha.aluno.bairro &&
                      data[indextr].ficha.aluno.bairro.bairroGrupamento &&
                      data[indextr].ficha.aluno.bairro.bairroGrupamento.length > 0
                        ? data[indextr].ficha.aluno.bairro.bairroGrupamento[0].nome
                        : ""
                    }}
                  </vs-td>

                  <vs-td :data="data[indextr].obs">
                    {{ data[indextr].obs }}
                  </vs-td>

                  <vs-td :data="data[indextr].situacao">
                    {{
                      data[indextr].situacao != "Outro"
                        ? data[indextr].situacao
                        : data[indextr].situacao +
                          ` (Obs do vendedor: ${data[indextr].obs})`
                    }}
                  </vs-td>

                  <vs-td :data="data[indextr].id" style="width: 150px">
                    <vs-row vs-justify="flex-end" v-if="hasAccess('update')">
                      <vs-col
                        vs-type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-w="6"
                      >
                        <ModalEditarPessoaLista
                          :os="data[indextr]"
                          @update="() => tableInListKey++"
                        />
                      </vs-col>
                      <vs-col
                        vs-type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-w="6"
                      >
                        <vs-button
                          v-if="data[indextr].situacao != 'Vendida'"
                          icon="remove"
                          color="danger"
                          @click="removeFromList(data[indextr])"
                        ></vs-button> </vs-col
                    ></vs-row>
                  </vs-td>
                </vs-tr>
              </template>
            </TableSSR>
          </div>
        </vs-tab>
        <vs-tab label="Fichas sem lista">
          <div>
            <TableSSR
              title=""
              route="fichas/sem-lista"
              :search="true"
              :key="tableWithoutListKey"
              customInit="order=id&sort=desc&endereco=1"
              customSearch="order=id&sort=desc&endereco=1"
              customPageChange="order=id&sort=desc&endereco=1"
              v-if="hasAccess('show')"
            >
              <template slot="head">
                <vs-th sort-key="id"> Ficha </vs-th>
                <vs-th sort-key="id_contrato"> Contrato </vs-th>
                <vs-th sort-key="nome"> Aluno </vs-th>
                <vs-th sort-key="estado"> Estado </vs-th>
                <vs-th sort-key="cidade"> Cidade </vs-th>
                <vs-th sort-key="bairro"> Bairro </vs-th>
                <vs-th sort-key="bairro"> Zona </vs-th>
                <vs-th> Opções </vs-th>
              </template>

              <template slot="body" slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <vs-chip
                      color="primary"
                      @click.native="toFichaDetail(data[indextr].id)"
                      class="cursor-pointer"
                    >
                      ID: {{ data[indextr].id }} - Nº:
                      {{ data[indextr].numero }}
                    </vs-chip>
                  </vs-td>

                  <vs-td :data="data[indextr].id_contrato">
                    <vs-chip color="primary">
                      Contrato: {{ data[indextr].id_contrato }}</vs-chip
                    >
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    <vs-chip
                      color="primary"
                      class="cursor-pointer"
                      @click.native="toDetailAluno(data[indextr].id_aluno)"
                      >{{
                        data[indextr].aluno.id + " - " + data[indextr].aluno.nome
                      }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].aluno.estado ? data[indextr].aluno.estado.nome : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].aluno.cidade ? data[indextr].aluno.cidade.nome : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].aluno.bairro ? data[indextr].aluno.bairro.nome : ""
                    }}
                  </vs-td>

                  <vs-td>
                    {{
                      data[indextr].aluno.bairro &&
                      data[indextr].aluno.bairro.bairroGrupamento &&
                      data[indextr].aluno.bairro.bairroGrupamento.length > 0
                        ? data[indextr].aluno.bairro.bairroGrupamento[0].nome
                        : ""
                    }}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    <vs-button
                      v-if="hasAccess('create')"
                      class="mr-2 float-right"
                      color="success"
                      type="filled"
                      @click="addToList(data[indextr])"
                      icon="add"
                    ></vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </TableSSR>
          </div>
        </vs-tab>
      </vs-tabs>
    </vs-card>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import Validators from "@/common/mixins/Validators";
import useData from "@/common/mixins/useData";
import ModalEditarPessoaLista from "./ModalEditarPessoaLista";
import useRule from "@/common/mixins/useRule.js";
import SelectVendedor from "@/components/SelectVendedor";
import TableSSR from "@/components/TableSSR";
export default {
  mixins: [useHTTP, useData, useRule, Validators],
  components: {
    ModalEditarPessoaLista,
    SelectVendedor,
    TableSSR,
  },
  data: () => ({
    form: {},
    listaDetail: {},
    errors: [],
    currentAluno: {},
    tableInListKey: 0,
    tableWithoutListKey: 0,
    showModalSelecionarFicha: false,
  }),
  methods: {
    async update() {
      const res = await this.updateData(
        `listas/${this.listaDetail.id}`,
        this.listaDetail
      );
      if (res != null) {
        const data = await this.fetchListaById(
          true,
          this.$route.params.id,
          `?vendedor=1`
        );
        if (data != null) {
          this.listaDetail = data;
          this.$forceUpdate();
        }
      }
    },
    async removeFromList(os) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirmação`,
        acceptText: "Sim",
        cancelText: "Cancelar",
        text: `Tem certeza que deseja remover essa OS(${os.id}) da lista?`,
        accept: async () => {
          const res = await this.updateData(`os/${os.id}`, { status: 0 });
          if (res != null) {
            this.tableInListKey++;
            this.tableWithoutListKey++;
          }
        },
      });
    },
    async addToList(data) {
      const res = await this.createData("os", {
        id_lista: parseInt(this.$route.params.id),
        id_aluno: data.id_aluno,
        id_ficha: data.id,
      });
      if (res != null) {
        this.tableWithoutListKey++;
      }
    },
    toDetailAluno(id) {
      this.$router.push("/administracao/alunos/" + id);
    },
    toFichaDetail(id) {
      this.$router.push("/administracao/fichas?id=" + id);
    },
  },
  async mounted() {
    this.route = "lista";
    const res = await this.fetchListaById(true, this.$route.params.id, `?vendedor=1`);
    if (res != null) {
      this.listaDetail = res;
      this.$forceUpdate();
    }
  },
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
