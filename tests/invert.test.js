const test = require('tape')
const { invert } = require('../dist/HandleColors')

test('Inverting colors', t => {
  t.deepEqual(invert({ r: 10, g: 10, b: 10 }, .1), { r: 245, g: 245, b: 245 }, `{ r: 10, g: 10, b: 10 } inverted`)
  t.deepEqual(invert({ r: 255, g: 10, b: 10 }, .1), { r: 0, g: 245, b: 245 }, `{ r: 255, g: 10, b: 10 } inverted`)
  t.deepEqual(invert('rgb(255, 10,10)', .1), { r: 0, g: 245, b: 245 }, `rgb(255, 10,10) inverted`)
  t.deepEqual(invert('#FF0A0A', .1), { r: 0, g: 245, b: 245 }, `#FF0A0A inverted`)
  t.end()
})