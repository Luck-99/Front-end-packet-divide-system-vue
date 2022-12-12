<template>
  <div class="task-setting-version-selection">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-for="i in allPackages" :key="i._id" class="packages-list">
      <span class="package-name">{{ i.name }}</span>
      <el-select
        v-model="i.version"
        filterable
        @visible-change="(e) => getPackageInfo(e, i.name)"
        :loading="selectLoading"
      >
        <el-option
          v-for="item in options[i.name]"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { getAllPackages, getPackageInfo } from "@/services/verdaccio"
export default {
  name: "VersionSelection",
  data() {
    return {
      title: "依赖包版本选择",
      allPackages: [],
      selectLoading: false,
      options: {},
    }
  },
  methods: {
    async getAllPackages() {
      const res = await getAllPackages()
      if (res.code > 0) {
        this.allPackages = res.data.filter((item) =>
          item.name.includes("@zglib/product")
        )
      }
    },
    async getPackageInfo(show, name) {
      if (show && !this.options[name]) {
        this.selectLoading = true
        const res = await getPackageInfo({ name })
        if (res.code > 0) {
          const tempVersion = res.data.versions
          const versions = Object.keys(tempVersion)
          this.options[name] = versions
        }
        this.selectLoading = false
      }
    },
  },
  mounted() {
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
      width: 350px;
      display: inline-block;
      text-align: end;
      margin-right: 14px;
    }
  }
}
</style>
