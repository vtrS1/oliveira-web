<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color  pb-8">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/logo/logo.jpg"
                alt="login"
                class="h-64 mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4 font-bold text-3xl">
                    Oliveira Formaturas e Eventos
                  </h4>
                  <p>Seja bem vind(a) de volta, entre com a sua conta</p>
                </div>

                <div>
                  <vs-input
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Email / Usuário"
                    v-model="user.email"
                    class="w-full"
                  />

                  <vs-input
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Senha"
                    v-model="user.password"
                    class="w-full mt-6"
                    @keyup.enter="signIn()"
                  />

                  <!-- <div class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
                      >Lembrar de mim</vs-checkbox
                    >
                    <router-link to="">Esqueceu sua senha?</router-link>
                  </div> -->

                  <vs-button class="float-right mt-4" @click="signIn"
                    >Login</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import HTTP from "./../../common/http";
import ENV from "./../../common/env";

export default {
  data() {
    return {
      user: { email: "", password: "" }
    };
  },
  methods: {
    async signIn() {
      try {
        this.$vs.loading();
        const login = await HTTP.SIGNIN(this.user);
        if (login != null) {
          if (login.hasOwnProperty("token")) {
            this.notify(
              "Sucesso",
              "Login efetuado com sucesso, redirecionando você para o sistema...",
              "success"
            );

            await window.localStorage.setItem(
              "permissions",
              JSON.stringify(login.permissoes)
            );
            delete login.permissoes;
            await window.localStorage.setItem("user", JSON.stringify(login));
            this.$router.push("/");
            // window.location.href = ENV.PATH;
          } else {
            this.notify(
              "Ops...",
              "Verifique se você preencheu os dados corretamente e tente novamente mais tarde",
              "warning"
            );
          }
        } else {
          this.notify(
            "Ops...",
            "Verifique se você preencheu os dados corretamente e tente novamente mais tarde",
            "warning"
          );
        }
      } catch (e) {
        this.notify("Ops...", "Email ou senha incorretos", "danger");
      } finally {
        this.$vs.loading.close();
      }
    },
    notify(title, text, color) {
      this.$vs.notify({
        title: title,
        text: text,
        color: color
      });
    },
    signOut() {
      window.localStorage.removeItem("user");
    }
  },
  mounted() {
    this.signOut();
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
