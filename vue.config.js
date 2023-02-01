const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  productionSourceMap: false, //生产环境是否要生成 sourceMap
  transpileDependencies: true,
  devServer: {
    proxy: "http://127.0.0.1:7222/",
    port: 9090,
    // host: "0.0.0.0", //10.8.34.236
    https: false, //是否启用 https
    open: true, //是否直接打开浏览器
  },
})
