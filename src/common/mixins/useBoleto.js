import moment from "moment";

const useBoleto = {
  data: () => ({
    codes: [
      { cod: 2, status: "Entrada confirmada", color: "primary" },
      { cod: 3, status: "Entrada rejeitada", color: "danger" },
      { cod: 6, status: "Liquidado", color: "success" },
      { cod: 9, status: "Baixado", color: "danger" }
    ]
  }),
  methods: {
    diffDatesBoleto(date, date2) {
      var a = moment(date);
      var b = moment(date2);
      return a.diff(b, "days");
    },
    getBoletoStatus(boleto) {
      let permission = {};
      if (boleto.cod_retorno == null) {
        permission = {
          cod: boleto.cod_retorno,
          status: "Aguardando registro",
          color: "warning"
        };
      } else if (boleto.cod_retorno == 0) {
        permission = {
          cod: boleto.cod_retorno,
          status: "Cancelado manualmente",
          color: "danger"
        };
      } else if (boleto.cod_retorno == 999) {
        permission = {
          cod: boleto.cod_retorno,
          status: "Quitado manualmente",
          color: "success"
        };
      } else {
        permission = this.codes.find(x => x.cod == boleto.cod_retorno);
        if (permission == undefined)
          return {
            cod: boleto.cod_retorno,
            status: "Cód. " + boleto.cod_retorno,
            color: "warning",
            link:
              "https://www.caixa.gov.br/Downloads/contribuicao-sindical-urbana-manual-para-emissao-de-grcsu/Contribuicao_Sindical_Urbana_Leiaute_CNAB_240_Remessa_e_Retorno_v_1_8.pdf"
          };
        if (permission.cod == 6) {
          const diff =
            parseFloat(boleto.valor) - parseFloat(boleto.valor_recebido);
          if (diff == 0) {
            permission.status = "Liquidado";
          } else if (diff > 0) {
            permission.status = "Liquidado | Valor menor";
          } else if (diff < 0) {
            permission.status = "Liquidado | Valor maior";
          }
        }
      }
      if (
        this.diffDatesBoleto(
          boleto.venda_parcelas_data_vencimento,
          new Date()
        ) < 0
      ) {
        permission.status += " | Atrasado";
        permission.color = "danger";
      }
      return permission;
    }
  },
  mounted() {}
};

export default useBoleto;
