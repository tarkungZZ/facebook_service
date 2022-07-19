const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use("./src/api/index.js", createProxyMiddleware({ target: "http://159.223.53.175:5002", changeOrigin: true }));
app.listen(3000);
