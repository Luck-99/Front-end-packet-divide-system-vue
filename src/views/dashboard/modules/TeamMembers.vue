<template>
  <div class="dash-borard-team-members">
    <div class="top-title borderBottom">{{ title }}</div>
    <div v-if="members?.length">
      <div v-for="i in members" :key="i.id" class="team-content">
        <el-avatar :src="i.avaUrl" :style="{ marginRight: '14px' }" />
        <div>{{ i.name }}</div>
      </div>
    </div>
    <el-empty v-else description="没有团队人员"></el-empty>
  </div>
</template>

<script>
import { getMembers } from "@/services/user"
export default {
  components: {},
  name: "TeamMembers",
  data() {
    return {
      title: "团队成员",
      members: [],
    }
  },
  methods: {
    async getMembers() {
      const res = await getMembers()
      if (res.code > 0) {
        this.members = res.data
      }
    },
  },
  mounted() {
    this.getMembers()
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
