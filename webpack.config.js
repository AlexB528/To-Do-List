const path = require('path');

 module.exports = {
  mode: 'development',
   entry: {
     index: './src/index.js',
     functions: './src/functions.js',
     webStorage: './src/webStorage.js',
   },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };