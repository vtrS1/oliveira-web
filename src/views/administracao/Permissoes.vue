<template>
  <vs-card v-if="hasAccess('show')">
    <div class="w-full flex flex-wrap justify-start">
      <div class="font-semibold text-lg pl-4 w-4/12 mb-2 mt-5">
        Permissões
        {{ usuario && usuario.nome ? ` do usuário ${usuario.nome}` : "" }}
      </div>
      <div
        v-if="hasAccess('update')"
        class="font-semibold max-w-full text-lg w-full md:w-8/12 flex pl-4 mb-2 mt-5 flex-wrap"
      >
        <div class="w-full md:w-4/12 pr-2 pb-2">
          <SelectUsuario
            @update="
              (val) => {
                id_usuario = val;
                getUserPermission();
              }
            "
            @usuario="(val) => (usuario = val)"
          />
        </div>

        <div class="w-full md:w-4/12 pr-2 pb-2">
          <ModalCopiarPermissao />
        </div>
        <div class="w-full md:w-2/12 pr-4 pb-2">
          <vs-button color="danger" class="w-full" type="filled" @click="resetPermissoes"
            >Resetar</vs-button
          >
        </div>
        <div class="w-full md:w-2/12 pr-4">
          <vs-button
            color="success"
            class="w-full"
            type="filled"
            @click="atualizar"
            icon="check"
            >Atualizar</vs-button
          >
        </div>
      </div>
    </div>

    <div
      v-if="hasAccess('update')"
      class="font-semibold w-full text-lg flex pl-4 mb-2 mt-5 flex-wrap"
    >
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="primary"
          type="filled"
          @click="marcarTodos('show')"
          >Marcar todos os "Visualizar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="primary"
          type="filled"
          @click="marcarTodos('create')"
          >Marcar todos os "Criar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="primary"
          type="filled"
          @click="marcarTodos('update')"
          >Marcar todos os "Editar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="primary"
          type="filled"
          @click="marcarTodos('delete')"
          >Marcar todos os "Desativar"</vs-button
        >
      </div>
    </div>
    <div
      v-if="hasAccess('update')"
      class="font-semibold w-full text-lg flex pl-4 mb-2 mt-5 flex-wrap"
    >
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="danger"
          type="filled"
          @click="desmarcarTodos('show')"
          >Desmarcar todos os "Visualizar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="danger"
          type="filled"
          @click="desmarcarTodos('create')"
          >Desmarcar todos os "Criar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="danger"
          type="filled"
          @click="desmarcarTodos('update')"
          >Desmarcar todos os "Editar"</vs-button
        >
      </div>
      <div class="w-full md:w-3/12 pr-2 pb-2">
        <vs-button
          class="w-full"
          color="danger"
          type="filled"
          @click="desmarcarTodos('delete')"
          >Desmarcar todos os "Desativar"</vs-button
        >
      </div>
    </div>
    <vs-list v-for="(item, idx) in staticPermission" :key="idx">
      <vs-list-header :title="item.slug"></vs-list-header>
      <vs-list-item v-for="(action, ix) in item.actions" :key="ix" :title="action.slug">
        <vs-switch
          v-if="userPermissions[idx] != undefined"
          :disabled="!hasAccess('update')"
          color="warning"
          v-model="userPermissions[idx][action.value]"
        />
      </vs-list-item>
    </vs-list>
  </vs-card>
  <vs-card v-else>
    <p class="text-center py-10 font-semibold text-xl">
      Uma permissão é necessária para acessar este conteúdo
    </p>
  </vs-card>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import useData from "@/common/mixins/useData";
import useRule from "@/common/mixins/useRule.js";
import ModalCopiarPermissao from "./permissao/ModalCopiarPermissao.vue";
import permissionsScheme from "@/common/permissions";
import SelectUsuario from "@/components/SelectUsuario";

export default {
  mixins: [useHTTP, useData, useRule],
  components: { ModalCopiarPermissao, SelectUsuario },
  data: () => ({
    id_usuario: null,
    descriptionItems: [3, 5, 15, 30, 50, 100],
    userPermissions: [],
    usuario: {},
  }),
  methods: {
    async atualizar() {
      await this.updateData("usuarios/permissoes/" + this.id_usuario, {
        permissoes: this.userPermissions,
      });
    },
    async resetPermissoes() {
      const perm = [];
      permissionsScheme.forEach((x) => {
        const actions = {
          value: x.value,
          create: true,
          update: true,
          view: true,
          disable: true,
          renegociar: false,
          remessa: false,
          retorno: false,
          quitar: false,
        };
        perm.push(actions);
      });

      await this.updateData("usuarios/permissoes/" + this.id_usuario, {
        permissoes: perm,
      });
      this.getUserPermission();
    },
    marcarTodos(action) {
      for (let i = 0; i < this.userPermissions.length; i++) {
        this.userPermissions[i][action] = true;
      }
      this.$forceUpdate();
    },
    desmarcarTodos(action) {
      for (let i = 0; i < this.userPermissions.length; i++) {
        this.userPermissions[i][action] = false;
      }
      this.$forceUpdate();
    },
    async getUserPermission() {
      const res = await this.fetchData("usuarios/permissoes/" + this.id_usuario, true);

      if (res != undefined && res != null && res != "") {
        this.userPermissions = res;
      } else {
        this.$vs.notify({
          position: "top-center",
          title: "Notificação",
          text: "Este usuário não tem permissões cadastradas",
          color: "warning",
        });
      }
    },
  },
  created() {
    this.staticPermission.forEach((x) =>
      this.userPermissions.push({
        value: x.value,
        create: false,
        update: false,
        delete: false,
        show: false,
        quitar: false,
      })
    );
  },
  async mounted() {
    this.route = "permissao";
  },
};
</script>

<style>
.vs-con-table,
.vs-con-tbody {
  border: none !important;
}
.vs-table--tbody-table tr {
  height: 50px;
}
</style>
