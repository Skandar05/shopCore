const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,

    pathRewrite: {
      "^/auth": "/api/auth",
    },
  })
);
app.use(
  "/api/produit",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,

    pathRewrite: {
      "^/produit": "/api/produit",
    },
  })
);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});