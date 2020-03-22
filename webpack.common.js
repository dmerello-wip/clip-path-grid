const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WorkboxConfig = require('./workbox.config');

module.exports = {
  entry: {
    main: "./src/js/index.js"
  },
  output: {
    filename: "js/main.js",
    chunkFilename: "js/[name].chunk.js",
    path: path.join(__dirname, "public/dist"),
    publicPath: "/dist/"
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    // Extract css files to seperate bundle
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),
    // Copy fonts and images to dist
    new CopyWebpackPlugin([
      {from: 'src/fonts', to: 'fonts'},
      {from: 'src/images', to: 'images'}
    ]),
    // Service Worker to manage local caching
    new WorkboxPlugin.GenerateSW(WorkboxConfig),
  ],
  module: {
    rules: [
      // Babel-loader
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // Css-loader & sass-loader
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      /* Load fonts: commented > normally we move fonts from src to public folder */
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      },
      /*  Load images: commented > normally we move static images from src to public folder */
      {
        test: /\.(png|jpg|jpeg|gif?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '/images/[name].[ext]',
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.json','.css'],
    modules: ['node_modules'],
    alias: {
      request$: 'xhr'
    }
  }
};