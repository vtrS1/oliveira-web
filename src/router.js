import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/administracao/instituicoes",
          name: "instituicoes",
          component: () => import("./views/administracao/Instituicao.vue")
        },
        {
          path: "/administracao/instituicoes/:id",
          name: "instituicoesDetail",
          component: () =>
            import(
              "./views/administracao/instituicao/PageInstituicaoDetail.vue"
            )
        },
        {
          path: "/administracao/alunos",
          name: "alunos",
          component: () => import("./views/administracao/Aluno.vue")
        },
        {
          path: "/administracao/sacados",
          name: "sacados",
          component: () => import("./views/administracao/Sacados.vue")
        },
        {
          path: "/administracao/alunos/:id",
          name: "alunosDetail",
          component: () =>
            import("./views/administracao/aluno/PageAlunoDetail.vue")
        },
        {
          path: "/administracao/sacados/:id",
          name: "sacadosDetail",
          component: () =>
            import("./views/administracao/sacado/PageSacadoDetail.vue")
        },
        {
          path: "/administracao/vendedores/:id",
          name: "vendedoresDetail",
          component: () =>
            import("./views/administracao/vendedor/PageVendedorDetail.vue")
        },
        {
          path: "/administracao/associados/:id",
          name: "associadosDetail",
          component: () =>
            import("./views/administracao/aluno/PageAssociadoDetail.vue")
        },
        {
          path: "/administracao/fichas",
          name: "fichas",
          component: () => import("./views/administracao/Ficha.vue")
        },
        {
          path: "/administracao/contratos",
          name: "contratos",
          component: () => import("./views/administracao/Contrato.vue")
        },
        {
          path: "/administracao/usuarios",
          name: "usuarios",
          component: () => import("./views/administracao/Usuarios.vue")
        },
        {
          path: "/administracao/vendedores",
          name: "vendedores",
          component: () => import("./views/administracao/Vendedores.vue")
        },
        {
          path: "/administracao/permissoes",
          name: "permissoes",
          component: () => import("./views/administracao/Permissoes.vue")
        },
        {
          path: "/administracao/gestor",
          name: "gestor",
          component: () => import("./views/administracao/Gestor.vue")
        },
        {
          path: "/administracao/gestor/:id",
          name: "gestorDetail",
          component: () =>
            import("./views/administracao/gestor/PageGestorDetail.vue")
        },
        {
          path: "/financeiro",
          name: "financeiro",
          component: () => import("./views/Financeiro.vue")
        },
        {
          path: "/financeiro/contas/receber",
          name: "financeiro-contas-receber",
          component: () => import("./views/financeiro/ContasReceber.vue")
        },
        {
          path: "/financeiro/contas/receber/:id",
          name: "financeiro-contas-receber-detail",
          component: () =>
            import("./views/financeiro/PageContasReceberDetail.vue")
        },
        {
          path: "/financeiro/boletos",
          name: "financeiro-boletos",
          component: () => import("./views/financeiro/Boletos.vue")
        },
        {
          path: "/financeiro/descontos",
          name: "financeiro-descontos",
          component: () => import("./views/financeiro/Desconto.vue")
        },
        {
          path: "/financeiro/renegociar",
          name: "financeiro-renegociar",
          component: () => import("./views/financeiro/Renegociar.vue")
        },
        {
          path: "/financeiro/inadimplentes",
          name: "financeiro-inadimplentes",
          component: () => import("./views/financeiro/Inadimplentes.vue")
        },
        {
          path: "/financeiro/boletos/venda/:id",
          name: "financeiro-boletos-venda",
          component: () => import("./views/financeiro/PageBoletosVenda.vue")
        },
        {
          path: "/financeiro/boletos/:id",
          name: "financeiro-boletos-detail",
          component: () => import("./views/financeiro/BoletoDetailPage.vue")
        },
        {
          path: "/operacoes",
          name: "operacoes",
          component: () => import("./views/Operacoes.vue")
        },
        {
          path: "/cadastro",
          name: "cadastro",
          component: () => import("./views/Cadastro.vue")
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("./views/pages/Profile.vue")
        },
        {
          path: "/ajustes",
          name: "ajustes",
          component: () => import("./views/Ajustes.vue")
        },
        {
          path: "/logs",
          name: "logs",
          component: () => import("./views/Logs.vue")
        },
        {
          path: "/help",
          name: "help",
          component: () => import("./views/Ajuda.vue")
        },
        {
          path: "/zoneamento",
          name: "zoneamento",
          component: () => import("./views/Zoneamento.vue")
        },
        {
          path: "/zoneamento/:id",
          name: "zoneamento-detail",
          component: () => import("./views/zoneamento/PageZoneamentoDetail.vue")
        },
        {
          path: "/cadastro/estado",
          name: "estado",
          component: () => import("./views/cadastro/Estado.vue")
        },
        {
          path: "/cadastro/cidade",
          name: "cidade",
          component: () => import("./views/cadastro/Cidade.vue")
        },
        {
          path: "/cadastro/bairro",
          name: "bairro",
          component: () => import("./views/cadastro/Bairro.vue")
        },
        {
          path: "/cadastro/forma-pagamentos",
          name: "forma-pagamento",
          component: () => import("./views/cadastro/FormaPagamento.vue")
        },
        {
          path: "/cadastro/bairro-grupamento",
          name: "bairro-grupamentos",
          component: () => import("./views/cadastro/BairroGrupamento.vue")
        },
        {
          path: "/cadastro/bairro-grupamento/:id",
          name: "bairro-grupamentos-detail",
          component: () =>
            import(
              "./views/cadastro/grupamentoBairro/PageBairroGrupamentoDetail.vue"
            )
        },
        {
          path: "/cadastro/tipo-contato",
          name: "tipo-contato",
          component: () => import("./views/cadastro/TipoContato.vue")
        },
        {
          path: "/cadastro/tipo-becas",
          name: "tipo-becas",
          component: () => import("./views/cadastro/Beca.vue")
        },
        {
          path: "/cadastro/tipo-foto",
          name: "tipo-foto",
          component: () => import("./views/cadastro/TipoFoto.vue")
        },
        {
          path: "/cadastro/tipo-cursos",
          name: "tipo-cursos",
          component: () => import("./views/cadastro/Cursos.vue")
        },
        {
          path: "/cadastro/tipo-turmas",
          name: "tipo-turmas",
          component: () => import("./views/cadastro/Turmas.vue")
        },
        {
          path: "/relatorios/servicos",
          name: "relatorio-servico",
          component: () => import("./views/relatorios/Servicos.vue")
        },
        {
          path: "/relatorios/servicos-nao-realizados",
          name: "relatorio-servico-nao-realizados",
          component: () =>
            import("./views/relatorios/ServicosNaoRealizados.vue")
        },
        {
          path: "/relatorios/servicos/:id",
          name: "relatorio-servico-detail",
          component: () => import("./views/relatorios/PageServicoDetail.vue")
        },

        {
          path: "/relatorios/comissoes",
          name: "relatorio-comissoes",
          component: () => import("./views/relatorios/Comissoes.vue")
        },
        {
          path: "/relatorios/becas",
          name: "relatorio-becas",
          component: () => import("./views/relatorios/Becas.vue")
        },
        {
          path: "/relatorios/escolas",
          name: "relatorio-escolas",
          component: () => import("./views/relatorios/Escolas.vue")
        },
        {
          path: "/relatorios/cobranca-situacao",
          name: "relatorio-cobranca-situacao",
          component: () => import("./views/relatorios/CobrancaSituacao.vue")
        },
        {
          path: "/relatorios/desempenho-vendedor",
          name: "relatorio-desempenho-vendedor",
          component: () => import("./views/relatorios/DesempenhoVendedor.vue")
        },
        {
          path: "/relatorios/contas-receber",
          name: "relatorio-contas-receber",
          component: () => import("./views/relatorios/ContasReceber.vue")
        },
        {
          path: "/relatorios/vendas-vendedor",
          name: "relatorio-vendas-vendedor",
          component: () => import("./views/relatorios/VendasVendedor.vue")
        },
        {
          path: "/relatorios/contratos-inadimplentes",
          name: "relatorio-contratos-inadimplentes",
          component: () =>
            import("./views/relatorios/ContratosInadimplentes.vue")
        },
        {
          path: "/relatorios/contratos-situacao",
          name: "relatorio-contratos-situacao",
          component: () => import("./views/relatorios/ContratosSituacao.vue")
        },
        {
          path: "/relatorios/ficha-contrato-consolidado",
          name: "relatorio-ficha-contrato-consolidado",
          component: () =>
            import("./views/relatorios/ContratosConsolidados.vue")
        },
        {
          path: "/relatorios/ficha-contratos",
          name: "relatorio-ficha-contratos",
          component: () => import("./views/relatorios/FichasContrato.vue")
        },
        {
          path: "/relatorios/listas",
          name: "relatorio-listas",
          component: () => import("./views/relatorios/Listas.vue")
        },
        {
          path: "/atendimento",
          name: "atendimento",
          component: () => import("./views/Atendimento.vue")
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/pages/login",
          name: "page-login",
          component: () => import("@/views/pages/Login.vue")
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue")
        },
        {
          path: "/qr-contas",
          name: "page-qr-contas",
          component: () => import("@/views/BoletoQr.vue")
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
