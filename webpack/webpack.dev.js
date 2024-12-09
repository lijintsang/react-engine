const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  mode: "development",
  cache: {
    type: "memory", // 使用内存缓存
  },
  // optimization: {
  //   minimize: true, // 开启压缩
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         compress: {
  //           /*
  //             只会在 生产环境 的构建过程中生效。
  //             如果你在 开发环境 (mode: 'development') 中打包，
  //             那么默认情况下并不会压缩或移除 console.log
  //           */
  //           drop_console: true, // 去掉 console.log 等调试信息
  //         },
  //       },
  //     }),
  //   ],
  // },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;
