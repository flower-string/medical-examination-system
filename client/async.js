const { resolve } = require("path");

async function add() {
  let a = 1;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(a += 1);
    }, 1000);
  })
  console.log(a);
}

add()