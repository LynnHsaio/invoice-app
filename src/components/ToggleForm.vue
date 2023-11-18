<template>
  <div :class="`toggleForm ${visible ? 'show' : ''}`">
    <div class="mask" @click="close"></div>

    <div class="form-container">
      <h2 class="form-title text-large">
        <span>Edit </span>
        <span class="text-large item-id">{{ editForm.id }}</span>
      </h2>

      <el-form class="form" ref="Form" :model="editForm" :rules="rules">
        <div class="form-group">
          <h3 class="form-group-title">Bill From</h3>
          <el-form-item
            label="Street Address"
            prop="senderAddress.street"
            class="text-small"
          >
            <el-input v-model="editForm.senderAddress.street"></el-input>
          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="city"
                prop="senderAddress.city"
                class="text-small"
              >
                <el-input v-model="editForm.senderAddress.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="postCode" prop="senderAddress.postCode">
                <el-input v-model="editForm.senderAddress.postCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="country" prop="senderAddress.country">
                <el-input v-model="editForm.senderAddress.country"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-group">
          <h3 class="form-group-title">Bill To</h3>
          <el-form-item label="Client’s Name" prop="clientName">
            <el-input v-model="editForm.clientName"></el-input>
          </el-form-item>

          <el-form-item label="Client’s Email" prop="clientEmail">
            <el-input v-model="editForm.clientEmail"></el-input>
          </el-form-item>

          <el-form-item label="Street Address" prop="clientAddress.street">
            <el-input v-model="editForm.clientAddress.street"></el-input>
          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="city" prop="clientAddress.city">
                <el-input v-model="editForm.clientAddress.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="postCode" prop="clientAddress.postCode">
                <el-input v-model="editForm.clientAddress.postCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="country" prop="clientAddress.country">
                <el-input v-model="editForm.clientAddress.country"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Invoice Date" prop="createdAt">
              <el-date-picker
                v-model="editForm.createdAt"
                type="date"
                placeholder="choice date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Payment Terms" prop="paymentDue">
              <el-select
                v-model="editForm.paymentDue"
                clearable
                placeholder="please choice"
                style="width: 100%"
              >
                <el-option
                  v-for="item in paymentTermsOptions"
                  :key="item.CODE_VAL"
                  :label="item.CODE_DESC"
                  :value="item.CODE_VAL"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Project Description" prop="description">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>

        <div class="form-list-group">
          <h3 class="form-list-title">Item List</h3>
          <el-row class="form-list-label" :gutter="16">
            <el-col :span="9">
              <el-form-item label="Item Name" required> </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Qty." required> </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Price" required> </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Total"> </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="."> </el-form-item>
            </el-col>
          </el-row>

          <el-row
            v-for="(item, index) of editForm.items"
            :key="index"
            :gutter="16"
          >
            <el-col :span="9">
              <el-form-item
                :prop="`items[${index}].name`"
                :rules="{
                  required: true,
                  message: 'please enter',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="item.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item
                :prop="`items[${index}].quantity`"
                :rules="{
                  required: true,
                  message: 'please enter',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="item.quantity"
                  @change="countTotal(index)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                :prop="`items[${index}].price`"
                :rules="{
                  required: true,
                  message: 'please enter',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="item.price"
                  @change="countTotal(index)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="itemTotal">
                <el-input disabled v-model="item.total"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button
                  type="text"
                  icon="el-icon-delete-solid"
                  @click="handleItemDelete(index)"
                ></el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <button class="btn btn--white" @click="handleNewItem">
            + Add New Item
          </button>
        </div>
      </el-form>

      <footer>
        <button class="btn btn--white" @click="handleSubmit">Cancel</button>
        <button class="btn btn--purple" @click="handleSubmit">
          Save Changes
        </button>
      </footer>
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
    parentForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editForm: {
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

      rules: {
        "senderAddress.street": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "senderAddress.city": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "senderAddress.postCode": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "senderAddress.country": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        clientName: [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        clientEmail: [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "clientAddress.street": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "clientAddress.city": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "clientAddress.postCode": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        "clientAddress.country": [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        createdAt: [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        paymentDue: [
          { required: true, message: "please enter", trigger: "blur" },
        ],
        description: [
          { required: true, message: "please enter", trigger: "blur" },
        ],
      },

      paymentTermsOptions: [
        {
          CODE_DESC: "Net 30 Days",
          CODE_VAL: 30,
        },
        {
          CODE_DESC: "Net 7 Days",
          CODE_VAL: 7,
        },
        {
          CODE_DESC: "Net 1 Days",
          CODE_VAL: 1,
        },
      ],
    };
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.editForm = JSON.parse(JSON.stringify(this.parentForm));

        //如果剛開始清單裡沒有項目，預設加新項目
        if (!this.editForm.items.length) {
          this.pushItem();
        }

        //開啟表單預設滾動回最上面（這裡不用nextTick也沒關係，因為這個表單抽屜不是懶加載，可是如果是用element ui的話就必須要用）
        this.$nextTick(() => {
          this.$refs.Form.$el.scrollTop = 0;
        });
      }
    },
  },
  // 使用這個做法的話會直接改變傳進來的parentForm值，沒有setter也沒差，這樣的話如果使用者取消修改將無法回復原本的資料，
  // 所以我用深脫勾將資料複製一份到editForm，編輯editForm
  // computed: {
  //   form: {
  //     get() {
  //       return this.parentForm;
  //     },
  //     // set() {
  //       // this.$emit("update:parentForm", this.form);
  //     // },
  //   },
  // },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    countTotal(index) {
      const { price, quantity } = this.editForm.items[index];

      this.editForm.items[index].total = price * quantity;
    },
    handleNewItem() {
      const lastItem = this.editForm.items[this.editForm.items.length - 1];
      const isEmpty = Object.values(lastItem || {}).every((value) => !value);

      //如果清單裡沒有東西 或 新加的項目有填值的話 才可以加新項目，以避免無限加新項目
      if (!lastItem || !isEmpty) {
        this.pushItem();

        this.$nextTick(() => {
          // 使用 $refs 獲取 scrollContainer 的引用, 要注意的是因為Form使用element ui所以後面要加上$el才可取得元素
          const scrollContainer = this.$refs.Form.$el;
          // 將滾動位置設置為滾動容器的高度，以滾動到底部
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
      }
    },
    pushItem() {
      this.editForm.items.push({
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      });
    },
    handleItemDelete(index) {
      this.editForm.items.splice(index, 1);
    },
    handleSubmit() {
      this.$refs.Form.validate((valid) => {
        console.log("valid", valid);
        if (valid) {
          this.$emit("submit", this.editForm);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixins.scss";
@import "@/style/variables.scss";

.toggleForm {
  @include toggleFormfixedTop;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition-duration: 0.5s;

  &.show {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;

    .form-container {
      transform: translateX(0%);
    }

    .mask {
      opacity: 0.5;
    }
  }
}

.mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  transition-duration: 0.5s;
}

.form-container {
  @include toggleFormfixedTop;
  @include borderRadius;
  width: $editForm-width;
  display: flex;
  flex-direction: column;
  background: #fff;
  transform: translateX(-100%);
  transition-duration: 0.5s;

  .form-title {
    margin: 60px 56px 46px;
  }

  .form {
    flex: 1;
    padding: 0 16px;
    margin: 10px 40px;
    overflow-y: auto;
    overflow-x: hidden;
    /* 非webkit瀏覽器firefox使用 */
    scrollbar-color: $color-purple-light;
    scrollbar-width: 8px;

    .el-form-item ::v-deep {
      .el-form-item__label {
        @include textSmall;
      }
      .el-input__inner {
        @include textMedium;
      }
    }

    .form-group {
      margin-bottom: 50px;
      .form-group-title {
        margin-bottom: 24px;
        font-size: 15px;
        font-weight: 700;
        color: $color-primary;
      }
    }

    .form-list-group {
      margin-top: 35px;

      .form-list-title {
        color: #777f98;
        font-size: 18px;
        font-weight: 700;
        line-height: 32px;
        margin-bottom: 15px;
      }

      .form-list-label ::v-deep {
        .el-form-item {
          margin-bottom: 15px;
        }
        .el-form-item__label {
          line-height: 15px;
        }
      }

      .btn {
        width: 100%;
        margin-left: 0px;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $color-purple-light;
      border-radius: 4px;
    }
  }
}

footer {
  @include borderRadius;
  padding: 30px 55px;

  display: flex;
  justify-content: flex-end;
}
</style>
