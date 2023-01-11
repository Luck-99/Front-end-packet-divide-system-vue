<template>
  <div class="task-setting-top-info">
    <div>
      <el-avatar
        :src="envInfo.icon ?? avaUrl"
        :style="{ marginRight: '14px' }"
      />
    </div>
    <div class="info">
      <div>{{ envInfo.description }}</div>
      <div>创建人: {{ envInfo.creatBy }}</div>
      <div>
        创建时间：{{
          new Date(envInfo.creatTime).toLocaleDateString().replace(/\//g, "-")
        }}
      </div>
      <div>修改人: {{ envInfo.updateBy }}</div>
      <div>
        修改时间：{{
          new Date(envInfo.updateTime).toLocaleString().replace(/\//g, "-")
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "TopInfo",
  data() {
    return {
      envInfo: this.$store.getters.envInfo,
      title: "配置",
      avaUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
}
</script>

<style lang="less" scoped>
.task-setting-top-info {
  background-color: #fff;
  display: flex;
  padding: 14px;
  align-items: center;
  .info {
    display: flex;
    justify-content: space-between;
    width: 80%;
    text-align: start;
  }
}
</style>
