const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://192.168.183.121:8080/",
  },
})
