import useHTTP from "./useHTTP";
import cep from "@/store/cep";
import moment from "moment";

moment.locale("pt-br");

const useData = {
  data: () => ({
    routes: {
      estados: "enderecos/estados"
    },
    types: {
      todos: "&todos=1"
    }
  }),
  mixins: [useHTTP],
  methods: {
    async fetchApi(route, loading = false, custom = "") {
      const res = await this.fetchData(`${route}?${custom}`, loading);
      return res;
    },
    async fetchAlunos(loading = false, custom = "") {
      const res = await this.fetchData(`alunos?${custom}`, loading);
      return res;
    },
    async fetchFichas(loading = false, custom = "") {
      const res = await this.fetchData(`fichas?${custom}`, loading);
      return res;
    },
    async fetchFichaById(loading = false, id, custom = "") {
      const res = await this.fetchData(`fichas/${id}?${custom}`, loading);
      return res;
    },
    async fetchFichaByIdAluno(loading = false, id, custom = "") {
      const res = await this.fetchData(`fichas/aluno/${id}?${custom}`, loading);
      return res;
    },
    async fetchAlunosSemLista(loading = false, custom = "") {
      const res = await this.fetchData(
        `pessoas/aluno/sem-lista?${custom}`,
        loading
      );
    },
    async fetchAlunosNaLista(id, loading = false, custom = "") {
      const res = await this.fetchData(
        "pessoas/aluno/lista/" + id + `?${custom}`,
        loading
      );
    },
    async fetchTipoBecas(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/becas?${custom}`, loading);
      return res;
    },
    async fetchTipoBecaById(loading = false, id) {
      const res = await this.fetchData(`tipos/becas/${id}`, loading);
      return res;
    },
    async fetchUsuarios(loading = false, custom = "") {
      const res = await this.fetchData(`usuarios?${custom}`, loading);
      return res;
    },
    async fetchFormasPagamento(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/pagamentos?${custom}`, loading);
      return res;
    },
    async fetchFormaPagamentoById(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `tipos/pagamentos/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchTipoProdutos(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/produtos?${custom}`, loading);
      return res;
    },
    async fetchTipoProdutoById(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `tipos/produtos/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchTipoContatos(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/contatos?${custom}`, loading);
      return res;
    },
    async fetchCursos(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/cursos?${custom}`, loading);
      return res;
    },
    async fetchCursoById(loading = false, id, custom = "") {
      const res = await this.fetchData(`tipos/cursos/${id}?${custom}`, loading);
      return res;
    },
    async fetchTurmas(loading = false, custom = "") {
      const res = await this.fetchData(`tipos/turmas?${custom}`, loading);
      return res;
    },
    async fetchTurmaById(loading = false, id, custom = "") {
      const res = await this.fetchData(`tipos/turmas/${id}?${custom}`, loading);
      return res;
    },
    async fetchVendas(loading = false, custom = "") {
      const res = await this.fetchData(`vendas?${custom}`, loading);
      return res;
    },
    async fetchVendasRelacionadasById(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `vendas/relacionadas/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchBoletos(loading = false, custom = "") {
      const res = await this.fetchData(`boletos?${custom}`, loading);
      return res;
    },
    async fetchVendaById(loading = false, id, custom = "") {
      const res = await this.fetchData(`vendas/${id}?${custom}`, loading);
      return res;
    },
    async fetchVendaByIdSacado(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `vendas/sacado/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchRestricoesByIdSacado(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `negativados/sacado/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchBoletosByIdSacado(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `boletos/sacado/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchParametros(loading = false, custom = "") {
      const res = await this.fetchData(`parametros?${custom}`, loading);
    },
    async fetchLogs(loading = false, custom = "") {
      const res = await this.fetchData(`logs?${custom}`, loading);
      return res;
    },
    async fetchVendaDados(loading = false, custom = "") {
      const res = await this.fetchData(
        `vendas/report/status?${custom}`,
        loading
      );
      return res;
    },
    async fetchServicos(data, loading = false, custom = "") {
      const res = await this.simplePost(
        `lista-alunos/data?${custom}`,
        data,
        loading
      );
      return res;
    },
    async fetchServicosNaoRealizados(loading = false, data, custom = "") {
      const res = await this.simplePost(
        `lista-alunos/nao-executados/data?${custom}`,
        data,
        loading
      );
      return res;
    },
    async fetchVendaParcelasById(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `vendas/parcelas/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchEstadoById(loading = false, id) {
      const res = await this.fetchData(`enderecos/estados/${id}`, loading);
      return res;
    },
    async fetchCidadeById(loading = false, id) {
      const res = await this.fetchData(`enderecos/cidades/${id}`, loading);
      return res;
    },
    async fetchBairroById(loading = false, id) {
      const res = await this.fetchData(`enderecos/bairros/${id}`, loading);
      return res;
    },
    async fetchEstados(loading = false, custom = "") {
      const res = await this.fetchData(`enderecos/estados?${custom}`, loading);
      return res;
    },

    async fetchCidades(loading = false, custom = "") {
      const res = await this.fetchData(`enderecos/cidades?${custom}`, loading);
      return res;
    },

    async fetchBairros(loading = false, custom = "") {
      const res = await this.fetchData(`enderecos/bairros?${custom}`, loading);
      return res;
    },

    async fetchBairrosSemGrupoByCidade({ id, loading = true, custom = "" }) {
      const res = await this.fetchData(
        `enderecos/bairros/sem-grupo/${id}?${custom}`,
        loading
      );
      return res;
    },

    async fetchInstituicoes(loading = false, custom = "") {
      const res = await this.fetchData(`instituicoes?${custom}`, loading);
      return res;
    },
    async fetchInstituicaoById(loading = false, id, custom = "") {
      const res = await this.fetchData(`instituicoes/${id}?${custom}`, loading);
      return res;
    },

    async fetchServicoMidias(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `ficha-midias/os/${id}?${custom}`,
        loading
      );
      return res;
    },

    async fetchContratos(loading = false, custom = "") {
      const res = await this.fetchData(`contratos?${custom}`, loading);
      return res;
    },

    async fetchContratoById(loading = false, id) {
      const res = await this.fetchData(`contratos/${id}`, loading);
      return res;
    },

    async fetchContasReceber(loading = false, custom = "") {
      const res = await this.fetchData(`vendas?${custom}`, loading);
      return res;
    },

    async fetchContasReceberById(loading = false, id) {
      const res = await this.fetchData(`vendas/${id}`, loading);
      return res;
    },

    async fetchNegativados(loading = false, custom = "") {
      const res = await this.fetchData(`negativados?${custom}`, loading);
      return res;
    },

    async fetchNegativadoById(loading = false, id) {
      const res = await this.fetchData(`negativados/${id}`, loading);
      return res;
    },

    async fetchNegativadoByIdSacado(loading = false, id) {
      const res = await this.fetchData(`negativados/sacado/${id}`, loading);
      return res;
    },

    async fetchContratoByNumero(loading = false, id) {
      const res = await this.fetchData(`contratos/numero/${id}`, loading);
      return res;
    },

    async fetchListas(loading = false, custom = "") {
      const res = await this.fetchData(`listas?${custom}`, loading);
      return res;
    },

    async fetchListaById(loading = false, id, custom = "") {
      const res = await this.fetchData(`listas/${id}${custom}`, loading);
      return res;
    },

    async fetchVendaAtrasadas(loading = false, custom = "") {
      const res = await this.fetchData(`venda/atrasada?${custom}`, loading);
      return res;
    },

    async fetchVendedores(loading = false, custom = "") {
      const res = await this.fetchData(`vendedores?${custom}`, loading);
      return res;
    },
    async fetchVendedorById(loading = false, id, custom = "") {
      const res = await this.fetchData(`vendedores/${id}?${custom}`, loading);
      return res;
    },

    async fetchAllBairroGrupamentos(loading = false, custom = "") {
      const res = await this.fetchData(`bairro_grupamentos?${custom}`, loading);
      return res;
    },
    async fetchBairroGrupamentoById(loading = false, id, custom = "") {
      const res = await this.fetchData(
        `enderecos/bairro_grupamentos/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchAllBairrosFromGrupamentoById(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `grupamento/bairros/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchCidadesByIdEstado({ id, loading = false, custom = "" }) {
      const res = await this.fetchData(
        `enderecos/cidades/estado/${id}?${custom}`,
        loading
      );
      return res;
    },

    async fetchBairrosByIdCidade({ id, loading = false, custom = "" }) {
      const res = await this.fetchData(
        `enderecos/bairros/cidade/${id}?${custom}`,
        loading
      );
      return res;
    },

    async fetchCursosByIdInstituicao({ id, loading = false, active = true }) {
      const res = await this.fetchData(
        `cursos/instituicao/${id}?${custom}`,
        loading
      );
      return res;
    },

    async consultarCep(value) {
      const data = await cep(value);
      if (data != null) {
        return data;
      }
      return null;
    },

    async fetchGestores(loading = false, custom = "") {
      const res = await this.fetchData(
        `pessoas/tipo/GESTOR?${custom}`,
        loading
      );
      return res;
    },

    async fetchGestorById(id, loading = false, custom = "") {
      const res = await this.fetchData(`pessoas/${id}?${custom}`, loading);
      return res;
    },
    async fetchAlunoById(loading = false, id, custom = "") {
      const res = await this.fetchData(`alunos/${id}?${custom}`, loading);
      return res;
    },
    async fetchSacados(loading = false, custom = "") {
      const res = await this.fetchData(`sacados?${custom}`, loading);
      return res;
    },
    async fetchSacadoById(loading = false, id, custom = "") {
      const res = await this.fetchData(`sacados/${id}?${custom}`, loading);
      return res;
    },
    async fetchVendedorById(loading = false, id, custom = "") {
      const res = await this.fetchData(`vendedores/${id}?${custom}`, loading);
      return res;
    },
    async fetchContatosByIdPessoa(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `contatos/pessoa/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchContatosByIdInstituicao(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `contatos/instituicao/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchAllContatosByIdPessoa(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `contatos/pessoa/todos/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchAssociadosByIdPessoa(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `pessoas/associados/${id}?${custom}`,
        loading
      );
      return res;
    },
    async fetchAssociadosByIdPessoaWithAluno(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `pessoas/associados/withaluno/${id}?${custom}`,
        loading
      );
      return res;
    },

    async fetchAllAssociadosByIdPessoa(id, loading = false, custom = "") {
      const res = await this.fetchData(
        `pessoas/associados/todos/${id}?${custom}`,
        loading
      );
      return res;
    },
    /**
     * Data a data atual
     * @returns {Date}
     */
    getCurrentDate() {
      return new Date().toISOString().substr(0, 10);
    },
    hasProperty(object, key) {
      if (!object.hasOwnProperty(key)) return false;
      if (object[key] == null) return false;
      return true;
    },
    formatDate(date) {
      let d = moment(date).format("YYYY-MM-DD");
      if (d.length <= 10) return d;
      return moment().format("YYYY-MM-DD");
    },
    formatDateBrasil(date) {
      let d = moment(date).format("DD/MM/YYYY");
      if (d.length <= 10) return d;
      return "";
    },
    formatDateTimeBrasil(date) {
      let d = moment(date).format("DD/MM/YYYY HH:mm:ss");
      return d;
    },
    addDaysToDate(date, days) {
      return moment(date)
        .add(days, "days")
        .format("YYYY-MM-DD");
    },
    addMonthsToDate(date, months) {
      return moment(date)
        .add(months, "months")
        .format("YYYY-MM-DD");
    },
    formatMoney() {
      return {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      };
    },
    /**
     * Retorna uma string formatada de forma monetaria (BRL)
     * @param {string} money
     * @returns {string}
     */
    formatMoneyBrasil(money) {
      if (money == null || money == undefined) money = 0;
      money = money.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      });
      return money;
    },
    /**
     * Diferença de dias entre duas datas
     * @param {Date} date
     * @param {Date} date2
     * @returns {number}
     */
    diffDates(date, date2) {
      var a = moment(date);
      var b = moment(date2);
      return a.diff(b, "days");
    },
    toDetailAluno(id) {
      this.$router.push("/administracao/alunos/" + id);
    }
  }
};

export default useData;
