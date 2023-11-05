<template>
  <div :class="`toggleForm ${visible ? 'show' : ''}`">
    <div class="mask" @click="close"></div>

    <div class="form-container">
      <h2>Edit</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "ToggleForm",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss">
@import "@/style/mixins.scss";

.toggleForm {
  @include fixedTop;
  z-index: -1;
  transition-duration: 1s;

  &.show {
    z-index: 10;

    .mask {
      opacity: 0.5;
    }

    .form-container {
      transform: translateX(0%);
    }
  }
}

.mask {
  @include fixedTop;
  background-color: #000;
  opacity: 0;
  transition-duration: 1s;
}

.form-container {
  @include fixedTop;
  @include borderRadius;
  width: 50%;
  padding-left: 100px;
  background: #fff;
  transform: translateX(-100%);
  transition-duration: 1s;
}
</style>
