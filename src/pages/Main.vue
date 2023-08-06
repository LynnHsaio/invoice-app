<template>
  <div class="container">
    <div class="toolbar">
      <header>
        <h1 class="heading">Invoices</h1>
        <p class="text-small color-purple">There are {{ 7 }} total invoices</p>
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

    <main class="main">
      <div class="empty" v-show="list.length <= 0">
        <img src="../assets/illustration-empty.svg" alt="empty" />
        <h2 class="text-large">There is nothing here</h2>
        <p class="text-small">Create an invoice by clicking the</p>
        <p class="text-small">
          <strong>New Invoice</strong> button and get started
        </p>
      </div>

      <ul class="list" v-show="list.length > 0">
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
};
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.main {
  flex: 1;

  .empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      margin-bottom: 60px;
    }

    h2 {
      margin-bottom: 24px;
    }
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
}
</style>
