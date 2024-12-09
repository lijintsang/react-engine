const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js', // 输出文件名
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // 解析这几种文件
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置 src 别名
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 处理 TypeScript 文件
        use: 'ts-loader', // 使用 ts-loader 编译 TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader', // 使用 Babel 处理 JavaScript 文件
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,  // 处理 .less 文件
        use: [
          'style-loader',  // 将 CSS 插入到 DOM 中
          {
            loader: 'css-loader',
            options: {
              modules: true, // 启用 CSS 模块化
            },
          },
          'less-loader',   // 解析 LESS 文件
        ],
      },
      {
        test: /\.css$/, // 处理 CSS 文件
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 生成 HTML 文件
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,  // 确保支持客户端路由
    port: 8899,
    open: false, // 打开浏览器
    hot: true, // 热更新
  },
  mode: 'development', // 开发模式
};
