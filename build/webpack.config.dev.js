'use strict'
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, "./../");
const APP_DIR = path.resolve(PROJECT_DIR, "./src/");
const PUBLIC_DIR = path.resolve(PROJECT_DIR, "./public/");

module.exports = {
  mode: 'development',
  entry: [
    APP_DIR+'/index.js'
  ],
  output: {
    // options related to how webpack emits results
    path: PUBLIC_DIR,
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
//    filename: "main.js", // string
    // the filename template for entry chunks
//    publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page
//    library: "MyLibrary", // string,
    // the name of the exported library
//    libraryTarget: "umd", // universal module definition
    // the type of the exported library
    /* Advanced output configuration (click to show) */
    /* Expert output configuration (on own risk) */
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: APP_DIR,
        use: 'vue-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: 'ToDo',
        template: APP_DIR+'/index.html',
    })
  ]
}