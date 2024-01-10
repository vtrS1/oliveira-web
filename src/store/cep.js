import axios from "axios";
import env from "../common/env";

export default async cep => {
  if (cep.toString().length < 7 && cep.toString().length > 9) {
    return null;
  }
  try {
    const res = await axios.get(`${env.API}external/cep/${cep}`);

    if (res.status != 200) {
      return null;
    }

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
