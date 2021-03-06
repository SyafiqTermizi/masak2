import * as path from "path";
import * as webpack from "webpack";

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
    publicPath: "/static/bundles/",
    path: path.resolve("./static/bundles/"),
    filename: "[name].js",
  },
};

export default config;
