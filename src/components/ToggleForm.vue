<template>
  <div class="toggleForm">
    <div class="form-container">
      <h2>Edit</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "ToggleForm",
};
</script>
<style lang="scss">
@import "@/style/mixins.scss";
@import "@/style/variables.scss";

.toggleForm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.5);
}

.form-container {
  width: 50%;
  height: 100%;
  padding-left: 100px;
  background: $backgroundColor-light;
  @include borderRadius;
}
</style>
