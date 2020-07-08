import * as path from "path";
import * as webpack from "webpack";
import BundleTracker from "webpack-bundle-tracker";

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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve("./static/bundles/"),
    filename: "[name].js",
  },

  plugins: [
    new BundleTracker({
      path: ".",
      filename: "./webpack-stats.json",
      integrity: true,
      integrityHashes: ["sha256", "sha384", "sha512"],
    }),
  ],
};

export default config;
