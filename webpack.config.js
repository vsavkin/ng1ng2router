var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.scss', '.ts', '.js'],
    alias: {
      "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
    }
  },

  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ],

  entry: './src/main.ts',
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: 'dist/',
    filename: "bundle.js"
  },

  devtool: 'source-map',

  module: {
    loaders: [
		{
        test: /\.ts$/,
        loader: 'ts-loader'
      },
	  {
        test: /\.css$/,
        loader: 'style-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  }
};
