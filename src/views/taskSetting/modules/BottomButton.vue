<template>
  <div class="task-setting-bottom-button">
    <el-button type="primary" @click="handleApplyConfig">应用配置</el-button>
    <el-button @click="$router.back()">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "BottomButton",
  methods: {
    handleApplyConfig: function () {
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
