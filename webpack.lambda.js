const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
};
