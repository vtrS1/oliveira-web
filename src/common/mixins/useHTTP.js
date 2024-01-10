import HTTP from "../http";

const useHTTP = {
  methods: {
    async fetchData(route, loading = true) {
      if (loading) this.$vs.loading();
      const res = await HTTP.GET(route);
      if (res != null) {
        if (loading) this.$vs.loading.close();
        if (res.error != undefined) {
          if (res.error.status == 401) {
            this.$vs.notify({
              title: "Ops...",
              text: "Sua seção expirou, faça login novamente",
              position: "bottom-right",
              color: "warning"
            });
            this.$router.push("/pages/login");
          } else {
            this.$vs.notify({
              title: "Ops...",
              text: "Ocorreu um erro buscar os dados",
              position: "bottom-right",
              color: "warning"
            });
            return false;
          }
        } else if (res.status == 401) {
          this.$vs.notify({
            title: "Ops...",
            text: "Sua seção expirou, faça login novamente",
            position: "bottom-right",
            color: "warning"
          });
          this.$router.push("/pages/login");
        } else {
          return res;
        }
      } else {
        if (loading) this.$vs.loading.close();
        this.$vs.notify({
          title: "Ops...",
          text: "Ocorreu um erro buscar os dados",
          position: "bottom-right",
          color: "warning"
        });
        return false;
      }
    },
    async createData(route, data, ignoreSuccess = false, loading = true) {
      if (loading) this.$vs.loading();
      const res = await HTTP.POST(route, data);
      if (res != null) {
        if (loading) this.$vs.loading.close();
        if (res.error != undefined) {
          if (res.error.status == 401) {
            this.$vs.notify({
              title: "Ops...",
              text: "Sua seção expirou, faça login novamente",
              position: "bottom-right",
              color: "warning"
            });
            this.$router.push("/pages/login");
          } else if (res.error.length > 0) {
            this.$vs.notify({
              title: "Ops...",
              text: res.error,
              position: "bottom-right",
              color: "warning"
            });
          }
        } else if (res.err != undefined) {
          this.$vs.notify({
            title: "Ops...",
            position: "bottom-right",
            text: res.err,
            color: "warning"
          });
          return null;
        } else if (res.id != undefined) {
          if (!ignoreSuccess)
            this.$vs.notify({
              title: "Notificação",
              text: "Operação de cadastrado realizada com sucesso",
              color: "success",
              position: "bottom-right"
            });
          return res;
        } else if (res.status == 401) {
          this.$vs.notify({
            title: "Ops...",
            text: "Sua seção expirou, faça login novamente",
            position: "bottom-right",
            color: "warning"
          });
          this.$router.push("/pages/login");
        } else {
          this.$vs.notify({
            title: "Ops...",
            position: "bottom-right",
            text:
              "Ocorreu um erro ao cadastrar, verifique os dados e tente novamente",
            color: "warning"
          });
          return null;
        }
      } else {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Ops...",
          position: "bottom-right",
          text:
            "Ocorreu um erro interno ao realizar o cadastro, tente novamente mais tarde",
          color: "warning"
        });
        return null;
      }
    },
    async simplePost(route, data, loading = true) {
      if (loading) this.$vs.loading();
      const res = await HTTP.POST(route, data);
      if (res != null) {
        if (loading) this.$vs.loading.close();
        if (res.error != undefined) {
          if (res.error.status == 401) {
            this.$vs.notify({
              title: "Ops...",
              text: "Sua seção expirou, faça login novamente",
              position: "bottom-right",
              color: "warning"
            });
            this.$router.push("/pages/login");
          }
        }
        if (res.err != undefined) {
          this.$vs.notify({
            title: "Ops...",
            position: "bottom-right",
            text: res.err,
            color: "warning"
          });
          return null;
        }
        return res;
      } else {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Ops...",
          position: "bottom-right",
          text:
            "Ocorreu um erro interno ao realizar, tente novamente mais tarde",
          color: "warning"
        });
        return null;
      }
    },
    async updateData(route, data, ignoreSuccess = false, loading = true) {
      if (loading) this.$vs.loading();
      const res = await HTTP.PUT(route, data);
      if (res != null) {
        if (loading) this.$vs.loading.close();
        if (res.error != undefined) {
          if (res.error.status == 401) {
            this.$vs.notify({
              title: "Ops...",
              text: "Sua seção expirou, faça login novamente",
              position: "bottom-right",
              color: "warning"
            });
            this.$router.push("/pages/login");
          } else if (res.error.length > 0) {
            this.$vs.notify({
              title: "Ops...",
              text: res.error,
              position: "bottom-right",
              color: "warning"
            });
          }
        } else if (res.status == 401) {
          this.$vs.notify({
            title: "Ops...",
            text: "Sua seção expirou, faça login novamente",
            position: "bottom-right",
            color: "warning"
          });
          this.$router.push("/pages/login");
        }

        if (res.err != undefined) {
          this.$vs.notify({
            title: "Ops...",
            text: res.err,
            position: "bottom-right",
            color: "warning"
          });
          return null;
        } else if (res == true || res.id != undefined) {
          if (!ignoreSuccess)
            this.$vs.notify({
              position: "bottom-right",
              title: "Notificação",
              text: "Operação de atualização realizada com sucesso",
              color: "success"
            });
          return res;
        } else {
          this.$vs.notify({
            title: "Ops...",
            position: "bottom-right",
            text:
              "Ocorreu um erro ao atualizar ou não havia nada para mudar, verifique os dados e tente novamente",
            color: "warning"
          });
          return null;
        }
      } else {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Ops...",
          position: "bottom-right",
          text:
            "Ocorreu um erro interno ao realizar a atualização, tente novamente mais tarde",
          color: "warning"
        });
        return null;
      }
    },
    async deleteData(route, ignoreSuccess = false, loading = true) {
      if (loading) this.$vs.loading();
      const res = await HTTP.DELETE(route);
      if (res != null) {
        if (loading) this.$vs.loading.close();
        if (res.error != undefined) {
          if (res.error.status == 401) {
            this.$vs.notify({
              title: "Ops...",
              text: "Sua seção expirou, faça login novamente",
              position: "bottom-right",
              color: "warning"
            });
            this.$router.push("/pages/login");
          }
        } else if (res.status == 401) {
          this.$vs.notify({
            title: "Ops...",
            text: "Sua seção expirou, faça login novamente",
            position: "bottom-right",
            color: "warning"
          });
          this.$router.push("/pages/login");
        }

        if (res.err != undefined) {
          this.$vs.notify({
            title: "Ops...",
            text: res.err,
            position: "bottom-right",
            color: "warning"
          });
          return null;
        } else if (res == true || res.id != undefined) {
          if (!ignoreSuccess)
            this.$vs.notify({
              position: "bottom-right",
              title: "Notificação",
              text: "Operação de remoção realizada com sucesso",
              color: "success"
            });
          return res;
        } else {
          this.$vs.notify({
            title: "Ops...",
            position: "bottom-right",
            text:
              "Ocorreu um erro ao remover, verifique os dados e tente novamente",
            color: "warning"
          });
          return null;
        }
      } else {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Ops...",
          position: "bottom-right",
          text:
            "Ocorreu um erro interno ao realizar a remoção, tente novamente mais tarde",
          color: "warning"
        });
        return null;
      }
    },
    async createMultiContatosData(
      idPessoa,
      contatos,
      ignoreSuccess = true,
      instituicao = false
    ) {
      let errors = 0;
      for (let i = 0; i < contatos.length; i++) {
        if (!instituicao) contatos[i].id_pessoa = idPessoa;
        else contatos[i].id_instituicao = idPessoa;
        delete contatos[i].nome;
        delete contatos[i].pessoas_nome;
        delete contatos[i].tipo_contatos_nome;
        let res = null;
        if (contatos[i].id != undefined) {
          const id = contatos[i].id;
          delete contatos[i].id;
          res = await this.updateData(
            "contatos/" + id,
            contatos[i],
            ignoreSuccess
          );
        } else {
          res = await this.createData("contatos", contatos[i], ignoreSuccess);
        }
        if (res == null) errors++;
      }
      if (errors > 0) {
        this.$vs.notify({
          title: "Ops...",
          position: "bottom-right",
          text: `Ocorreu um erro ao cadastrar ${errors} contatos(s), ${this
            .datas.length - errors} foram cadastrados com sucesso`,
          color: "warning"
        });
      } else {
        this.$vs.notify({
          position: "bottom-right",
          title: "Notificação",
          text: `Todos os contatos foram cadastrados com sucesso`,
          color: "success"
        });
      }
    }
  }
};

export default useHTTP;
