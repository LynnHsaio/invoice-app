<template>
  <div id="app">
    <div class="view">
      <SideBar></SideBar>
      <div class="view-main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script>
import Main from "@/views/Main";
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    Main,
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
.view {
  height: 100%;
  display: flex;

  &-main {
    flex: 1;
  }
}
</style>
