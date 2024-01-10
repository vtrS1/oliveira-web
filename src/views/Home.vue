<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full  mb-base">
        <vx-card
          slot="no-body"
          class="text-center bg-primary-gradient greet-user"
        >
          <feather-icon
            icon="UserIcon"
            class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow"
            svgClasses="h-8 w-8"
          ></feather-icon>
          <h1 class="mb-6 text-white">
            Olá <strong>{{ activeUserInfo().displayName }}</strong>
          </h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
            É bom ter você por aqui, você está vendo as estatísticas deste mês
          </p>
        </vx-card>
      </div>
    </div>
    <div class="vx-row px-4">
      <vx-card
        slot="no-body"
        class="text-center  w-full md:w-8/12 bg-success-gradient greet-user mt-10"
      >
        <feather-icon
          icon="SmartphoneIcon"
          @click.native="openApk('http://ancweb.com.br/oliveira/oliveira.apk')"
          class="p-6 mb-8 bg-success  cursor-pointer inline-flex rounded-full text-white shadow"
          svgClasses="h-8 w-8"
        ></feather-icon>
        <h1
          @click.native="openApk('http://ancweb.com.br/oliveira/oliveira.apk')"
          class="mb-6 text-white  cursor-pointer"
        >
          Baixar o aplicativo
        </h1>

        <p class="mb-6 text-white">
          Ou acesse diretamente o link abaixo
        </p>

        <p class="mb-6 text-lg text-grey-200">
          http://ancweb.com.br/oliveira/oliveira.apk
        </p>
      </vx-card>
      <div class="w-0 md:w-1/12"></div>

      <vx-card
        @click="toHelp()"
        slot="no-body"
        class="text-center cursor-pointer w-full md:w-3/12 bg-warning-gradient greet-user mt-10"
      >
        <feather-icon
          icon="HelpCircleIcon"
          @click.native="openApk('http://ancweb.com.br/oliveira/oliveira.apk')"
          class="p-6 mb-8 bg-warning  cursor-pointer inline-flex rounded-full text-white shadow"
          svgClasses="h-8 w-8"
        ></feather-icon>
        <h1 class="mb-6 text-white  cursor-pointer">
          Duvidas?
        </h1>

        <p class="mb-6 text-white">
          Veja vídeos sobre como usar o sistema
        </p>
      </vx-card>
    </div>

    <!-- <vs-list v-for="(item, idx) in messages" :key="idx">
      <vs-list-item :title="item"> </vs-list-item>
    </vs-list>

    <vs-input
      label-placeholder="mensagem"
      class="w-full mb-4"
      v-model="message"
    />
    <vs-button @click="sendMessage(message)">Enviar</vs-button> -->
  </div>
</template>

<script>
import useData from "@/common/mixins/useData";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
// import Ws from "@adonisjs/websocket-client";
import ENV from "@/common/env.js";
// const ws = Ws("ws://" + ENV.WS);

export default {
  mixins: [useData],
  components: {
    StatisticsCardLine
  },
  data: () => ({
    topic: null,
    message: "",
    messages: []
  }),
  methods: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    async openApk(url) {
      window.open(url);
    },
    toHelp() {
      this.$router.push("/help");
    }
  },
  async mounted() {
    // await this.fetchVendaDados(true);
  }
};
</script>
