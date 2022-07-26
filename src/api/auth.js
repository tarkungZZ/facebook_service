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
        console.log("logined, ", res.data.user);
        location.href = "/";
        await localStorage.setItem("token", res.data.token);
        await localStorage.setItem("user", res.data.user.username);
        await localStorage.setItem("userId", res.data.user.user_id);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        alert("Invalid username or password");
        return err;
      });
  },

  editUser: async (id, fb_name, fb_password, execute_path) => {
    const data = {
      id: id,
      fb_name: fb_name,
      fb_password: fb_password,
      execute_path: execute_path,
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
    return await api.BACKEND_ENDPOINT.post(`${config.api}/facebook/delete`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },

  createUser: async (email, fb_password, email_password, two_fa, users_id) => {
    const data = {
      email: email,
      fb_password: fb_password,
      email_password: email_password,
      two_fa: two_fa,
      users_id: users_id,
    };
    console.log("data =============>>>>> ", data);
    // console.log("dataCreate, ", data);
    return await api.BACKEND_ENDPOINT.post(`${config.api}/facebook/add`, data)
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
  getUser: async (limit, page, user_id) => {
    return await api.BACKEND_ENDPOINT.get(
      `${config.api}/facebook/list?limit=${limit}&page=${page}&users_id=${user_id}`
    )
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  //CONFIG_DELAY
  getDelay: async () => {
    return await api.BACKEND_ENDPOINT.get(`${config.api}/config/list`)
      .then(async (res) => {
        // console.log("getDelay ----> ", res);
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  editDelay: async (delay_min, delay_max) => {
    const data = {
      delay_min: delay_min,
      delay_max: delay_max,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/config/edit`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  //POST
  getPost: async (limit, page) => {
    // console.log("getPost, ", limit, page);
    return await api.BACKEND_ENDPOINT.get(`${config.api}/post/list?limit=${limit}&page=${page}`)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  deletePost: async (id) => {
    const data = {
      id: id,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/post/delete`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  createPost: async (post) => {
    const data = {
      post: post,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/post/add`, data)
      // return await api.BACKEND_ENDPOINT.post("/login", data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  //BOT
  launchBot: async (id, type, Link, post) => {
    const data = {
      id: id,
      type: type,
      link: Link,
      post: post,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/launch`, data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  launchBotAll: async (users_id, type, Link, post) => {
    const data = {
      users_id: users_id,
      type: type,
      link: Link,
      post: post,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/multi-launch`, data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  statusBot: async (id) => {
    const data = {
      id: id,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/facebook/status`, data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
  resetBot: async (id) => {
    const data = {
      id: id,
    };
    return await api.BACKEND_ENDPOINT.post(`${config.api}/facebook/reset`, data)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        console.log("err, ", err);
        return err;
      });
  },
};
