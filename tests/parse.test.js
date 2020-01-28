const test = require('tape')
const hc = require('../HandleColors')


test('Parsing hexadecimal values', t => {


  t.deepEqual(hc.parse('123'), { r: 17, g: 34, b: 51 }, 'parse(123) returns { r: 17, g: 34, b: 51 }')
  t.deepEqual(hc.parse('#123'), { r: 17, g: 34, b: 51 }, 'parse(#123) returns { r: 17, g: 34, b: 51 }')
  t.deepEqual(hc.parse('112233'), { r: 17, g: 34, b: 51 }, 'parse(112233) returns { r: 17, g: 34, b: 51 }')
  t.deepEqual(hc.parse('#112233'), { r: 17, g: 34, b: 51 }, 'parse(#112233) returns { r: 17, g: 34, b: 51 }')


  t.deepEqual(hc.parse('abc'), { r: 170, g: 187, b: 204 }, 'parse("abc") returns { r: 170, g: 187, b: 204 }')
  t.deepEqual(hc.parse('#abc'), { r: 170, g: 187, b: 204 }, 'parse("#abc") returns { r: 170, g: 187, b: 204 }')
  t.deepEqual(hc.parse('ABC'), { r: 170, g: 187, b: 204 }, 'parse("ABC") returns { r: 170, g: 187, b: 204 }')
  t.deepEqual(hc.parse('#ABC'), { r: 170, g: 187, b: 204 }, 'parse("#ABC") returns { r: 170, g: 187, b: 204 }')


  t.equal(hc.parse('#CLA'), null, 'parse(#CLA) returns null')

  t.end()
})

test('Parsing RGB Object values', t => {

  const values = [
    { r: 12, g: 45, b: 67 },
    { r: 120, g: 125, b: 167 },
  ]

  values.forEach(value => {
    t.deepEqual(hc.parse(value), value, `parse(${JSON.stringify(value)}) returns same value`)
  })

  t.end()
})

test('Parsing RGB String values', t => {

  const values = {
    'rgb(12, 45,      67)': { r: 12, g: 45, b: 67 },
    'rgb(120,125,167)': { r: 120, g: 125, b: 167 },
  }



  Object.keys(values).forEach((key, i) => {
    t.deepEqual(hc.parse(key), values[key], `parse(${JSON.stringify(key)}) returns ${JSON.stringify(values[key])}`)
  })

  t.end()
})