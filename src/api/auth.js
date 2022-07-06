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

  editUser: async (id, fb_password) => {
    const data = {
      id: id,
      fb_password: fb_password,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/facebook/edit`, data)
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

  createUser: async (email, fb_password, email_password, two_fa, execute_path) => {
    const data = {
      email: email,
      fb_password: fb_password,
      email_password: email_password,
      two_fa: two_fa,
      execute_path: execute_path,
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
    return await api.BACKEND_ENDPOINT.get(`${config.api}/facebook/list?${limit}&${page}`)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        console.log("facebook ----> ", res);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
};
