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
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
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
