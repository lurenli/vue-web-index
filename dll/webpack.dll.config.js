const path = require("path");
const webpack = require("webpack");

module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: [
      'vue', 'vuex', 'axios', 'vue-router',
      'vue/dist/vue.esm.js',
      'qs'
    ]
  },
  output: {
    // 打包后文件输出的位置: 放在静态资源目录（dev环境会从static copy）
    path: path.join(__dirname, '../static'),
    filename: '[name].index.dll.[chunkhash].js',
    // 需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      // 当前目录生成
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      // 指manifest中资源的上下文，根目录。和DllReferencePlugin中一样
      context: path.join(__dirname,'..')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
