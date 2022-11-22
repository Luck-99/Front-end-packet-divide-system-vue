<script>
import TaskList from "./modules/TaskList.vue"
import TopTitle from "./modules/TopTitle.vue"
export default {
  components: { TopTitle, TaskList },
  name: "DashBoard",
  data() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <div class="main">
    <top-title />
    <div class="left">
      <task-list />
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  background-color: #f0f2f5;
  padding: 14px;
  .left {
    margin-top: 14px;
  }
}
</style>
