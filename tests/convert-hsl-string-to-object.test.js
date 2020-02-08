const test = require('tape')
const hc = require('../dist/HandleColors')


test('Convert HSL string to HSL object', t => {

  const tests = {

    'hsl(34, 56%, 10%)': { h: 34, s: '56%', l: '10%' },
    'hsl(46, 96%, 0%)': { h: 46, s: '96%', l: '0%' },
  }

  Object.keys(tests).forEach(key => {
    const result = tests[key]
    t.deepEqual(hc.convertHSLStringToObject(key), result, `Convert ${key} to ${JSON.stringify(result)}`)
  })


  t.end()
})

test('Try convert an INVALID HSL string to HSL object ', t => {

  t.notOk(hc.convertHSLStringToObject('hsl(361,0%,0%)'), 'Hue bigger than 360')
  t.notOk(hc.convertHSLStringToObject('hsl(-5,0%,0%)'), 'Hue lower than 0')

  t.notOk(hc.convertHSLStringToObject('hsl(36,120%,0%)'), 'Saturation bigger than 360')
  t.notOk(hc.convertHSLStringToObject('hsl(36,10%,120%)'), 'Light bigger than 360')

  t.end()
})