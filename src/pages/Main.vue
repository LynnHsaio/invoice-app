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
        <li
          class="item-container"
          v-for="item of list"
          :key="item.id"
          @click="handleItemClick(item)"
        >
          <div>
            <span class="item-id">{{ item.id }}</span>
            <span class="text-small">
              <span style="margin-right: 10px">Due</span>
              <span>{{ formatDate(item.paymentDue) }}</span>
            </span>
            <span class="text-small">{{ item.clientName }}</span>
          </div>
          <div>
            <span class="text-medium currency">{{
              formatCurrency(item.total)
            }}</span>
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
import { formatDate, formatCurrency } from "@/utils";

export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      list: data,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.list = JSON.parse(localStorage.getItem("invoice app") || "[]");
    });
  },
  methods: {
    formatDate,
    formatCurrency,
    handleItemClick(item) {
      this.$router.push({
        path: `/detail/${item.id}`,
        query: { item },
      });
    },
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
</style>
