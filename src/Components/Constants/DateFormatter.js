export default (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
};

export const formatAmount = (amount) => {
  const num = parseInt(amount, 10); // Convert string to number with base 10
  // const newStr = num.toString();
  // console.log(newStr)
  return num;
}