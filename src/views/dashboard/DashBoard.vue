<template>
  <div class="dash-board">
    <div class="left">
      <task-list />
      <task-trend />
    </div>
    <div class="right">
      <team-members />
    </div>
  </div>
</template>

<script>
import TaskList from "./modules/TaskList.vue"
import TaskTrend from "./modules/TaskTrend.vue"
import TeamMembers from "./modules/TeamMembers.vue"
export default {
  components: { TaskList, TaskTrend, TeamMembers },
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
  display: flex;
  .left {
    flex: 1;
    margin-right: 14px;
    & > * {
      margin-bottom: 14px;
    }
  }
  .right {
    width: 200px;
  }
  // & > * {
  //   margin-top: 14px;
  // }
}
</style>
