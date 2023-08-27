export function formatDate(date) {
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
  // 使用 toLocaleString() 方法进行格式化
  const formattedAmount = amount.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
}
