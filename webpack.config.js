const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/pages/index.js',
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'dist'),
          }, 
},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash].js'
    },

    mode: 'development',
    module:{
    rules:[
         
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/',
          },
          {
            test: /\.css$/,
            use: [
                  MiniCssExtractPlugin.loader,
                  {loader: 'css-loader', options: {
                    importLoaders: 1,
                  }},
                  'postcss-loader'
                 ]
          },
          {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            type: 'asset/resource',
            generator: {
                  filename: 'images/[name].[hash][ext]'
                       }
          },
          {
            test: /\.(woff|woff2|eot|ttf)$/,
            type: 'asset/resource',
            generator: {
            filename: 'fonts/[name].[hash][ext]'
                       }
          }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
};