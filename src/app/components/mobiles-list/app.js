let b = 3;
let p = 4;

for (let i = 1; i < p; i++) {
  let acc = b;
  var s = b;
  for (let j = 1; j <= i; j++) {
    acc *= b;
    s += "*" + b;
  }
  console.log(s + " = " + acc);
}
