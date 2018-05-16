var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var webpack = require('webpack');

const common = {
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ],
  },
}

const client = {
  entry: `./client/client.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
};

const server = {
  entry: `./client/server.js`,
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'bundle-server.js',
    libraryTarget: 'commonjs-module',
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];