<template>
  <div class="task-setting-version-selection">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-for="i in allPackages" :key="i._id" class="packages-list">
      <span
        class="package-name"
        @click="getPackageReadme(i.name, i.version, i.description)"
        >{{ filterLabel(i.name) }}</span
      >
      <el-select
        v-if="i.versionMode"
        v-model="i.version"
        filterable
        @visible-change="(e) => getPackageInfo(e, i.name)"
        :loading="selectLoading"
        style="width: 200px"
      >
        <el-option
          v-for="item in packageOptions[i.name]"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input
        v-else
        v-model="i.gitUrl"
        style="width: 300px"
        placeholder="请输入git链接"
      ></el-input>
      <transition name="el-fade-in-linear">
        <i
          class="el-icon-info"
          title="查看提交记录"
          v-show="commitInfoIconShow"
          @click="getPackageCommits(i.name, i.version)"
        ></i
      ></transition>
      <!-- <el-switch
        v-model="i.versionMode"
        active-text="版本模式"
        inactive-text="开发模式"
      >
      </el-switch> -->
    </div>
    <el-dialog
      custom-class="package-readme-dialog"
      :center="true"
      top="10vh"
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      <div class="markdown-body" v-html="dialog.info"></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllPackages,
  getPackageInfo,
  getPackageReadme,
} from "@/services/verdaccio"
import { getEnvDeps } from "@/services/file"
import { getProjectsCommits } from "@/services/gitlab"
export default {
  name: "VersionSelection",
  data() {
    return {
      title: "依赖包版本选择",
      allPackages: [],
      allProjectCommits: {},
      selectLoading: false,
      commitInfoIconShow: false,
      packageOptions: {},
      dialog: {
        title: "",
        visible: false,
        info: "",
      },
    }
  },
  methods: {
    async getAllPackages() {
      const packageRes = await getAllPackages()
      const tempEnvRes = await getEnvDeps({
        key: this.$store.getters.envInfo.key,
      })
      if (packageRes.code > 0) {
        this.allPackages = packageRes.data.filter((item) =>
          item.name.includes("@zglib/product-system")
        )
        this.getAllProjectCommits(this.allPackages.map((item) => item.name))
      }
      if (tempEnvRes.code > 0) {
        for (const [key, value] of Object.entries(tempEnvRes.data)) {
          this.allPackages = this.allPackages.map((item) => {
            const tempObj = { ...item }
            if (tempObj.name === key) {
              tempObj.version = value
            }
            tempObj.versionMode = true
            return tempObj
          })
        }
      }
    },
    async getPackageInfo(show, name) {
      if (show && !this.packageOptions[name]) {
        this.selectLoading = true
        const res = await getPackageInfo({ name })
        if (res.code > 0) {
          const tempVersion = res.data.versions
          const versions = Object.keys(tempVersion)
          this.packageOptions[name] = versions
        }
        this.selectLoading = false
      }
    },
    async getPackageReadme(name, version, description) {
      const res = await getPackageReadme({ name, version })
      if (res.code > 0) {
        this.dialog.info = res.data
        this.dialog.title = `${description} V${version}`
        this.dialog.visible = true
      }
    },
    async getAllProjectCommits(packages) {
      const res = await getProjectsCommits({ packages, maxRecords: 20 })
      if (res.code > 0) {
        this.allProjectCommits = res.data
        this.commitInfoIconShow = true
      }
    },
    filterLabel: (label) => {
      return label?.replace("@zglib/", "")
    },
    getPackageCommits(tempProject, version) {
      const project = tempProject.replace("@zglib/", "")
      if (this.allProjectCommits[project][version]) {
        this.dialog.info = this.allProjectCommits[project][version]
          .map((item) => item.message)
          .join("\n")
        this.dialog.title = `${project} V${version}`
        this.dialog.visible = true
      }
    },
  },
  created() {
    this.getAllPackages()
  },
  watch: {
    allPackages: {
      deep: true,
      handler(val) {
        const tempPackages = {}
        val.forEach((item) => {
          tempPackages[item.name] = item.version
        })
        this.$store.commit("setPackageList", tempPackages)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.task-setting-version-selection {
  background-color: #fff;
  .top-title {
    text-align: left;
    padding: 14px;
  }
  .packages-list {
    padding: 7px 0;
    text-align: start;
    .package-name {
      width: 400px;
      display: inline-block;
      text-align: end;
      margin-right: 14px;
      cursor: pointer;
    }
    .el-icon-info {
      margin: 0 7px;
      cursor: pointer;
    }
  }
  :deep(.package-readme-dialog) {
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
      .markdown-body {
        blockquote,
        h1,
        h2,
        h3,
        ul,
        ol,
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
