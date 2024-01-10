const useUtils = {
  methods: {
    getInstituicaoSimpleAddress(d) {
      return (
        (d.estado != null ? d.estado.nome + " - " : "") +
        (d.cidade != null ? d.cidade.nome + " - " : "") +
        (d.bairro != null ? d.bairro.nome : "")
      );
    },
    getInstituicaoAddress(d) {
      return (
        (d.estado != null ? "Estado: " + d.estado.nome + " - " : "") +
        (d.cidade != null ? "Cidade: " + d.cidade.nome + " - " : "") +
        (d.bairro != null ? "Bairro: " + d.bairro.nome : "") +
        (d.logradouro != null ? "Logradouro: " + d.logradouro + " - " : "") +
        (d.numero != null ? "Nº: " + d.numero + " - " : "") +
        (d.complemento != null ? "Complemento: " + d.complemento + " - " : "")
      );
    },
    getInstituicaoResponsavelDetail(d) {
      let info = "";
      if (d.nome_responsavel != null) info += d.nome_responsavel;
      if (d.cargo_responsavel != null) {
        if (info == "") {
          info += d.cargo_responsavel;
        } else {
          info += " - " + d.cargo_responsavel;
        }
      }
      return info;
    }
  }
};
export default useUtils;
