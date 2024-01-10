import vsComponent from "./VxTable";
import vsComponent2 from "./VxTh";
import vsComponent3 from "./VxTr";
import vsComponent4 from "./VxTd";

export default Vue => {
  Vue.component(vsComponent.name, vsComponent);
  Vue.component(vsComponent2.name, vsComponent2);
  Vue.component(vsComponent3.name, vsComponent3);
  Vue.component(vsComponent4.name, vsComponent4);
};
