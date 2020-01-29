const test = require('tape')
const { darken } = require('../HandleColors')

test('Darkening colors', t => {
  t.deepEqual(darken({ r: 10, g: 10, b: 10 }, .1), { r: 9, g: 9, b: 9 }, `{ r: 10, g: 10, b: 10 } darkened in 10%`)
  t.deepEqual(darken({ r: 0, g: 10, b: 10 }, .1), { r: 0, g: 9, b: 9 }, `{ r: 0, g: 10, b: 10 } darkened in 10%`)
  t.deepEqual(darken('rgb(0, 10,10)', .1), { r: 0, g: 9, b: 9 }, `rgb(0, 10,10) darkened in 10%`)
  t.deepEqual(darken('#000A0A', .1), { r: 0, g: 9, b: 9 }, `#000A0A darkened in 10%`)
  t.end()
})