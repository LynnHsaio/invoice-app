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

      <main>
        <ul class="list">
          <li class="item" v-for="item of list" :key="item.id">
            <div>
              <span class="item-id text-medium">{{ item.id }}</span>
              <span class="text-small">{{ item.paymentDue }}</span>
              <span class="text-small">{{ item.clientName }}</span>
            </div>
            <div>
              <span class="text-medium">£ {{ item.total }}</span>
              <span
                :class="`item-status item-status--${item.status} text-medium`"
                >{{ item.status }}</span
              >
              <span>
                <img
                  src="../assets/icon-arrow-right.svg"
                  alt="arrow right icon"
                />
              </span>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>
<script>
import data from "../data/data.json";

export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      list: data,
    };
  },
  mounted() {
    console.log(data);
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
}

.list {
  list-style: none;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    padding: 30px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
    cursor: pointer;

    span:not(:last-child) {
      margin-right: 40px;
    }
  }
}
</style>
