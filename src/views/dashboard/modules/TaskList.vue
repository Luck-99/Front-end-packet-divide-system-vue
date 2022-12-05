<template>
  <div class="dash-borard-task-list">
    <div class="top-title borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false" @row-click="handleRowClick">
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
            title="构建项目"
            circle
            :loading="buttonLoading"
            @click.stop="handleBuildClick(scope.row.fullName)"
          ></el-button>
          <el-button
            icon="el-icon-download"
            circle
            title="下载文件"
            :loading="buttonLoading"
            @click.stop="handleDownLoadClick(scope.row.fullName)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getAllJobs,
  downloadFile,
  buildWithParameters,
} from "@/services/jenkins"
import { downLoadFile, getTimeInterval } from "@/utils/utils"

export default {
  components: {},
  name: "TaskList",
  data() {
    return {
      title: "任务列表",
      allJobs: [],
      timer: null,
      buttonLoading: false,
    }
  },
  methods: {
    getTimeInterval,
    async getAllJenkinsJob() {
      const res = await getAllJobs()
      if (res.code > 0) {
        this.allJobs = res.data
      }
    },
    handleBuildClick(name) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await buildWithParameters({ name })
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
    async handleDownLoadClick(name) {
      const res = await downloadFile({ name })
      downLoadFile(res, `${name}.zip`)
    },
    handleRowClick(row, column, event) {
      const { fullName } = row
      this.$router.push({ path: "/TaskSetting" })
    },
  },

  mounted() {
    this.getAllJenkinsJob()
  },
  sockets: {
    jenkinsAllJobs: function (allJobs) {
      this.allJobs = [...allJobs]
      console.log(allJobs)
    },
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
