<script>
export default {
  name: "LoginView",
  data() {
    return {
      title: "前端分组分治打包系统",
      account: "",
      password: "",
      autoLogin: "",
      loading: false,
    }
  },
  methods: {
    login: function () {
      this.loading = true
      console.log(this.account, this.password, this.autoLogin)
      setTimeout(() => {
        this.loading = false
        this.$router.push({ path: "/home" })
      }, 1000)
    },
  },
}
</script>

<template>
  <div class="main">
    <h1>{{ title }}</h1>
    <div>
      <el-input
        class="input"
        v-model="account"
        placeholder="请输入账号"
      ></el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
    </div>
    <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
    <el-button
      class="loginButton"
      type="primary"
      @click="login"
      :loading="loading"
      >登录</el-button
    >
  </div>
</template>

<style lang="less">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .input {
    margin-bottom: 14px;
  }
  .loginButton {
    margin-top: 14px;
  }
}
</style>
