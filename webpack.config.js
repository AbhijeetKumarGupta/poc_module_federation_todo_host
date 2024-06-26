const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "/", //auto
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        addForm: "addForm@https://abhijeetkumargupta.github.io/poc_mf_todo_remote_add_form/remoteEntry.js", //"addForm@http://localhost:3001/remoteEntry.js",
        filterSection: "filterSection@https://abhijeetkumargupta.github.io/poc_mf_todo_remote_filter_form/remoteEntry.js", //"filterSection@http://localhost:3002/remoteEntry.js",
        list: "list@https://abhijeetkumargupta.github.io/poc_mf_todo_remote_list/remoteEntry.js", //"list@http://localhost:3003/remoteEntry.js",
        details: "details@https://abhijeetkumargupta.github.io/poc_mf_todo_remote_details/remoteEntry.js" //"http://localhost:3004/remoteEntry.js"
      },
      shared: {"react": {singleton: true}, "react-dom": {singleton: true}},
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};