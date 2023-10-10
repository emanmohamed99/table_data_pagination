const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./content/ts/index2.ts",
  output: {
    path: path.resolve(__dirname, "./content/dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};
