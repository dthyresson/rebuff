"use strict";

require("dotenv").config({
  path: `.env.${
    process.env.NODE_ENV === "production" ? "production" : "development"
  }`
});

const isNetlify = process.env.BUILD_TYPE === "netlify";
const isProd =
  (process.env.CONTEXT && process.env.CONTEXT === "production") ||
  (process.env.BRANCH && process.env.BRANCH === "master");

const path = require("path");
const webpack = require("webpack");

const SRC_DIR = path.join(__dirname, "src");
const PUBLIC_DIR = path.join(__dirname, "public");
const DIST_DIR = path.join(__dirname, "dist");

module.exports = (env, argv) => {
  const isProdBuild = argv.mode === "production";
  return {
    mode: "development",
    devServer: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        "/.netlify/functions": {
          target: "http://localhost:9000"
        }
      },
      historyApiFallback: true,
      public: "localhost:3000",
      publicPath: "/",
      contentBase: SRC_DIR,
      open: true
    }
  };
};
