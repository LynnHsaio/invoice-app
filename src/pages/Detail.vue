<template>
  <div class="container">
    <!-- Go Back按鈕 -->
    <div class="margin-bottom-small">
      <button class="btn btn--white" @click="goBack">
        <img src="../assets/icon-arrow-left.svg" alt="arrow down icon" />
        <span> Go Back</span>
      </button>
    </div>

    <!-- 工具列 -->
    <div class="item-container">
      <div>
        <span class="text-small">Status</span>
        <span :class="`item-status item-status--${item.status} text-medium`">{{
          item.status
        }}</span>
      </div>
      <div class="btns">
        <button class="btn btn--white" @click="toggleFormVisible = true">
          <span> Edit</span>
        </button>
        <button class="btn btn--red" @click="confirmDialogVisible = true">
          <span> Delete</span>
        </button>
        <button class="btn btn--purple">
          <span> Mark as Paid </span>
        </button>
      </div>
    </div>

    <!-- 明細 -->
    <main class="main">
      <div class="detail">
        <div class="info">
          <header class="header">
            <div>
              <p class="title item-id">{{ item.id }}</p>
              <p class="text-small">{{ item.description }}</p>
            </div>
            <div class="address text-small">
              <p>{{ item.senderAddress.street }}</p>
              <p>{{ item.senderAddress.city }}</p>
              <p>{{ item.senderAddress.postCode }}</p>
              <p>{{ item.senderAddress.country }}</p>
            </div>
          </header>

          <div class="data">
            <div class="column">
              <div>
                <p class="title text-small">Invoice Date</p>
                <p class="text-medium">{{ formatDate(item.createdAt) }}</p>
              </div>
              <div>
                <p class="title text-small">Payment Due</p>
                <p class="text-medium">{{ formatDate(item.paymentDue) }}</p>
              </div>
            </div>
            <div>
              <p class="title text-small">Bill to</p>
              <p class="text-medium" style="margin-bottom: 10px">
                {{ item.clientName }}
              </p>
              <div class="address text-small">
                <p>{{ item.clientAddress.street }}</p>
                <p>{{ item.clientAddress.city }}</p>
                <p>{{ item.clientAddress.postCode }}</p>
                <p>{{ item.clientAddress.country }}</p>
              </div>
            </div>
            <div>
              <p class="title text-small">Sent to</p>
              <p class="text-medium">{{ item.clientEmail }}</p>
            </div>
          </div>
        </div>

        <div class="list-container">
          <div class="list">
            <div class="list-title text-small">
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            <ul>
              <li
                class="list-item text-medium"
                v-for="(listItem, index) of item.items"
                :key="index"
              >
                <span>{{ listItem.name }}</span>
                <span class="color-purple">{{ listItem.quantity }}</span>
                <span class="color-purple currency">{{
                  formatCurrency(listItem.price, 1, item)
                }}</span>
                <span class="currency">{{
                  formatCurrency(listItem.total, 2, item)
                }}</span>
                <!-- -----------------以下測試----------------- -->
                <!-- <span class="color-purple currency">{{
                  formatCurrency(listItem.price, 1, item)
                }}</span>
                <span class="currency">{{
                  formatCurrency(listItem.total, 2, item)
                }}</span> -->
              </li>
            </ul>
          </div>
          <div class="total">
            <span class="text-small">Amount Due</span>
            <span class="text-large currency">{{
              formatCurrency(amountDue, 3, item)
            }}</span>
            <!-- -----------------以下測試----------------- -->
            <!-- <span class="text-large currency">{{
              formatCurrency(amountDue, 3, item)
            }}</span> -->
          </div>
        </div>
      </div>
    </main>

    <!-- 編輯表單抽屜 -->
    <ToggleForm
      :visible.sync="toggleFormVisible"
      :parentForm.sync="item"
      @submit="handleUpdate"
    />

    <!-- 刪除確認彈窗 -->
    <el-dialog :visible.sync="confirmDialogVisible" width="480px">
      <span slot="title"> <h2 class="text-large">Confirm Deletion</h2> </span>
      <span class="text-small"
        >Are you sure you want to delete invoice #{{ item.id }}? This action
        cannot be undone.</span
      >
      <span slot="footer">
        <button class="btn btn--white" @click="confirmDialogVisible = false">
          <span> Cancel</span>
        </button>
        <button class="btn btn--red" @click="handleDelete">
          <span> Delete</span>
        </button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import data from "../data/data.json";
import { formatDate, formatCurrency } from "@/utils";
import ToggleForm from "@/components/ToggleForm.vue";

export default {
  name: "DetailPage",
  components: { ToggleForm },
  data() {
    return {
      list: [],
      item: {
        id: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: "",
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        clientAddress: {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        items: [],
        total: "",
      },

      toggleFormVisible: false,
      confirmDialogVisible: false,
    };
  },
  computed: {
    amountDue() {
      return this.item.items.reduce((accu, cur) => accu + cur.total, 0);
    },
  },
  // -----------------以下測試-----------------
  // computed: {
  //   amountDue() {
  //     console.log("computed", JSON.parse(JSON.stringify(this.item)));
  //     return this.item.items.reduce((accu, cur) => accu + cur.total, 0);
  //   },
  // },
  // watch: {
  // item(newValue, oldValue) {
  //   console.log("watch newValue", newValue);
  //   console.log("watch oldValue", oldValue);
  // },
  // item: {
  //   immediate: true,
  //   handler(newValue, oldValue) {
  //     console.log("watch newValue", newValue);
  //     console.log("watch oldValue", oldValue);
  //   },
  // },
  // },
  // -----------------------------------------

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        Object.prototype.hasOwnProperty.call(vm.$route.params, "id") &&
        vm.$route.params.id
      ) {
        vm.initData(vm);
      }
    });
  },
  // -----------------以下測試-----------------
  // beforeRouteEnter(to, from, next) {
  //   console.log("beforeRouteEnter ", this);
  //   next((vm) => {
  //     if (
  //       Object.prototype.hasOwnProperty.call(vm.$route.params, "id") &&
  //       vm.$route.params.id
  //     ) {
  //       const item = data.find((item) => item.id === vm.$route.params.id);
  //       vm.item = item;
  //     }
  //     console.log("beforeRouteEnter next", JSON.parse(JSON.stringify(vm.item)));
  //   });
  // },
  // beforeCreate() {
  //   console.log("beforeCreate", this);
  //   // console.log("beforeCreate", JSON.parse(JSON.stringify(this.item))); 還沒數據代理所以會出錯 item undefined
  // },
  // created() {
  //   // console.log("created");
  //   console.log("created", JSON.parse(JSON.stringify(this.item)));

  //   this.$nextTick(() => {
  //     console.log("created nextTick", JSON.parse(JSON.stringify(this.item)));
  //   });
  // },
  // beforeMount() {
  //   console.log("beforeMount", JSON.parse(JSON.stringify(this.item)));
  // },
  // mounted() {
  //   console.log("mounted", JSON.parse(JSON.stringify(this.item)));

  //   this.$nextTick(() => {
  //     console.log("mounted nextTick", JSON.parse(JSON.stringify(this.item)));
  //   });
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate", JSON.parse(JSON.stringify(this.item)));
  // },
  // activated() {
  //   console.log("activated", JSON.parse(JSON.stringify(this.item)));
  // },
  // updated() {
  //   console.log("updated", JSON.parse(JSON.stringify(this.item)));
  // },
  // beforeRouteLeave(to, from, next) {
  //   console.log("beforeRouteLeave");

  //   next(() => {
  //     console.log("beforeRouteLeave next");
  //   });
  // },
  // deactivated() {
  //   console.log("deactivated", JSON.parse(JSON.stringify(this.item)));
  // },
  // -----------------------------------------
  methods: {
    formatDate,
    formatCurrency,
    initData(target) {
      target.list = JSON.parse(localStorage.getItem("invoice app") || "[]");
      target.item = target.list.find(
        (item) => item.id === target.$route.params.id
      );
    },
    handleUpdate(editForm) {
      const updatedList = this.list.map((item) =>
        item.id === editForm.id ? editForm : item
      );

      this.save(updatedList);
      this.initData(this);
      this.toggleFormVisible = false;
    },

    handleDelete() {
      const filteredList = this.list.filter(
        (listItem) => listItem.id !== this.item.id
      );

      this.save(filteredList);
      this.confirmDialogVisible = false;
      this.goBack();
    },
    save(updatedList) {
      localStorage.setItem("invoice app", JSON.stringify(updatedList));
    },
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";
@import "@/style/utilities";
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 48px;
  @include shadow;
  position: relative;

  .info {
    .title {
      margin-bottom: 15px;
    }
    .address p {
      margin-bottom: 5px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .address {
        text-align: right;
      }
    }

    .data {
      display: grid;
      grid-template-columns: 4fr 4fr 5fr;
      margin-bottom: 50px;

      .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }

  .list-container {
    border-radius: 8px;
    overflow: hidden;

    .list,
    .total {
      padding: 30px;
    }

    .list {
      background-color: $backgroundColor-light;

      .list-title,
      .list-item {
        display: grid;
        grid-template-columns: 1fr 50px 120px 120px;

        span:not(:first-child) {
          text-align: right;
        }
      }

      .list-title,
      .list-item:not(:last-child) {
        margin-bottom: 30px;
      }
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $color-black;

      span {
        color: #fff !important;
      }
    }
  }
}
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  ::v-deep .el-dialog {
    margin: 0 !important;
    border-radius: 8px;

    &__header {
      padding: 51px 48px 12px;
    }
    &__body {
      padding: 10px 48px 18px;
    }
    &__footer {
      padding: 10px 48px 48px;
    }
  }
}
</style>
