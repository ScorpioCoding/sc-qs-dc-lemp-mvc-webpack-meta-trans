const path = require("path");
//const glob = require("glob");
const glob = require("glob-all");
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const _StyleLintPlugin = require("stylelint-webpack-plugin");
const _ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const _CopyPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const _BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const PurgecssPlugin = new PurgeCSSPlugin({
  paths: glob.sync([path.resolve(__dirname, "../dev/views/**/*.phtml")]),
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "[id].css",
});

const ESLintPlugin = new _ESLintPlugin({
  overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
  context: path.resolve(__dirname, "../dev/**/*"),
  files: "**/*.js",
});

// const StyleLintPlugin = new _StyleLintPlugin({
//   configFile: path.resolve(__dirname, "stylelint.config.js"),
//   //configBasedir: path.resolve(__dirname, "./node_modules/"),
//   context: path.resolve(__dirname, "../src/**/*"),
//   files: "**/*.scss",
//   syntax: "scss",
// });

/**
 * If getting an error during npm start or watch it's
 * most posable because the src/fonts or src/img folders are empty
 */
const CopyPlugin = new _CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "../dev/favicon/"),
      to: path.resolve(__dirname, "../html/public/favicon/"),
    },
    {
      from: path.resolve(__dirname, "../dev/img/"),
      to: path.resolve(__dirname, "../html/public/img/"),
    },
    {
      from: path.resolve(__dirname, "../dev/fonts/"),
      to: path.resolve(__dirname, "../html/public/fonts/"),
    },
    {
      from: path.resolve(__dirname, "../dev/index.php"),
      to: path.resolve(__dirname, "../html/public/index.php"),
    },
    {
      from: path.resolve(__dirname, "../dev/translations/"),
      to: path.resolve(__dirname, "../html/App/Translations/"),
    },
  ],
});

// const BrowserSyncPlugin = new _BrowserSyncPlugin(
//   {
//     host: "localhost",ù
//     port: 9085,
//     proxy: "http://127.0.0.1:9580",
//     files: [
//       {
//         match: ["**/*.phtml", "**/*.scss", "**/*.js,"],
//         fn: function (event) {
//           if (event === "change") {
//             const bs = require("browser-sync").get("bs-webpack-plugin");
//             bs.reload();
//           }
//         },
//       },
//     ],
//   },
//   { reload: false }
// );

module.exports = {
  CleanWebpackPlugin: new CleanWebpackPlugin(),
  MiniCssExtractPlugin: MiniCssExtractPlugin,
  PurgecssPlugin: PurgecssPlugin,
  ESLintPlugin: ESLintPlugin,
  //StyleLintPlugin: StyleLintPlugin,
  CopyPlugin: CopyPlugin,
  //BrowserSyncPlugin: BrowserSyncPlugin,
};
