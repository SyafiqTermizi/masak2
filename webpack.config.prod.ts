import * as path from "path";
import * as webpack from "webpack";
import * as fs from "fs";

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const file = fs.readFileSync("./.env", "utf8");
const lines = file.split("\n");

const bucket_name =
  // @ts-ignore
  lines.find((val) => val.startsWith("AWS_STORAGE_BUCKET_NAME")).split("=")[1];

const static_location =
  // @ts-ignore
  lines.find((val) => val.startsWith("AWS_STATIC_LOCATION")).split("=")[1];

const config: webpack.Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: {
    main: "./static/ts/src/Index",
    bootstrapjs: "./static/js/index",
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
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    publicPath: `https://${bucket_name}.s3.amazonaws.com/${static_location}/bundles/`,
    path: path.resolve("./static/bundles/"),
    filename: "[name].js",
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
  },
};

export default config;
