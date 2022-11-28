<template>
  <div class="dash-borard-team-members">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-for="i in trendList" :key="i.id" class="team-content">
      <el-avatar :src="i.avaUrl" :style="{ marginRight: '14px' }" />
      <div>{{ i.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "TeamMembers",
  data() {
    return {
      title: "团队成员",
      trendList: [
        {
          id: 1,
          avaUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          name: "东东",
        },
        {
          id: 2,
          avaUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          name: "张三",
        },
      ],
    }
  },
  methods: {},
  mounted() {
    console.log(11)
  },
}
</script>

<style lang="less" scoped>
.dash-borard-team-members {
  background-color: #fff;
  .top-title {
    text-align: left;
    padding: 14px;
  }
  .team-content {
    padding: 14px;
    display: flex;
    align-items: center;
    &:not(:last-child) {
      padding-bottom: 0;
    }
  }
}
</style>
