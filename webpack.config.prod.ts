import * as path from "path";
import * as webpack from "webpack";

const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config: webpack.Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: {
    main: "./static/ts/src/Index",
    style: "./static/css/main.css",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve("./static/bundles/"),
    filename: "[name].js",
  },
  plugins: [new MinifyPlugin()],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};

export default config;