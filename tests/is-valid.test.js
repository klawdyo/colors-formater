const test = require('tape')
const { isValid } = require('../HandleColors')

test('Is a Valid Color', t => {

  tests = [
    // True
    { input: '#FFF', expected: true, msg: '', appendMsg: '' },
    { input: '#000', expected: true, msg: '', appendMsg: '' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    // Mensagem
    msg = msg ? msg : `isValid(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`

    // 
    t.equal(isValid(input), expected, msg)
  })

  // Finaliza
  t.end()
})


test('Is a INVALID Color', t => {

  tests = [
    // False
    { input: '#kla', expected: false, msg: '', appendMsg: '' },
    { input: { r: 244, g: 43 }, expected: false, msg: '', appendMsg: '' },
    { input: { h: 244, s: '43%', l: 12 }, expected: false, msg: '', appendMsg: '' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    // Mensagem
    msg = msg ? msg : `isValid(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`

    // 
    t.equal(isValid(input), expected, msg)
  })

  // Finaliza
  t.end()
})


