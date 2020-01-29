const test = require('tape')
const { lighten } = require('../HandleColors')

test('Lighting up colors', t => {
  t.deepEqual(lighten({ r: 10, g: 10, b: 10 }, .1), { r: 11, g: 11, b: 11 }, `{ r: 10, g: 10, b: 10 } illuminated in 10%`)
  t.deepEqual(lighten({ r: 255, g: 10, b: 10 }, .1), { r: 255, g: 11, b: 11 }, `{ r: 255, g: 10, b: 10 } illuminated in 10%`)
  t.deepEqual(lighten('rgb(255, 10,10)', .1), { r: 255, g: 11, b: 11 }, `rgb(255, 10,10) illuminated in 10%`)
  t.deepEqual(lighten('#FF0A0A', .1), { r: 255, g: 11, b: 11 }, `#FF0A0A illuminated in 10%`)
  t.end()
})