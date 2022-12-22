<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./Header.vue"
export default {
  name: "main",
  components: { Header },
}
</script>

<style></style>
