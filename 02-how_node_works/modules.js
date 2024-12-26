// console.log(arguments);
// console.log(require("module").wrapper);

// using MODULES.EXPORTS
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

//using EXPORTS
// const calc2 = require("./module-test-2");
const { add, multiply, divide } = require("./module-test-2");
// console.log(calc2.add(2, 5));
console.log(add(2, 5));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
