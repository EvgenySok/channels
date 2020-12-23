const { resolve } = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

require('dotenv').config()

const PORT = process.env.PORT || 5000
const { ENABLE_SOCKETS } = process.env

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  if (isProd) {
    return {
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true }), new OptimizeCSSAssetsWebpackPlugin()],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
      }
    }
  }
  return {}
}

const config = {
  mode: 'development',
  entry: {
    index: ['babel-polyfill', resolve(__dirname, 'client/index.tsx')]
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },
  devServer: {
    open: isDev,
    port: '8080',
    hot: isDev,
    contentBase: resolve(__dirname, 'dist'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api', '/socket.io/'],
        target: `http://localhost:${PORT}`,
        ws: ENABLE_SOCKETS || false,
      },
    ],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          quiet: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HTMLWebpackPlugin({ template: './client/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve(__dirname, 'client/assets/images'), to: 'images' },
        { from: resolve(__dirname, 'client/assets/fonts'), to: 'fonts' },
      ],
    }),
  ],
  stats: {
    entrypoints: false,
    children: false,
  },
}

module.exports = config
