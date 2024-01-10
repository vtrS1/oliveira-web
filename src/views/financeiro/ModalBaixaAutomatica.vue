<template>
  <div>
    <vs-button
      class="mr-2 mt-4 float-right"
      color="primary"
      type="filled"
      @click="modalState = true"
     
    >Baixa automática</vs-button>
    <vs-prompt
      @accept="baixaAutomatica"
      :active.sync="modalState"
      title="Baixa automatica"
      accept-text="Confirmar"
      cancel-text="Cancelar"
    >
      <input type="file" id="retornoFile" name="retorno" class="w-full py-5"></input>
    </vs-prompt>
  </div>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import Validators from "@/common/mixins/Validators";
import axios from "axios";
export default {
  mixins: [useHTTP, useData, Validators],
  data: () => ({
    form: {},
    errors: [],
    modalState: false
  }),
  methods: {
    async baixaAutomatica() {
      this.$vs.loading();
      try {
        const data = document.getElementById("retornoFile").files[0];
        let formData = new FormData();
        formData.append("retorno", data);
        const res = await axios.post("https://anc-app.xyz/services/oliveira/retorno.php", formData, 
        { 
          headers: {
            "Access-Control-Allow-Origin": "*",  
            
          }
        });
        this.$vs.notify({
            title: "Aviso",
            position: "top-center",
            text: res.data.message,
            color: "primary"
          });
      } catch(e) {
         this.$vs.notify({
            title: "Ops...",
            position: "top-center",
            text: 'Ocorreu um erro, tente novamente mais tarde',
            color: "warning"
          });
      } finally {
        this.$vs.loading.close();
      }
    }
  }
};
</script>
<style>
.con-vs-dialog .vs-dialog {
  max-width: 1200px !important;
}
</style>
