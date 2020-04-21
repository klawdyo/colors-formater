const test = require('tape')
const { isRGBObject } = require('../dist/HandleColors')

test('Is RGB Object', t => {
  t.deepEqual(isRGBObject({ r: 244, g: 23, b: 0 }), true, 'isRGBObject({r:244, g:23, b:0}) = true')
  t.end()
})

test('Color is null', t => {
  t.deepEqual(isRGBObject(null), false, 'isRGBObject(null) = false')
  t.end()
})

test('Is NOT a RGB Object', t => {
  const tests = [
    { r: 244, g: 23, ba: 0 },
    { r: 260, g: 23, b: 0 },
    { r: 244, g: 260, b: 0 },
    { r: 244, g: 23, b: 260 },
  ]

  tests.forEach(test => {
    t.notOk(isRGBObject(test), `${JSON.stringify(test)} is not a valid rgb object`)
  })


  t.end()
})