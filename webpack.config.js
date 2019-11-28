const path = require('path');

module.exports = {
  entry: {'index':'./index.jsx'},
  output: {
    path: path.resolve(__dirname, 'dis'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.m?jsx$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};