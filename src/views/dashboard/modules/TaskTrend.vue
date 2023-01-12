<template>
  <div class="dash-borard-task-trend">
    <div class="top-title borderBottom">{{ title }}</div>
    <div class="dash-borard-task-trend-list" v-if="recordList?.length">
      <div
        v-for="i in recordList"
        :key="i.time"
        class="list-content borderBottom"
      >
        <el-avatar
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          :style="{ marginRight: '14px' }"
        />
        <div>
          <div>
            <span>{{ i.userName }}</span
            ><span v-if="i.envName"
              >{{ ` 在 `
              }}<span class="primaryColor">{{ i.envName }}</span></span
            >
            <span>{{ ` ${i.actionDec} ` }}</span>
            <span class="primaryColor">{{ i.action }}</span>
            <span
              style="margin: 0 14px; cursor: pointer"
              @click="getBuildLog(i.envName, i.buildId)"
              v-if="i.buildId"
              >{{ `#${i.buildId}` }}</span
            >
          </div>
          <div class="list-time">
            {{ getTimeGap(i.time) }}
          </div>
        </div>
      </div>
    </div>
    <el-empty v-else description="没有进行过构建"></el-empty>
    <el-dialog
      custom-class="my-dialog"
      :center="true"
      top="10vh"
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      {{ dialog.info }}
    </el-dialog>
  </div>
</template>

<script>
import { getTimeGap } from "@/utils/utils"
import { getActionRecordList } from "@/services/file"
import { getBuildLog } from "@/services/jenkins"

export default {
  components: {},
  name: "TaskTrend",
  data() {
    return {
      title: "动态",
      recordList: [],
      dialog: {
        title: "",
        visible: false,
        info: "",
      },
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
    async getBuildLog(envName, id) {
      const res = await getBuildLog({ id })
      if (res.code > 0) {
        this.dialog.info = res.data
        this.dialog.title = `${envName}\t${id}`
        this.dialog.visible = true
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
  .dash-borard-task-trend-list {
    max-height: 40vh;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
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
  ::v-deep .my-dialog {
    width: 80%;
    max-height: 80%;
    ::-webkit-scrollbar {
      display: none;
    }
    .el-dialog__body {
      white-space: pre-line;
      overflow: scroll;
      padding: 0 7px 7px;
      max-height: 600px;
    }
  }
}
</style>
