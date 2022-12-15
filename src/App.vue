<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("front-end-packet-divide-system-store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(
            sessionStorage.getItem("front-end-packet-divide-system-store")
          )
        )
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "front-end-packet-divide-system-store",
        JSON.stringify(this.$store.state)
      )
    })
  },
}
</script>

<style lang="less">
#app {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-size: 16px;

  /*滚动条整体粗细样式*/
  ::-webkit-scrollbar {
    /*高宽分别对应横竖滚动条的尺寸*/
    width: 8px;
    height: 8px;
  } /*滚动条里面小方块*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
    /* 颜色 */
    background: #b6b6b6 !important;
    /* 线性渐变背景 */
    // background-image: linear-gradient(
    //   45deg,
    //   #ffbd61 25%,
    //   #ffbd61 25%,
    //   #ff8800 25%,
    //   #ff8800 50%,
    //   #ffbd61 50%,
    //   #ffbd61 75%,
    //   #ff8800 75%,
    //   #ff8800 100%
    // ) !important;
  }
  /*滚动条轨道*/
  ::-webkit-scrollbar-track {
    border-radius: 10px !important;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
    background: #ededed !important;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
