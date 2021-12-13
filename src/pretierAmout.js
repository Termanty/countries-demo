const pretierAmount = (x) => {
  if (x < 100000) return x;
  const k = Math.round(x / 1000);
  if (k < 1000) return "" + k + " 000";
  const m = Math.round(x / 10000) / 100;
  return "" + m + " M";
};

export default pretierAmount;
