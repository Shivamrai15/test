export const getEmployeeFinancialYear = (firstPaymentEventDate, latestPaymentEventDate) => {
  const firstPaymentEventYear = firstPaymentEventDate.getFullYear();
  const latestPaymentEventYear = latestPaymentEventDate.getFullYear();
  const range = [];
  for (let i = firstPaymentEventYear; i <= latestPaymentEventYear; i++) {
    range.push(i);
  }
  return range;
};
