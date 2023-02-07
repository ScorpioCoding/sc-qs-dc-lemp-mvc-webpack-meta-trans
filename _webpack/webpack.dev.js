const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

///

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["../dev/**/*.phtml", "../dev/**/*.scss", "../dev/**/*.js,"],
    host: "127.0.0.1",
    port: 3000,
    open: true,
    compress: false,
    hot: true,
  },
});
