<template>
  <div class="dash-board">
    <top-title />
    <div class="left">
      <task-list />
      <task-trend />
    </div>
  </div>
</template>

<script>
import TopTitle from "./modules/TopTitle.vue"
import TaskList from "./modules/TaskList.vue"
import TaskTrend from "./modules/TaskTrend.vue"
export default {
  components: { TopTitle, TaskList, TaskTrend },
  name: "DashBoard",
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less">
.dash-board {
  background: #f0f2f5;
  padding: 14px;
  .left > * {
    margin-top: 14px;
  }
}
</style>
