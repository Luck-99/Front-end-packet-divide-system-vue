<template>
  <div class="dash-borard-task-list">
    <div class="top-title borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false">
      <el-table-column prop="" label="占位用的" width="10px"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="fullName" label="全称"> </el-table-column>
      <el-table-column prop="lastBuild.timestamp" label="时间">
        <template slot-scope="scope">
          {{ getTimeInterval(scope.row.lastBuild.timestamp) }}
        </template> </el-table-column
      ><el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-video-play"
            circle
            @click="handleBuildClick(scope.row.fullName)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllJobs, buildJob } from "@/services/jenkins"
import { getTimeInterval } from "@/utils/utils"

export default {
  components: {},
  name: "TaskList",
  data() {
    return {
      title: "任务列表",
      allJobs: [],
      timer: null,
    }
  },
  methods: {
    getTimeInterval,
    getAllJenkinsJob: async function () {
      const res = await getAllJobs()
      if (res.code > 0) {
        this.allJobs = res.data
      }
    },
    handleBuildClick: function (name) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await buildJob({ name })
        if (res.code > 0) {
          this.$message({
            message: "构建成功",
            type: "success",
          })
        } else {
          this.$message.error(res.msg)
        }
        this.timer = null
      }, 1000)
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
  .el-button--small.is-circle {
    padding: 5px;
    font-size: 1.25rem;
  }
  .top-title {
    text-align: left;
    padding: 14px;
  }
}
</style>
