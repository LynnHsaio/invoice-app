<template>
  <div class="container">
    <div class="toolbar">
      <header>
        <h1 class="heading">Invoices</h1>
        <p class="text-small color-purple">
          There are {{ list.length }} total invoices
        </p>
      </header>
      <div class="btns">
        <el-select v-model="filterStatus" placeholder="Filter by status">
          <el-option
            v-for="item in filterOptions"
            :key="item.CODE_VAL"
            :label="item.CODE_DESC"
            :value="item.CODE_VAL"
          >
          </el-option>
        </el-select>
        <!-- <button class="btn btn--white">
          <span> Filter by status </span>
          <img src="../assets/icon-arrow-down.svg" alt="arrow down icon" />
        </button> -->
        <button
          class="btn btn-new btn--purple"
          @click="toggleFormVisible = true"
        >
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

    <!-- 編輯表單抽屜 -->
    <ToggleForm
      isNew
      :visible.sync="toggleFormVisible"
      @submit="handleCreateItem"
    />
  </div>
</template>
<script>
import data from "../data/data.json";
import { formatDate, formatCurrency } from "@/utils";
import ToggleForm from "@/components/ToggleForm.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "MainPage",
  components: { ToggleForm },
  data() {
    return {
      list: data,

      filterStatus: "",
      filterOptions: [
        {
          CODE_DESC: "Pending",
          CODE_VAL: "pending",
        },
        {
          CODE_DESC: "Paid",
          CODE_VAL: "paid",
        },
        {
          CODE_DESC: "Draft",
          CODE_VAL: "draft",
        },
      ],

      toggleFormVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // localStorage.setItem("invoice app", JSON.stringify(data));

      vm.initData(vm);
    });
  },
  methods: {
    formatDate,
    formatCurrency,
    initData(target) {
      target.list = JSON.parse(localStorage.getItem("invoice app") || "[]");
    },
    handleItemClick(item) {
      this.$router.push({
        path: `/detail/${item.id}`,
        query: { item },
      });
    },
    handleCreateItem(form) {
      const item = { ...form, id: this.generateShortUuid() };
      this.list.push(item);

      this.save(this.list);
      this.toggleFormVisible = false;
    },
    generateShortUuid(length = 6) {
      // 截取指定长度的子字符串
      const shortUuid = uuidv4().substring(0, length);

      return shortUuid;
    },
    save(updatedList) {
      localStorage.setItem("invoice app", JSON.stringify(updatedList));
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
