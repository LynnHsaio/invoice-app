export function formatDate(date) {
  // -----------------以下測試-----------------
  // console.log("call method in template formatDate", date);
  // -----------------------------------------

  if (!date) return;

  // 将输入的日期字符串转换为Date对象
  const inputDate = new Date(date);

  // 定义所需的日期格式化选项
  const options = {
    dateStyle: "medium",
  };

  const formattedDate = inputDate.toLocaleDateString("en-GB", options);

  return formattedDate;

  // 创建DateTimeFormat对象并应用格式化选项
  // return new Intl.DateTimeFormat("en-GB", options).format(inputDate);
}

export function formatCurrency(amount) {
  // -----------------以下測試-----------------
  // export function formatCurrency(amount, test, item) {
  // console.log("call method in template formatCurrency", amount, test, item);

  // this.$nextTick(() => {
  //   console.log(
  //     "formatCurrency nextTick",
  //     test,
  //     JSON.parse(JSON.stringify(item))
  //   );
  // });
  // -----------------------------------------

  // 使用 toLocaleString() 方法进行格式化
  const formattedAmount = amount.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
}
