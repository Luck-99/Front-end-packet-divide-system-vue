<template>
  <header class="main-header borderBottom">
    <div class="main-header-title">{{ title }}</div>
    <div class="topAvatar">
      <el-avatar :src="userInfo?.avaUrl" size="medium" />
      <span>{{ userInfo?.name }}</span>
    </div>
  </header>
</template>

<script>
import { getUserInfo } from "@/services/user"
export default {
  name: "Header",
  data() {
    return {
      title: "分组分治打包系统",
      userInfo: this.$store.getters.userInfo,
    }
  },
  methods: {
    async getUserInfo() {
      const res = await getUserInfo()
      if (res.code > 0) {
        this.$store.commit("setUserInfo", res.data)
      }
    },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-sizing: border-box;
  .main-header-title {
    display: flex;
    align-items: center;
    color: black;
    padding: 14px;
    box-sizing: border-box;
  }
  .topAvatar {
    align-items: center;
    display: flex;
    margin-right: 14px;
  }
}
</style>
