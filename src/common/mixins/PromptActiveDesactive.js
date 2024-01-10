import HTTP from "./../http";

const PromptActiveDesactive = {
  methods: {
    async activeConfirm(name, route, callback) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirmação`,
        acceptText: "Sim, ativar",
        cancelText: "Cancelar",
        text: `Tem certeza que deseja ativar este item: ${name} ?`,
        accept: async () => {
          this.$vs.loading();
          const res = await HTTP.PUT(route, { status: 1 });
          if (res != null) {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Sucesso",
              text: "Este item foi reativado com sucesso",
              color: "success"
            });
            return callback(true);
          } else {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Ops...",
              text: "Ocorreu um erro ao tentar ativar esse item",
              color: "warning"
            });
            return callback(false);
          }
        }
      });
    },
    async deleteConfirm(name, route, callback) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirmação`,
        acceptText: "Sim, desativar",
        cancelText: "Cancelar",
        text: `Tem certeza que deseja desativar este item: ${name} ?`,
        accept: async () => {
          this.$vs.loading();
          const res = await HTTP.DELETE(route);
          if (res != null) {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Sucesso",
              text: "Item desativado com sucesso",
              color: "success"
            });
            return callback(true);
          } else {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Ops...",
              text: "Ocorreu um erro ao tentar desativar",
              color: "warning"
            });
            return callback(false);
          }
        }
      });
    }
  }
};

export default PromptActiveDesactive;
