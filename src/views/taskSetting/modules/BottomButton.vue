<template>
  <div class="task-setting-bottom-button">
    <el-button type="primary" @click="handleApplyConfig">应用配置</el-button>
    <el-button @click="$router.back()">返回</el-button>
  </div>
</template>

<script>
import { writeEnv } from "@/services/file"
export default {
  name: "BottomButton",
  methods: {
    async handleApplyConfig() {
      const res = await writeEnv({
        depData: {},
        envName: "env_xingye",
      })
      if (res.code > 0) {
        this.$message.success("修改成功")
      }
      console.log("应用配置")
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
