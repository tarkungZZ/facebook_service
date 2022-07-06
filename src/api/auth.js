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
    // console.log("data, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/login`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        location.href = "/";
        await localStorage.setItem("token", res.data.token);
        await localStorage.setItem("user", res.data.user.username);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        alert("Invalid username or password");
        return err;
      });
  },

  editUser: async (id, password, role) => {
    const data = {
      id: id,
      password: password,
      role: role,
    };
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
    const data = {
      id: id,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/user/delete`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },

  createUser: async (username, password, role) => {
    const data = {
      username: username,
      password: password,
      role: role,
    };
    console.log("dataCreate, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/user/create`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  //GET
  getUser: async (limit, page) => {
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
