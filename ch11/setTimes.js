console.log(1);
console.log(2);
let p = Promise.resolve(Math.random());
p.then(console.log);
console.log("a");
console.log("b");
