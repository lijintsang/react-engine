const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

// const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: "production",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename], //使用文件缓存
    },
  },
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            /*
              只会在 生产环境 的构建过程中生效。
              如果你在 开发环境 (mode: 'development') 中打包，
              那么默认情况下并不会压缩或移除 console.log
            */
            // drop_console: true, // 去掉 console.log 等调试信息
            /*
              移除指定函数调用，这些函数被视为“无副作用”。
              只移除 console.log
            */
            pure_funcs: ['console.log'],
            sourceMap: true, // 生成 Source Map
          },
        },
      }),
    ],
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;
