const path = require('path');
const webpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: webpack.lib.entries,  
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }],
  },  
};