const path = require('path')
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components')
      },
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }]
    }
  }
}