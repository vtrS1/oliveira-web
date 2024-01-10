import { mount } from "@vue/test-utils";
import ModalCadastroEstado from "./ModelCadastroEstado.vue";

discribe("Iniciando teste unitários", async () => {
  const wrapper = mount(ModalCadastroEstado);
  const vm = wrapper.vm;

  test("Testando o cadastro de estados");

  vm.form.nome = "Teste de cadastro";
  vm.form.sigla = "TC";

  await vm.cadastrar();

  expect(this.form).toBe({});
});
