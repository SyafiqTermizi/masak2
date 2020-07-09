import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: "./static/ts/src/index",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
};

export default config;
