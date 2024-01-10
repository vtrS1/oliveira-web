const permissions = [
  {
    value: "estado",
    slug: "Estados",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "cidade",
    slug: "Cidades",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "bairro",
    slug: "Bairros",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "formaPagamento",
    slug: "Formar de pagamento",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "tiposBeca",
    slug: "Tipos de beca",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "tiposContato",
    slug: "Tipos de contato",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "tiposFoto",
    slug: "Tipos de foto",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "gruposBairro",
    slug: "Grupos de bairro",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "usuario",
    slug: "Usuários",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "lista",
    slug: "Listas de serviço",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },

  {
    value: "contasReceber",
    slug: "Contas a Receber",
    actions: [
      { value: "create", slug: "Criar" },
      // { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
      // { value: "quitar", slug: "Quitar contas" }
    ]
  },
  {
    value: "gestor",
    slug: "Gestor",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "instituicao",
    slug: "Instituições",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "tiposCursos",
    slug: "Cursos",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "tiposTurmas",
    slug: "Turmas",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "ficha",
    slug: "Fichas",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "contasReceberDetail",
    slug: "Detalhes do contas a receber",
    actions: [
      { value: "create", slug: "Cadastrar nova parcela" },
      { value: "entrada", slug: "Editar entrada" },
      { value: "update", slug: "Editar parcela" },
      { value: "delete", slug: "Remover/Desativar parcela" },
      { value: "show", slug: "Visualizar parcelas e detalhes da venda" },
      { value: "quitar", slug: "Quitar conta" }
    ]
  },
  {
    value: "contrato",
    slug: "Contratos",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "aluno",
    slug: "Alunos",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "sacado",
    slug: "Sacados",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "vendedor",
    slug: "Vendedores",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "boleto",
    slug: "Boletos",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" },
      { value: "remessa", slug: "Gerar arquivo remessa" },
      { value: "retorno", slug: "Dar baixa automática com arquivo de retorno" }
    ]
  },
  {
    value: "bairrosGrupo",
    slug: "Grupamento de bairros",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "permissao",
    slug: "Permissões de usuários",
    actions: [
      { value: "update", slug: "Editar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "ajustes",
    slug: "Ajustes (Parâmetros)",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "update", slug: "Editar" }
    ]
  },
  {
    value: "logs",
    slug: "Logs (Relatório das ações feitas no sistema)",
    actions: [{ value: "show", slug: "Visualizar" }]
  },
  {
    value: "renegociar",
    slug: "Renegociação",
    actions: [
      { value: "create", slug: "Renegociar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "inadimplentes",
    slug: "Inadimplentes",
    actions: [
      { value: "create", slug: "Adicionar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "relatorio",
    slug: "Relatórios",
    actions: [
      { value: "create", slug: "Criar" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  },
  {
    value: "relatorioServicos",
    slug: "Relatório de serviços executados",
    actions: [{ value: "show", slug: "Visualizar" }]
  },
  {
    value: "relatorioServicoNaoRealizados",
    slug: "Relatório de serviços não executados",
    actions: [{ value: "show", slug: "Visualizar" }]
  },
  {
    value: "relatorioEscolas",
    slug: "Relatório de Escolas",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioBecas",
    slug: "Relatório de Becas",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioRenegociados",
    slug: "Relatório de renegociados",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioComissoes",
    slug: "Relatório de Comissoes",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioContasReceber",
    slug: "Relatório de Contas a Receber",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioFichasConsolidadoContrato",
    slug: "Relatório de fichas consolidadas por contrato",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioDesempenhoVendedores",
    slug: "Relatório de desempenho do vendedor",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioCobrancaSituacao",
    slug: "Relatório de situação do contrato",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioFichasContrato",
    slug: "Relatório de fichas do contrato",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioContratosSituacao",
    slug: "Relatório de situação do contrato",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioLista",
    slug: "Relatório da lista",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "relatorioVendasInadimplentes",
    slug: "Relatório de contas inadimplentes",
    actions: [
      { value: "show", slug: "Visualizar" },
      { value: "analitico", slug: "Analítico" }
    ]
  },
  {
    value: "descontos",
    slug: "Descontos (Cupons)",
    actions: [
      { value: "create", slug: "Cadastrar cupons" },
      { value: "update", slug: "Editar" },
      { value: "delete", slug: "Remover/Desativar" },
      { value: "show", slug: "Visualizar" }
    ]
  }
];

export default permissions;
