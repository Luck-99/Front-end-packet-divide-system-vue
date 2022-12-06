<template>
  <div class="dash-borard-task-list">
    <div class="top-title borderBottom">{{ title }}</div>
    <el-table :data="allJobs" :show-header="false" @row-click="handleRowClick">
      <el-table-column prop="" label="占位用的" width="10px"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="builtOn" label="构建用户"> </el-table-column>
      <el-table-column prop="" label="时间">
        <template slot-scope="scope">
          <span v-if="!scope.row.building">{{
            scope.row.lastBuildTime === 0
              ? "尚未构建"
              : getTimeGap(scope.row.lastBuildTime)
          }}</span>
          <span v-else>{{ "构建中" }}</span>
        </template> </el-table-column
      ><el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-video-play"
            title="构建项目"
            circle
            class="primaryColor"
            :loading="scope.row.building"
            :disabled="!scope.row.buildable"
            @click.stop="handleBuildClick(scope.row.key)"
          ></el-button>
          <el-button
            icon="el-icon-download"
            circle
            title="下载文件"
            :loading="scope.row.building"
            @click.stop="handleDownLoadClick(scope.row.key)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { downloadFile, buildWithParameters } from "@/services/jenkins"
import { getProjects } from "@/services/file"
import { downLoadFile, getTimeGap } from "@/utils/utils"

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
    getTimeGap,
    async getAllProjects() {
      const res = await getProjects()
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
    this.getAllProjects()
  },
  sockets: {
    jenkinsAllJobs: function (allJobs) {
      this.allJobs = JSON.parse(allJobs)
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
