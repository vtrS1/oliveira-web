import axios from "axios";
import ENV from "./env";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const getToken = () => {
  let AuthStr = "";
  const USER = JSON.parse(window.localStorage.getItem("user"));
  if (USER != null) {
    AuthStr = "Bearer ".concat(USER.token);
  }
  return AuthStr;
};

const SIMPLE = async (URL, method = "GET", data = null, customUrl = false) => {
  const CONN_URL = customUrl ? URL : ENV.API + URL;
  let result = null;
  switch (method) {
    case "GET":
      result = await axios.get(CONN_URL, {
        validateStatus: false
      });
      break;
    case "PUT":
      result = await axios.put(CONN_URL, data, {
        validateStatus: false
      });
      break;
    case "POST":
      result = await axios.post(CONN_URL, data, {
        validateStatus: false
      });
      break;
    case "DELETE":
      result = await axios.delete(CONN_URL, {
        validateStatus: false
      });
      break;
  }
  return result.data;
};

const GET = async URL => {
  const result = ENV.API_NEED_TOKEN
    ? await axios.get(ENV.API + URL, {
        headers: { Authorization: getToken() },
        validateStatus: false
      })
    : await axios.get(ENV.API + URL, {
        validateStatus: false
      });
  if (result.status == 401) {
    result.data.error = { status: 401, message: "Unauthorized" };
  }
  return result.data;
};

const POST = async (URL, DATA) => {
  const result = ENV.API_NEED_TOKEN
    ? await axios.post(ENV.API + URL, DATA, {
        headers: { Authorization: getToken() },
        validateStatus: false
      })
    : await axios.post(ENV.API + URL, DATA, {
        validateStatus: false
      });
  if (result.status == 401) {
    result.data.error = { status: 401, message: "Unauthorized" };
  }
  return result.data;
};

const PUT = async (URL, DATA) => {
  const result = ENV.API_NEED_TOKEN
    ? await axios.put(ENV.API + URL, DATA, {
        headers: { Authorization: getToken() },
        validateStatus: false
      })
    : await axios.put(ENV.API + URL, DATA, {
        validateStatus: false
      });
  if (result.status == 401) {
    result.data.error = { status: 401, message: "Unauthorized" };
  }
  return result.data;
};

const DELETE = async URL => {
  const result = ENV.API_NEED_TOKEN
    ? await axios.delete(ENV.API + URL, {
        headers: { Authorization: getToken() },
        validateStatus: false
      })
    : await axios.delete(ENV.API + URL, {
        validateStatus: false
      });
  if (result.status == 401) {
    result.data.error = { status: 401, message: "Unauthorized" };
  }
  return result.data;
};

const SIGNIN = async DATA => {
  try {
    const result = await axios.post(ENV.API + "auth/signin", DATA, {
      validateStatus: false
    });
    return result.data;
  } catch (err) {
    if (ENV.DEBUG) console.error(err);
    return null;
  }
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
  SIGNIN,
  SIMPLE
};
