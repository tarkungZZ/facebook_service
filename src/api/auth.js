import axios from "axios";
// import qs from "qs";
import api from "./index";
import config from "../config/env";
// import { Alert } from "react-native";

export default {
  //POST
  login: async (username, password) => {
    const data = {
      username,
      password,
    };
    console.log("data, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/login`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        await localStorage.setItem("token", res.data.token);
        await localStorage.setItem("user", res.data.user.username);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },

  editUser: async (id, password, role) => {
    const data = JSON.stringify({
      id,
      password,
      role,
    });
    console.log("dataEditUser, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/user/edit`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },

  deleteUser: async (id) => {
    const data = JSON.stringify({
      id,
    });
    console.log("dataEditUser, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/user/delete`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        console.log("res, ", res);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  //GET
  getUser: async (limit, page) => {
    console.log("limit, ", limit);
    console.log("page", page);
    return await api.BACKEND_ENDPOINT.get(`${config.api}/user/list?${limit}&${page}`)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
};
