const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/styles/main.scss',
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].css' // output js file name is identical to css file name
  },
  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      port: 9000
    },
  module: {
    rules: [
      //------------- html src --------------------
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          // options: {
          //   attrs: [':data-src']
          // }
        }
      },
      //------------- sass --------------------
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
                use: ["css-loader", "sass-loader"],
                // use style-loader in development
                fallback: "style-loader"
            })
      },
      //------------- images in sass --------------------
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[name].[ext]', outputPath: 'images/'},

        }]
      },
      //------------- fonts --------------------
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[name].[ext]',  outputPath: 'fonts/'}
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: 'sass-only',
        favicon: './src/images/favicon.png',
        template: path.resolve(__dirname, 'src/index.html'),
      }),
    new ExtractTextPlugin('[name].css') // css file will override generated js file
  ]
}