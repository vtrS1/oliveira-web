/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: "/",
    name: "Início",
    slug: "inicio",
    icon: "HomeIcon"
  },
  {
    url: "/administracao",
    name: "Administrativo",
    slug: "administracao",
    icon: "SettingsIcon",
    submenu: [
      // {
      //   url: "/administracao/gestor",
      //   name: "Gestor",
      //   slug: "gestor"
      // },
      {
        url: "/administracao/instituicoes",
        name: "Instituições",
        slug: "instituicoes"
      },

      {
        url: "/administracao/contratos",
        name: "Contratos",
        slug: "contratos"
      },
      {
        url: "/administracao/alunos",
        name: "Alunos",
        slug: "alunos"
      },
      {
        url: "/administracao/sacados",
        name: "Sacados",
        slug: "sacados"
      },
      {
        url: "/administracao/fichas",
        name: "Fichas",
        slug: "fichas"
      },

      {
        url: "/administracao/vendedores",
        name: "Vendedores",
        slug: "vendedores"
      },
      {
        url: "/administracao/usuarios",
        name: "Usuários",
        slug: "usuarios"
      }
    ]
  },
  {
    url: "/financeiro",
    name: "Financeiro",
    slug: "financeiro",
    icon: "DollarSignIcon",
    submenu: [
      {
        url: "/financeiro/contas/receber",
        name: "Contas a Receber",
        slug: "contas-a-receber"
      },
      {
        url: "/financeiro/boletos",
        name: "Boletos",
        slug: "boletos"
      },
      {
        url: "/financeiro/descontos",
        name: "Descontos",
        slug: "descontos"
      },
      // {
      //   url: "/qr-contas",
      //   name: "Boletos QR",
      //   slug: "boletos-qr"
      // },
      {
        url: "/financeiro/renegociar",
        name: "Renegociar",
        slug: "renegociar"
      },
      {
        url: "/financeiro/inadimplentes",
        name: "Inadimplentes",
        slug: "inadimplentes"
      }
    ]
  },
  {
    url: "/relatorios",
    name: "Relatorios",
    slug: "relatorios",
    icon: "ActivityIcon",
    submenu: [
      // {
      //   url: "/relatorios/vendedor",
      //   name: "Vendedor",
      //   slug: "relatorios-vendedor"
      // },
      // {
      //   url: "/relatorios/instituicao",
      //   name: "Instituição",
      //   slug: "relatorios-instituicao"
      // },
      {
        url: "/relatorios/servicos",
        name: "Serviços executados",
        slug: "relatorios-servicos"
      },
      {
        url: "/relatorios/servicos-nao-realizados",
        name: "Serviços não realizados",
        slug: "relatorios-servicos-nao-realizados"
      },
      {
        url: "/relatorios/becas",
        name: "Becas",
        slug: "relatorios-becas"
      },
      {
        url: "/relatorios/escolas",
        name: "Escolas",
        slug: "relatorios-escolas"
      },
      // {
      //   url: "/relatorios/renegociados",
      //   name: "Renegociados",
      //   slug: "relatorios-renegociados"
      // },
      {
        url: "/relatorios/cobranca-situacao",
        name: "Situação do contrato",
        slug: "relatorios-cobranca-situacao"
      },
      {
        url: "/relatorios/comissoes",
        name: "Comissões",
        slug: "relatorios-comissoes"
      },
      {
        url: "/relatorios/desempenho-vendedor",
        name: "Desempenho por vendedor",
        slug: "relatorios-desempenho-vendedor"
      },
      {
        url: "/relatorios/contas-receber",
        name: "Contas a Receber",
        slug: "relatorios-contas-receber"
      },
      {
        url: "/relatorios/vendas-vendedor",
        name: "Vendas por vendedor e lista",
        slug: "relatorios-vendas-vendedor"
      },
      {
        url: "/relatorios/contratos-inadimplentes",
        name: "Contratos inadimplêntes",
        slug: "relatorios-contratos-inadimplentes"
      },
      // {
      //   url: "/relatorios/ficha-contrato-consolidado",
      //   name: "Contratos consolidados",
      //   slug: "relatorios-ficha-contrato-consolidado"
      // },
      {
        url: "/relatorios/ficha-contratos",
        name: "Fichas",
        slug: "relatorios-ficha-contratos"
      },
      {
        url: "/relatorios/listas",
        name: "Listas",
        slug: "relatorios-listas"
      }
    ]
  },

  {
    url: "/zoneamento",
    name: "Listas",
    slug: "Listas",
    icon: "MapIcon"
  },

  {
    url: "/cadastro",
    name: "Cadastro",
    slug: "cadastro",
    icon: "PlusIcon",
    submenu: [
      {
        url: "/cadastro/tipo-cursos",
        name: "Cursos",
        slug: "tipo-cursos"
      },
      {
        url: "/cadastro/tipo-turmas",
        name: "Turmas",
        slug: "tipo-turmas"
      },
      {
        url: "/cadastro/estado",
        name: "Estado",
        slug: "estado"
      },
      {
        url: "/cadastro/cidade",
        name: "Cidade",
        slug: "cidade"
      },
      {
        url: "/cadastro/bairro",
        name: "Bairro",
        slug: "bairro"
      },
      {
        url: "/cadastro/bairro-grupamento",
        name: "Grup. de Bairros",
        slug: "bairro-grupamento"
      },
      {
        url: "/cadastro/tipo-foto",
        name: "Tipo de Produtos",
        slug: "tipo-foto"
      },
      {
        url: "/cadastro/tipo-contato",
        name: "Tipo de Contato",
        slug: "tipo-contato"
      },
      {
        url: "/cadastro/tipo-becas",
        name: "Tipo de Becas",
        slug: "tipo-becas"
      },
      {
        url: "/cadastro/forma-pagamentos",
        name: "Formas de Pagamento",
        slug: "forma-pagamentos"
      }
    ]
  },
  {
    url: "/logs",
    name: "Logs",
    slug: "Logs",
    icon: "ShieldIcon"
  },
  {
    url: "/administracao/permissoes",
    name: "Permissões",
    slug: "permissoes",
    icon: "LockIcon"
  },
  {
    url: "/ajustes",
    name: "Ajustes",
    slug: "Ajustes",
    icon: "SlidersIcon"
  },
  {
    url: "/help",
    name: "Ajuda",
    slug: "Ajuda",
    icon: "HelpCircleIcon"
  }
];
