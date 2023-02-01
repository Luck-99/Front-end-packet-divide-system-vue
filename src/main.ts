import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Element from "element-ui"
import VueSocketio from "vue-socket.io"

import "element-ui/lib/theme-chalk/index.css"

import "@/assets/css/global.less"

Vue.config.productionTip = false

Vue.use(Element, { size: "small", zIndex: 3000 })

Vue.use(
  new VueSocketio({
    debug: false,
    connection: "http://127.0.0.1:7222/",
  })
)

new Vue({
  router,
  store,
  sockets: {
    connect: function () {
      console.log("连接上")
    },
    res: function (val) {
      console.log("接收到", val)
    },
  },
  render: (h) => h(App),
}).$mount("#app")
