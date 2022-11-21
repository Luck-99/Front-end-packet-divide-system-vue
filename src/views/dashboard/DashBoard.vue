<script>
export default {
  name: "DashBoard",
  data() {
    return {
      title: "分组分治打包系统",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      name: "东东",
    }
  },
  methods: {},
}
</script>

<template>
  <div class="main">
    <div class="topContent">
      <div class="topTitle">{{ title }}</div>
      <div class="topAvatar">
        <el-avatar :src="circleUrl" />
        <span>{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.main {
  background-color: #f0f2f5;
  padding: 14px;
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
}
</style>
