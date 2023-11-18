<template>
  <aside class="SideBar">
    <div class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M0 0H83C94.0457 0 100 8.9543 100 20V83C100 94.0457 94.0457 100 83 100H0V0Z"
          fill="#7C5DFA"
        />
        <mask
          id="mask0_0_8894"
          style="mask-type: luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <path
            d="M0 0H83C94.0457 0 100 8.9543 100 20V83C100 94.0457 94.0457 100 83 100H0V0Z"
            fill="white"
          />
        </mask>

        <g mask="url(#mask0_0_8894)">
          <path
            d="M100 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H100V52Z"
            fill="#9277FF"
          />
        </g>
      </svg>

      <img src="../assets/logo.svg" />
    </div>

    <div>
      <div class="mode">
        <img src="../assets/icon-moon.svg" />
      </div>

      <div class="avatar">
        <img src="../assets/image-avatar.jpg" />
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: "SideBar",
};
</script>
<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.SideBar {
  height: 100%;
  width: $sideBar-width;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-black-dark;
  @include borderRadius;
  z-index: 99;

  .logo,
  .avatar,
  .mode {
    height: 100px;
    widows: 100%;
    position: relative;

    img {
      @include absCenter;
    }
  }

  .avatar {
    border-top: solid 1px #494e6e;

    img {
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
