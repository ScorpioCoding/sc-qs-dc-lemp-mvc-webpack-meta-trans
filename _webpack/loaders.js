const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// JS
const JSLoader = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

// CSS Development
const CSSLoaderDev = {
  test: /\.(s[ac]|c)ss$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: "css-loader",
      options: { importLoaders: 2 },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, "postcss.config.js"),
        },
      },
    },
    {
      loader: "sass-loader",
    },
  ],
};

const PhtmlLoader = {
  test: /\.[p]html$/,
  exclude: [path.resolve(__dirname, "./node_modules"), [/fonts/], [/img/]],
  type: "asset/resource",
  generator: {
    //filename: "../App/Views/**/[name].phtml",
    filename: (name) => {
      /**
       * @description Remove the first 3 and last of the ${ path } array
       * @example
       *     Original path '../dev/views/site/layouts/home.phtml'
       *     Changed to site/layouts
       *     split according to "/"
       *     slice the first three ../dev/views/ and the last one /home.phtml
       *     join whats left with "/"
       */
      const path = name.filename.split("/").slice(3, -1).join("/");
      return `../App/Views/${path}/[name][ext]`;
    },
  },
};

// Images
const ImageLoader = {
  test: /\.(png|jpeg|jpg|gif|svg)$/i,
  type: "asset/resource",
  exclude: [path.resolve(__dirname, "./node_modules"), [/fonts/]],
  generator: {
    filename: "img/[name][ext]",
  },
};

// Fonts
const FontLoader = {
  test: /\.(svg|eot|ttf|woff|woff2)$/i,
  type: "asset/resource",
  exclude: [path.resolve(__dirname, "./node_modules"), [/img/]],
  generator: {
    filename: "fonts/[name][ext]",
  },
};

// Font-awesome;
const FontAwesomeLoader = {
  test: /font-awesome\.config\.js/,
  use: [{ loader: "style-loader" }, { loader: "font-awesome-loader" }],
};

module.exports = {
  JSLoader: JSLoader,
  CSSLoader: CSSLoaderDev,
  PhtmlLoader: PhtmlLoader,
  ImageLoader: ImageLoader,
  FontLoader: FontLoader,
  FontAwesomeLoader: FontAwesomeLoader,
};
