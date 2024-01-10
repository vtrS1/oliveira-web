import ENV from "@/common/env.js";
import HTTP from "@/common/http.js";

const useReport = {
  methods: {
    async generateReport(route, form) {
      this.$vs.loading();
      const res = await HTTP.POST("createReport", {
        ...form,
        route: `${route}`
      });
      this.$vs.loading.close();
      if (res != null && res.url != undefined) {
        window.open(`${ENV.API_REPORT}${res.url}`);
      } else {
        this.$vs.notify({
          title: "Aviso",
          text:
            "Ocorreu um erro gerar esse relatório, tente novamente mais tarde",
          position: "bottom-right",
          color: "warning"
        });
      }
    }
  }
};

export default useReport;
