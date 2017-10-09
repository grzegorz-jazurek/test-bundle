const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');


module.exports = function(env) {
  
  const config = {
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
      })
    ]
  };

  if (env && env.s3) {
    config.plugins.push(new UglifyJSPlugin());

    config.plugins.push(new S3Plugin({    
      // s3Options are required
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-west-1'
      },
      s3UploadOptions: {
        Bucket: 'MyBucket'
      },
      cdnizerOptions: {
        defaultCDNBase: 'http://asdf.ca'
      }
    }));
  }

  return config;
}


