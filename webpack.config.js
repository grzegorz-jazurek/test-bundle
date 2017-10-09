const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
    vendor: './js/vendor.js',
    main: './js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './js/vendor/modernizr-2.8.3-respond-1.4.2.min.js',
      to: 'modernizr.js'
    }, {
      from: 'css/**'
    }, {
      from: 'fonts/**'
    }, {
      from: 'assets/**'
    }]),
    new HtmlWebpackPlugin({
      title: 'video 24',
      filename: 'index.html',
      template: 'index.html'
    }),
    new UglifyJSPlugin()
  ]
};
