export default {
  CardContatos: () => import("@/views/financeiro/renegociacao/CardContatos"),
  CardHistorico: () => import("@/views/financeiro/renegociacao/CardHistorico"),
  CardEndereco: () => import("@/views/financeiro/renegociacao/CardEndereco"),
  CardEnderecoCompleto: () =>
    import("@/views/financeiro/renegociacao/CardEnderecoCompleto"),
  CardParcelas: () => import("@/views/financeiro/renegociacao/CardParcelas"),
  CardSituacao: () => import("@/views/financeiro/renegociacao/CardSituacao"),
  CardRestricao: () => import("@/views/financeiro/renegociacao/CardRestricao"),
  CardRenegociar: () =>
    import("@/views/financeiro/renegociacao/CardRenegociar"),
  CardContasReceber: () =>
    import("@/views/financeiro/renegociacao/CardContasReceber"),
  ModalCadastrarRenegociacao: () =>
    import("@/views/financeiro/renegociacao/ModalCadastrarRenegociacao")
};
