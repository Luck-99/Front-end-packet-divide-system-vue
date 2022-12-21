<template>
  <div class="dash-borard-task-list">
    <div class="top-title borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false">
      <el-table-column prop="" label="占位用的" width="10px"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="builtBy" label="构建用户"></el-table-column>
      <el-table-column prop="" label="时间">
        <template slot-scope="scope">
          <span v-if="!scope.row.building">{{
            scope.row.lastBuildTime === 0
              ? "尚未构建"
              : getTimeGap(scope.row.lastBuildTime)
          }}</span>
          <span v-else>{{ "构建中" }}</span>
        </template> </el-table-column
      ><el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-video-play"
            title="构建项目"
            circle
            class="primaryColor"
            :loading="scope.row.building"
            :disabled="!scope.row.buildable"
            v-show="!scope.row.building"
            @click.stop="handleBuildClick(scope.row.key)"
          ></el-button>
          <el-button
            icon="el-icon-circle-close"
            circle
            title="停止构建"
            style="color: red"
            v-show="scope.row.building"
            :disabled="!scope.row.building"
            @click.stop="handleStopBuildJob(scope.row.id, scope.row.key)"
          ></el-button>
          <el-button
            icon="el-icon-download"
            circle
            title="下载文件"
            :loading="scope.row.building"
            @click.stop="handleDownLoadClick(scope.row.description)"
          ></el-button>
          <el-button
            icon="el-icon-edit"
            circle
            title="编辑环境"
            @click.stop="handleEditEnvClick(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  downloadFile,
  buildWithParameters,
  stopBuildJob,
} from "@/services/jenkins"
import { getProjects } from "@/services/file"
import { downLoadFile, getTimeGap } from "@/utils/utils"

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
    getTimeGap,
    async getAllProjects() {
      const res = await getProjects()
      if (res.code > 0) {
        this.allJobs = res.data
      }
    },
    async handleBuildClick(projectName) {
      const res = await buildWithParameters({ projectName })
      if (res.code > 0) {
        this.getAllProjects()
      }
      this.$message({
        message: res.msg,
        type: res.code > 0 ? "success" : "error",
      })
    },
    async handleDownLoadClick(name) {
      const res = await downloadFile()
      downLoadFile(res, `${name}.zip`)
    },
    async handleStopBuildJob(id, projectName) {
      const res = await stopBuildJob({ id, projectName })
      this.$message({
        message: res.msg,
        type: res.code > 0 ? "success" : "error",
      })
    },
    handleEditEnvClick(row, column, event) {
      this.$store.commit("setEnvInfo", row)
      this.$router.push({ path: "/TaskSetting" })
    },
  },

  mounted() {
    this.getAllProjects()
  },
  sockets: {
    jenkinsAllJobs(allJobs) {
      this.allJobs = JSON.parse(allJobs)
    },
    jenkinsFileDownLoad(env) {
      this.handleDownLoadClick(env)
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
    &:first-child {
      margin-left: 10px;
    }
  }
  .top-title {
    text-align: left;
    padding: 14px;
  }
}
</style>
