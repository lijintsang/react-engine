const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 入口文件
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js', // 输出文件名
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // 解析这几种文件
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve('./src')],
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(css|less)$/, // 处理 CSS LESS 文件
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]', // name文件 local类名
              },
            },
          },
          // 'less-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 启用 Less 的 JS
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [require('autoprefixer')] } },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [path.resolve('./src/assets/images')],
        use: [
          {
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
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true, // 确保支持客户端路由
    port: 8899,
    open: false, // 自动打开浏览器
    hot: true, // 热更新
  },
  mode: 'development', // 开发模式
};
