const test = require('tape')
const { isLight } = require('../HandleColors')

test('Is a Light Color', t => {

  tests = [
    // Verdadeiros
    { input: '#FFF', expected: true, msg: '', appendMsg: '' },

    // Falsos
    { input: '#000', expected: false, msg: '', appendMsg: '' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    // Mensagem
    msg = msg ? msg : `isLight(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`

    // 
    t.equal(isLight(input), expected, msg)
  })

  // Finaliza
  t.end()
})
