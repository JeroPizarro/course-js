const randomTen = Math.floor(Math.random() * 10);

for (let a = 0; a <= randomTen; a++) {
  console.log(`Loop a: ${a}, random: ${randomTen}`);
}

//nested loop
for (let b = 0; b <= 2; b++) {
  console.log(`loop b: ${b * -1}`);
  for (let c = 0; c <= 2; c++) {
    console.log(`loop c: ${c}`);
  }
}

const fruits = ['banana', 'apple', 'mango', 'orange'];
for (let d = 0; d < fruits.length; d++) {
  let element = fruits[d];
  element === 'mango' && (element = 'mango is the best');
  console.log(`loop d: ${element}`);
}
