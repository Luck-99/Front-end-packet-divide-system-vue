<template>
  <div class="dash-borard-task-list">
    <div class="topTitle borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false">
      <el-table-column prop="" label="占位用的" width="10px"> </el-table-column>
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
            @click="handleBuildClick(scope.row.fullName)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllJob, buildJob } from "@/services/jenkins"
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
    getAllJenkinsJob: async function () {
      const res = await getAllJob()
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
  .el-button--small.is-circle {
    padding: 5px;
    font-size: 1.25rem;
  }
  .topTitle {
    text-align: left;
    padding: 14px;
  }
}
</style>
