<template>
  <header class="main-header borderBottom">
    <div class="main-header-title">{{ title }}</div>
    <el-dropdown trigger="click" @command="handleUserClick">
      <div class="main-header-avatar">
        <el-avatar :src="userInfo?.avaUrl ?? defaultAvaUrl" size="small" />
        <span style="margin-left: 7px">{{ userInfo?.name }}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePassWord"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-switch-button" divided command="logout"
          >注销</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <change-pass-word ref="changePassWordRef" />
  </header>
</template>

<script>
import { getUserInfo, logout } from "@/services/user"
import ChangePassWord from "./modules/ChangePassWord.vue"
export default {
  components: { ChangePassWord },
  name: "Header",
  data() {
    return {
      defaultAvaUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "分组分治打包系统",
      userInfo: this.$store.getters.userInfo,
      dialogVisible: false,
    }
  },
  methods: {
    async getUserInfo() {
      const res = await getUserInfo()
      if (res.code > 0) {
        this.$store.commit("setUserInfo", res.data)
      }
    },
    async logout() {
      const res = await logout()
      if (res.code > 0) {
        this.$router.replace("/login")
      }
    },
    async changePassWord() {
      console.log(this.dialog)
    },
    handleUserClick(command) {
      switch (command) {
        case "logout":
          return this.logout()
        case "changePassWord":
          this.$refs.changePassWordRef.dialog.visible = true
          return
        default:
          break
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
  .main-header-avatar {
    align-items: center;
    display: flex;
    margin-right: 14px;
    cursor: pointer;
  }
}
</style>
