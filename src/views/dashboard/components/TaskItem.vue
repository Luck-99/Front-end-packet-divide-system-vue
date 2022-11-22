<script>
export default {
  name: "TaskItem",
  data() {
    return {
      status: null,
    }
  },
  methods: {},
  props: {
    title: String,
    userName: String,
    lastStatus: String,
  },
}
</script>

<template>
  <div class="main borderBottom">
    <div class="title">{{ title }}</div>
    <div class="userName">{{ userName }}</div>
    <div class="status">{{ status ?? lastStatus }}</div>
    <div>
      <el-button></el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  padding: 14px;
  .title {
  }
  .userName {
  }
  .status {
  }
}
</style>
