'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
      }
    }),
    new HtmlWebpackPlugin({ 
      filename: 'post.html',
      template: './src/post.html',
      minify: {
        collapseWhitespace: true,
      }
    }),
  ],
  module: {
    rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
            test: /\.html$/,
            use: 'html-loader'
        },
        {
        test: /\.(scss)$/,
        use: [
            {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
            },
            {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
            },
            {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                plugins: [
                    autoprefixer
                ]
                }
            }
            },
            {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
            }
        ]
        }
    ]
  }
}