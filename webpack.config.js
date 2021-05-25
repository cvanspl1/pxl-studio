const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    host: 'localhost',
    port: 8080,
    // Match the output path
    contentBase: path.resolve(__dirname, 'dist'),
    // Enable HMR on the devServer
    hot: true,
    // Match the output 'publicPath'
    publicPath: '/',
    // fallback to the root for other urls
    historyApiFallback: true,

    proxy: {
      '/api': 'http://localhost:3000',
      secure: false,
    },
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
        },
      },
      {
        test: /css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
