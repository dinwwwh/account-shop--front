export default {
  random(arr, amount = 1) {
    if (amount === 1) return arr[Math.floor(Math.random() * arr.length)];
  },
};
