const path = require("path");
const HWP = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    filename: "build.js",
    path: path.join(__dirname, "/../src/dist")
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HWP({ template: path.join(__dirname, "/src/index.html") })
  ],
  devServer: {
    historyApiFallback: {
      index: "./src/index.html"
    }
  }
};
