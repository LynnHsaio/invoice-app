<template>
  <div class="container">
    <div class="margin-bottom-small">
      <button class="btn btn--white" @click="goBack">
        <img src="../assets/icon-arrow-left.svg" alt="arrow down icon" />
        <span> Go Back</span>
      </button>
    </div>

    <div class="item-container">
      <div>
        <span class="text-small">Status</span>
        <span :class="`item-status item-status--${item.status} text-medium`">{{
          item.status
        }}</span>
      </div>
      <div class="btns">
        <button class="btn btn--white">
          <span> Edit</span>
        </button>
        <button class="btn btn--red">
          <span> Delete</span>
        </button>
        <button class="btn btn--purple">
          <span> Mark as Paid </span>
        </button>
      </div>
    </div>

    <div class="shadow-container"></div>
  </div>
</template>
<script>
export default {
  name: "DetailPage",
  data() {
    return {
      item: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (Object.prototype.hasOwnProperty.call(vm.$route.query, "item")) {
        vm.item = vm.$route.query.item;
      }
    });
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
