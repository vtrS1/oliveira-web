import { cpf } from "cpf-cnpj-validator";

const Validators = {
  methods: {
    isNotNull(val) {
      return val != null;
    },
    isNotUndefined(val) {
      return val != undefined;
    },
    isValidValue(val) {
      return this.isNotNull(val) && this.isNotUndefined(val);
    },
    isFullValidValue(val) {
      return this.isValidValue(val) && val.length > 0;
    },
    isValidName(name, minLenght = 1) {
      if (!this.isValidValue(name)) return false;
      return name.lenght >= minLenght;
    },
    isValidCPF(val) {
      if (!this.isValidValue(val)) return false;
      return cpf.isValid(val);
    },
    isValidEmail(val) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          val
        )
      ) {
        return true;
      }
      return false;
    }
  }
};

export default Validators;
