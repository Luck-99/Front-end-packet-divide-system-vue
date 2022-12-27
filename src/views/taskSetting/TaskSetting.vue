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
export default {
  components: { TopInfo, VersionSelection, BottomButton },
  name: "TaskSetting",
  data() {
    return {}
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
