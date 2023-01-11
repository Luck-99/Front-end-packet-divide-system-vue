<template>
  <footer class="task-setting-bottom-button">
    <el-button type="primary" @click="handleApplyConfig">应用配置</el-button>
    <el-button @click="$router.back()">返回</el-button>
  </footer>
</template>

<script>
import { writeEnv } from "@/services/file"
export default {
  name: "BottomButton",
  methods: {
    async handleApplyConfig() {
      const loading = this.$loading({
        lock: true,
        text: "正在更改配置中。。。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      })
      const res = await writeEnv({
        depData: this.$store.getters.packageList,
        envName: this.$store.getters.envInfo.key,
      })
      this.$message({
        message: res.msg,
        type: res.code > 0 ? "success" : "error",
      })
      loading.close()
    },
  },
}
</script>

<style lang="less" scoped>
.task-setting-bottom-button {
  background-color: #fff;
  padding: 14px;
  text-align: end;
}
</style>
