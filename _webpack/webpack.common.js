const path = require("path");
const webpack = require("webpack"); // to access built-in plugins
const loaders = require("./loaders");
const plugins = require("./plugins");

///

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, "../dev/js/main.js"),
      path.resolve(__dirname, "../dev/scss/main.scss"),
      path.resolve(__dirname, "../dev/views/Template.phtml"),
      path.resolve(__dirname, "../dev/views/layout/header.phtml"),
      path.resolve(__dirname, "../dev/views/layout/footer.phtml"),
      path.resolve(__dirname, "../dev/views/layout/navigation.phtml"),
    ],

    site: [
      path.resolve(__dirname, "../dev/views/site/home.phtml"),
      path.resolve(__dirname, "../dev/views/site/test.phtml"),
    ],
  },

  ///
  module: {
    rules: [
      loaders.PhtmlLoader,
      loaders.ImageLoader,
      loaders.FontLoader,
      loaders.JSLoader,
      loaders.CSSLoader,
    ],
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../html/public/"),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin,
    //plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin,
    plugins.CopyPlugin,
    plugins.PurgecssPlugin,
    //plugins.BrowserSyncPlugin,
  ],
};
