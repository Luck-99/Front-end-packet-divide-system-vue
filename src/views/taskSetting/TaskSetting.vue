<template>
  <div class="task-setting">
    <top-info />
    <version-selection />
    <bottom-button />
  </div>
</template>

<script>
import TopInfo from "./modules/TopInfo.vue"
import VersionSelection from "./modules/VersionSelection.vue"
import BottomButton from "./modules/BottomButton.vue"
import { environmentSetting } from "@/services/file"
export default {
  components: { TopInfo, VersionSelection, BottomButton },
  name: "TaskSetting",
  data() {
    return {
      envKey: this.$store.getters.envInfo.key,
      username: this.$store.getters.userInfo.username,
      notifyList: {},
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      environmentSetting({ envKey: vm.envKey }).then((res) => {
        if (res.code > 0) {
          const users = res.data
          users.forEach((user) => {
            const { name, username } = user
            if (vm.username !== username) {
              vm.setNotifyDialog(name, username)
            }
          })
        }
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    Object.keys(this.notifyList).forEach((notifys) => {
      this.notifyList[notifys].close()
    })
    environmentSetting({ envKey: this.envKey, isLeave: true })
    next()
  },
  methods: {
    setNotifyDialog(name, userName, isLeave = false) {
      this.notifyList[`${this.envKey}${userName}`] = this.$notify({
        message: `${name} ${isLeave ? "已修改完成,请刷新" : "正在修改此配置"}`,
        duration: 3000,
        showClose: false,
      })
    },
  },
  sockets: {
    leaveEnvironmentSetting(info) {
      const { envKey, name, username } = info
      if (
        envKey === this.envKey &&
        this.notifyList[`${this.envKey}${username}`]
      ) {
        this.setNotifyDialog(name, username, true)
      }
    },
  },
}
</script>

<style lang="less">
.task-setting {
  background-color: #f0f2f5;
  padding: 14px;
  & > * {
    margin-bottom: 14px;
  }
}
</style>
