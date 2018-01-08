const {resolve} = require('path');
// const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  target: 'node',
  devtool: false,
  entry: resolve('src/entry'),
  // externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: resolve('builds'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /builds/],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: true,
          beautify: true,
          indent_level: 2,
        }
      }
    }),
  ]
};
