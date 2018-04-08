const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
    }
  },
  module: {
    rules: [
      // this handles .less translation
      {
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader']
        }),
        test: /\.less$/
      },

      // this handles images
      {
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
          use: 'file-loader?name=[name].[ext]?[hash]'
      },

      // the following rules handle font extraction
      {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
      },
      {
          test: /\.otf(\?.*)?$/,
          use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
      }
    ]
  },
  plugins: [
    // this handles the bundled .css output file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};
