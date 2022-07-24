const test = require("tape");
const { alphaToHex } = require("../dist/HandleColors");

test("Alpha to HEX", (t) => {
  t.equal(alphaToHex(0.1), "19");
  t.equal(alphaToHex(0.67), "AA");
  t.equal(alphaToHex(0.84), "D6");
  t.equal(alphaToHex(1.1), "FF");

  t.end();
});
