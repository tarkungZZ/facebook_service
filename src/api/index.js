import axios from "axios";
import config from "../config/env";
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const BACKEND_ENDPOINT = axios.create({
  baseURL: config.api,
  timeout: 10000,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  const value = localStorage.getItem("token");
  request.headers.Authorization = `Bearer ${value}`;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
BACKEND_ENDPOINT.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

BACKEND_ENDPOINT.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default { BACKEND_ENDPOINT };

// import axios from "axios";
// import config from "../config/env";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// /* Configure/make use of request & response interceptors from Axios : server video streaming  */

// const BACKEND_ENDPOINT = axios.create({
//   baseURL: config.api,
//   timeout: 50000,
// });

// // BACKEND_ENDPOINT.interceptors.request.use(async (requestConfig) => {
// //   const value = await LocalStorage.getItem("token");
// //   if (value) {
// //     requestConfig.headers.Authorization = `Bearer ${value}`;
// //   }
// //   return requestConfig;
// // });

// BACKEND_ENDPOINT.interceptors.request.use(
//   (request) => requestHandler(request),
//   (error) => errorHandler(error)
// );

// BACKEND_ENDPOINT.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => errorHandler(error)
// );

// /* Create request, response & error handlers */
// const requestHandler = (config) => {
//   const newConfig = { ...config };
//   newConfig.metadata = { startTime: new Date() };
//   return newConfig;
// };

// const responseHandler = (response) => {
//   const newResponse = { ...response };
//   newResponse.config.metadata.endTime = new Date();
//   newResponse.duration =
//     newResponse.config.metadata.endTime - newResponse.config.metadata.startTime;
//   console.log(`🚀 ~ Endpoint ${response.config.url} : Time ${newResponse.duration} ms`);

//   return newResponse.data;
// };

// const errorHandler = (error) => {
//   const newError = { ...error };
//   newError.config.metadata.endTime = new Date();
//   newError.duration = newError.config.metadata.endTime - newError.config.metadata.startTime;
//   return Promise.reject(newError);
// };

// /* Export the newly created Axios instance to be used in different locations. */
// export default { BACKEND_ENDPOINT };
