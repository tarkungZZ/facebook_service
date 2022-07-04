import axios from "axios";
// import qs from "qs";
import api from "./index";
import config from "../config/env";
// import { Alert } from "react-native";

export default {
  login: async (username, password) => {
    const data = {
      username,
      password,
    };
    console.log("data, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/login`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        console.log("res, ", res);
        await localStorage.setItem("token", res.data.token);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
};
