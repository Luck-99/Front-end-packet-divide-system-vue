<script>
import TaskItem from "../components/TaskItem.vue"
export default {
  components: { TaskItem },
  name: "TaskList",
  data() {
    return {
      title: "任务列表",
    }
  },
  methods: {},
}
</script>

<template>
  <div class="taskListmain">
    <div class="topTitle borderBottom">{{ title }}</div>
    <div>
      <task-item
        :title="'太保环境'"
        :userName="'小张'"
        :lastStatus="'5小时前'"
      />
      <task-item
        :title="'121环境'"
        :userName="'小许'"
        :lastStatus="'13小时前'"
      />
      <task-item :title="'南银环境'" :userName="'小张'" :lastStatus="'2天前'" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.taskListmain {
  background-color: #fff;
  .topTitle {
    text-align: left;
    padding: 14px;
  }
}
</style>
