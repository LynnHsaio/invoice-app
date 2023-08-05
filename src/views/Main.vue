<template>
  <div class="Main page">
    <div class="container">
      <div class="toolbar">
        <header>
          <h1 class="heading">Invoices</h1>
          <p class="text-small color-purple">
            There are {{ 7 }} total invoices
          </p>
        </header>
        <div class="btns">
          <button class="btn btn--white">
            <span> Filter by status </span>
            <img src="../assets/icon-arrow-down.svg" alt="arrow down icon" />
          </button>
          <button class="btn btn-new btn--purple">
            <img src="../assets/icon-plus.svg" alt="puls icon" />
            <span> New Invoice</span>
          </button>
        </div>
      </div>
      <main></main>
    </div>
  </div>
</template>
<script>
export default {
  name: "MainPage",
  components: {},
};
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
