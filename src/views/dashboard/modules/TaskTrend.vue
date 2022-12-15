<template>
  <div class="dash-borard-task-trend">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-for="i in recordList" :key="i.id" class="list-content borderBottom">
      <el-avatar :src="i.avaUrl" :style="{ marginRight: '14px' }" />
      <div>
        <div>
          <span>{{ i.userName }}</span
          ><span v-if="i.envName"
            >{{ ` 在 ` }}<span class="primaryColor">{{ i.envName }}</span></span
          >
          <span>{{ ` ${i.actionDec} ` }}</span>
          <span class="primaryColor">{{ i.action }}</span>
        </div>
        <div class="list-time">
          {{ getTimeGap(i.time) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeGap } from "@/utils/utils"
import { getActionRecordList } from "@/services/file"

export default {
  components: {},
  name: "TaskTrend",
  data() {
    return {
      title: "动态",
      recordList: [],
    }
  },
  methods: {
    getTimeGap,
    async getActionLists() {
      const res = await getActionRecordList()
      if (res.code > 0) {
        this.recordList = res.data
      }
    },
  },
  mounted() {
    this.getActionLists()
  },
  sockets: {
    actionRecordLists(lists) {
      this.recordList = JSON.parse(lists)
    },
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
