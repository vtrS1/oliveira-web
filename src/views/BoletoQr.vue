<template>
  <div class="bg-black p-10 h-screen overflow-y-auto">
    <div
      class="container flex  pr-10"
      v-if="boletos == null || boletos.length == 0"
    >
      <div class="w-full md:w-2/3  flex flex-col">
        <h1 class="sm:text-3xl text-2xl mb-5 font-bold text-white">
          INSTRUÇÕES
        </h1>
        <h1 class="sm:text-2xl text-xl mb-5 text-white">
          1 - Acesse o aplicativo OLIVEIRA FOTOS no seu smartphone
        </h1>
        <h1 class="sm:text-2xl text-xl mb-5 text-white">
          2 - Clique na opção 'Boletos QR'
        </h1>
        <h2 class="sm:text-2xl text-xl mb-5 text-white">
          3 - Aponte a câmera do seu celular para o código ao lado
        </h2>
        <h2 class="sm:text-2xl text-xl mb-5 mt-10 font-normal text-white">
          E pronto, acesso liberado
        </h2>
      </div>
      <div class="w-full md:w-1/3  flex justify-end">
        <vue-qrcode class="inline-bloc w-full" :value="key" />
      </div>
    </div>
    <div class="container  pr-10  pb-32" v-else>
      <div class="row flex justify-between">
        <h1 class="sm:text-3xl text-2xl mb-5 font-bold text-white w-full">
          Boletos da OS: {{ os }}
        </h1>
        <!-- <div class="text-right justify-items-end">
          <vs-button
            icon="picture_as_pdf"
            type="flat"
            color="primary"
            class="inline-block"
            >imprimir tudo</vs-button
          >
        </div> -->
      </div>
      <ul class="w-full">
        <li
          class="w-full h-16 align-middle mb-5 p-5 rounded-lg bg-white hover:bg-grey"
          v-for="(item, idx) in boletos"
          :key="idx"
        >
          <div class="row flex justify-between">
            <div class="w-3/12 font-semibold">Parcela {{ item.parcela }}</div>
            <div class="w-3/12 text-right font-semibold">
              Vencimento: {{ formatDateBrasil(item.data_vencimento) }}
            </div>
            <div class="w-3/12 text-right font-semibold">
              Valor: {{ formatMoneyBrasil(item.valor) }}
            </div>
            <div class="w-3/12 text-right justify-items-end flex flex-wrap">
              <vs-button
                icon="print"
                type="flat"
                @click="openBoleto(item.url + '&compacto=1')"
                color="primary"
                class="inline-block"
              ></vs-button>
              <vs-button
                icon="picture_as_pdf"
                type="flat"
                @click="openBoleto(item.url)"
                color="primary"
                class="inline-block"
              ></vs-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";
import crypto from "crypto";
import Ws from "@adonisjs/websocket-client";
import ENV from "@/common/env.js";
const ws = Ws("wss://" + ENV.WS);
import useData from "@/common/mixins/useData";
export default {
  components: {
    VueQrcode
  },
  mixins: [useData],
  data: () => ({
    loading: true,
    message:
      "Esta pagina será recarregada em 10 segundos se não receber a liberação",
    messages: [],
    topic: null,
    key: null,
    os: null,
    boletos: [],
    time: null,
    timeToRefrash: 10
  }),
  created() {
    this.key = crypto.randomBytes(60).toString("hex");
  },
  async mounted() {
    await this.inittializeConnection();
    this.loading = false;
    this.time = setTimeout(function() {
      window.location.reload(true);
    }, this.timeToRefrash * 1000);
  },
  methods: {
    async sendMessage(message) {
      this.topic.emit("message", message);
    },
    async openBoleto(url) {
      window.open(url, "_blank");
    },
    async inittializeConnection() {
      await ws.connect();
      console.log(ENV.TOPIC);
      this.topic = ws.subscribe(ENV.TOPIC);

      this.topic.on("ready", () => {
        this.sendMessage({ code: this.key, action: "STORE" });
      });

      this.topic.on("message", event => {
        console.log("111");
        console.log(event);
        if (event.renew != undefined) {
          this.key = crypto.randomBytes(60).toString("hex");
          this.sendMessage({ code: this.key, action: "STORE" });
        } else if (event.code == this.key) {
          if (event.boletos != undefined) {
            clearTimeout(this.time);
            this.boletos = event.boletos;
            this.os = event.os;
          }
        }

        this.messages.push(event);
      });
    }
  }
};
</script>
