const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = (process.env.NODE_ENV || 'dev') === 'dev';

module.exports = {
  entry: {
    index: ['./src/index'],
    globalStyles: ['./src/resources/styles/global']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: path.resolve(__dirname, 'src/resources/styles/global.css'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize!postcss-loader'
        })
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/resources/styles'),
        loader: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new ExtractTextPlugin('global.css'),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css'],
  }
};
