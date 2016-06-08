"use strict";

/**
* Module dependencies.
*/
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
* Configuration section.
*/
const settings = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',
  srcPath: path.resolve(__dirname, 'app'),
  buildPath: path.resolve(__dirname, 'build'),
  publicPath: '/',
  nodeModulesPath: path.resolve(__dirname, 'node_modules/'),
  jsEntry: path.resolve(__dirname, 'app/index.jsx'),
};

/**
 * Return the entry sources
 */
function getEntrySources() {
  const sources = [];
  if (settings.isDevelopment) {
    sources.push('webpack-dev-server/client?http://0.0.0.0:8080');
    sources.push('webpack/hot/only-dev-server');
  }
  sources.push(settings.jsEntry);
  return sources;
}

/**
 * Return the array of plugins
 */
function getPlugins() {
  const plugins = [];
  plugins.push(new webpack.NoErrorsPlugin());
  plugins.push(new ExtractTextPlugin('[name].css'));

  // Only production plugins
  if (settings.isProduction) {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }));
    plugins.push(CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/assets/', to: 'assets/' },
    ]));
  }
  return plugins;
}

function getConfiguration() {
  return {
    devtool: settings.isDevelopment ? '#source-map' : 'cheap-source-map',
    entry: getEntrySources(),
    output: {
      path: settings.buildPath,
      publicPath: settings.publicPath,
      filename: 'bundle.js',
    },
    module: {
      preLoaders: [
        {
          test: /\.js(x)?$/,
          loader: 'eslint',
          exclude: settings.nodeModulesPath,
        },
      ],
      loaders: [
        {
          test: /\.js(x)?$/,
          loaders: (settings.isDevelopment) ? ['react-hot', 'babel'] : ['babel'],
          exclude: settings.nodeModulesPath,
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
          exclude: settings.nodeModulesPath,
        },
        { test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file' },
        { test: /\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf$/, loader: 'file' },
      ],
    },
    postcss: [
      autoprefixer({
        browsers: ['> 1%', 'last 10 versions'],
      }),
    ],
    sassLoader: {
      includePaths: [],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    plugins: getPlugins(),
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      contentBase: settings.srcPath,
      port: 8080,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
}

module.exports = getConfiguration();
