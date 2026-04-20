const promise = new Promise((resolve, reject) => {
  const r = Math.random();
  r <= 0.5 ? resolve(`${r} <= 0.5 Resolve`) : reject(`${r} > 0.5 Reject`);
});

promise
  .then(console.log)
  .catch(console.log)
  .finally(() => console.log("การทำงานของ Promise"));
