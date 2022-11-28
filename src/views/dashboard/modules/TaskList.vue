<template>
  <div class="dash-borard-task-list">
    <div class="topTitle borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false">
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="fullName" label="全称"> </el-table-column>
      <el-table-column prop="lastBuild.timestamp" label="时间">
        <template slot-scope="scope">
          {{ getTime(scope.row.lastBuild.timestamp) }}
        </template> </el-table-column
      ><el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-video-play"
            circle
            @click="handleRowClick(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllJob } from "@/services/jenkins"
export default {
  components: {},
  name: "TaskList",
  data() {
    return {
      title: "任务列表",
      allJobs: [],
    }
  },
  methods: {
    getAllJenkinsJob: async function () {
      const res = await getAllJob()
      if (res.code > 0) {
        this.allJobs = res.data
      }
    },
    handleRowClick: function (params) {
      console.log(params)
    },
    getTime: function (time) {
      const now = new Date().getTime()
      const timeDifference = (now - time) / 1000
      const day =
        Math.floor(timeDifference / (60 * 60 * 24)) > 0
          ? `${Math.floor(timeDifference / (60 * 60 * 24))} 天前`
          : null
      const hour =
        Math.floor(timeDifference / (60 * 60)) > 0
          ? `${Math.floor(timeDifference / (60 * 60))} 小时前`
          : null
      const min =
        Math.floor(timeDifference / 60) > 0
          ? `${Math.floor(timeDifference / 60)} 分钟前`
          : null
      const second =
        Math.floor(timeDifference) > 0
          ? `${Math.floor(timeDifference)} 秒前`
          : null
      return day ?? hour ?? min ?? second
    },
  },
  mounted() {
    this.getAllJenkinsJob()
  },
}
</script>

<style lang="less" scoped>
.dash-borard-task-list {
  background-color: #fff;
  .topTitle {
    text-align: left;
    padding: 14px;
  }
}
</style>
