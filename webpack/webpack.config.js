const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 入口文件
  output: {
    // 输出文件存放的目录
    path: path.resolve(__dirname, '../dist'),
    // 输出文件名 [name]代表入口的名称
    filename: '[name].bundle.js',
    // 在每次构建时清理输出目录
    clean: true,
  },
  resolve: {
    // 允许省略这些扩展名的文件导入，如 import App from './App'; 自动匹配 .tsx、.ts
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    // 配置路径别名，@ 映射到 src
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      // 使用 Babel 将现代 JavaScript、TypeScript 和 JSX 转换为浏览器支持的代码
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // 跳过 node_modules 中的文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|less)$/, // 处理 CSS LESS 文件
        exclude: /node_modules/,
        use: [
          // 将 CSS 从 JS 文件中分离为独立的文件
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              // 启用 CSS 模块化，将类名哈希化避免全局污染
              modules: {
                // [name]___[local]___[hash:base64:5] name文件 local类名
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          // 编译 LESS 文件，支持 JavaScript 语法（通过 javascriptEnabled）
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 启用 Less 的 JS
              },
            },
          },
          // 用于处理 CSS 的工具，特别是为了为 CSS 添加浏览器前缀，从而提高兼容性
          /* display: -webkit-box; display: -ms-flexbox; display: flex; */
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 可以添加其他 PostCSS 插件
                plugins: [require('autoprefixer')],
                // 使用 postcss-less 插件支持 LESS
                syntax: 'postcss-less',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [path.resolve('./src/assets/images')],
        use: [
          {
            // 将小于 limit 大小的图片转换为 base64 数据 URI
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    /*
      在单页面应用（SPA）中，
      将 Webpack 打包生成的资源（如 bundle.js 和 style.css）插入到 HTML 文件中
    */
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // 将 CSS 从 JS 文件中分离，输出为单独的 .css 文件。
    new MiniCssExtractPlugin(),
    // 用于优化和压缩 CSS 文件，减少文件大小，从而加快页面加载速度。
    new CssMinimizerWebpackPlugin(),
  ],
  devServer: {
    // 指定静态资源目录
    static: path.resolve(__dirname, 'dist'),
    // 支持 SPA 的前端路由
    historyApiFallback: true,
    // 自动打开浏览器
    open: false,
    // 热更新
    hot: true,
    // port: 3000,
  },
  // 开发模式
  mode: 'development',
};
