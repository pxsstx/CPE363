const sum = (...numbers) => {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return total;
};

console.log(sum(3, 5));
console.log(sum(3, 5, 2));
console.log(sum(3, 5, 2, 16, 19));
