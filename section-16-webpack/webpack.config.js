//Config file uses CommonJS sintax
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Boilerplate',
      filename: 'index.html',
      template: 'src/template.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
