<template>
  <div class="dash-borard-task-trend">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-for="i in trendList" :key="i.id" class="list-content borderBottom">
      <el-avatar :src="i.avaUrl" :style="{ marginRight: '14px' }" />
      <div>
        <div>
          <span>{{ i.name }}</span
          ><span>{{ i.env ? ` 在 ${i.env}` : "" }}</span>
          <span>{{ ` ${i.actionDec} ` }}</span>
          <span>{{ i.action }}</span>
        </div>
        <div class="list-time">
          {{ getTimeInterval(i.lasttimestamp) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeInterval } from "@/utils/utils"

export default {
  components: {},
  name: "TaskTrend",
  data() {
    return {
      title: "动态",
      trendList: [
        {
          id: 1,
          avaUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          name: "东东",
          env: "开发环境",
          actionDec: "进行了",
          action: "构建",
          lasttimestamp: new Date() - 1000 * 60 * Math.random(),
        },
        {
          id: 2,
          avaUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          name: "东东",
          env: "",
          actionDec: "新增了",
          action: "开发环境",
          lasttimestamp: new Date() - 1000 * 60 * 60 * Math.random(),
        },
      ],
    }
  },
  methods: { getTimeInterval },
  mounted() {
    console.log(11)
  },
}
</script>

<style lang="less" scoped>
.dash-borard-task-trend {
  background-color: #fff;
  .top-title {
    text-align: left;
    padding: 14px;
  }
  .list-content {
    display: flex;
    padding: 14px;
    .list-time {
      text-align: start;
      color: #a5a5a5;
    }
  }
}
</style>
