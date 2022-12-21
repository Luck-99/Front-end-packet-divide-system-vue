<template>
  <div class="topContent">
    <div class="topTitle">{{ title }}</div>
    <div class="topAvatar">
      <el-avatar :src="userInfo?.avaUrl" />
      <span>{{ userInfo?.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopTitle",
  data() {
    return {
      title: "分组分治打包系统",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      name: "东东",
      userInfo: this.$store.getters.userInfo,
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.topContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 50px;
  .topTitle {
    display: flex;
    align-items: center;
    background-color: #00284d;
    color: #fff;
    padding: 14px;
    height: 100%;
    box-sizing: border-box;
  }
  .topAvatar {
    align-items: center;
    display: flex;
    margin-right: 14px;
  }
}
</style>
