const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const stylesheetsLoader =
  'style-loader!css-loader?modules&localIdentName=[path]-[local]-[hash:base64:3]';
const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'index.html' });
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'true')),
  __SYMBOLSERVER_URL__ : "'http://127.0.0.1:3000/lookup'",
});

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    filename: '[hash].js',
  },
  devtool: 'source-map',
  plugins: [htmlWebpackPlugin, definePlugin],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: stylesheetsLoader },
      { test: /\.scss$/, loader: `${stylesheetsLoader}'!sass-loader` },
      { test: /\.sass$/, loader: `${stylesheetsLoader}'!sass-loader?indentedSyntax=sass` },
      { test: /\.less$/, loader: `${stylesheetsLoader}'!less` },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|jpg)$/,
        include: path.join(__dirname, 'public/images'),
        loader: 'file-loader'  }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api*': 'http://localhost:8181'
    }
  }
};
