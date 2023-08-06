<template>
  <div id="app">
    <div class="view">
      <SideBar></SideBar>
      <div class="view-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
@import "@/style/common.scss";
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.view {
  height: 100%;
  display: flex;

  &-main {
    flex: 1;
    height: 100%;
    padding: 40px;
    background: $backgroundColor-light;
  }
}
</style>
