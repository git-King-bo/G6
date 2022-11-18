const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 192, //需要同步postcss.config.js中的设置
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    // 端口号
    open: true,
    host: "0.0.0.0",
    port: 8080,
    // 配置不同的后台API地址
    proxy: {
      "/api": {
        target: "http://www.dzm.com",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
