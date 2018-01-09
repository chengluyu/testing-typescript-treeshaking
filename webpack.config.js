const {resolve} = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const rollupCommonjsPlugin = require('rollup-plugin-commonjs');
const rollupNodeResolvePlugin = require('rollup-plugin-node-resolve');
const rollupJsonPlugin = require('rollup-plugin-json');

module.exports = {
  target: 'node',
  devtool: false,
  entry: resolve('src/entry'),
  externals: [nodeExternals()],
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
      rollupLoaderRules(),
      tsLoader(),
    ]
  },
  plugins: [
    // uglifyPlugin(),
  ]
};

function rollupLoaderRules() {
  return {
    test: /entry.ts$/,
    use: [
      {
        loader: 'webpack-rollup-loader',
        options: {
          // treeshake: {
          //   pureExternalModules: true
          // },
          plugins: [
            // rollupCommonjsPlugin(),
            // rollupNodeResolvePlugin({
            //   preferBuiltins: false,
            // }),
            // rollupJsonPlugin(),
          ],
          external: ['fs', 'crypto', 'domain', 'stream', 'querystring', 'timers', 'https', 'http', 'path', 'os']
        },
      },
      // {
      //   loader: 'ts-loader',
      //   options: {
      //     transpileOnly: true
      //   }
      // }
    ]
  };
}

function tsLoader() {
  return {
    test: /\.ts$/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  };
}


function uglifyPlugin() {
  return new UglifyJSPlugin({
    uglifyOptions: {
      output: {
        comments: true,
        beautify: true,
        indent_level: 2,
      }
    }
  });
}
