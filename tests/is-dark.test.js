const test = require('tape')
const { isDark } = require('../HandleColors')

test('Is a Dark Color', t => {

  tests = [
    // Verdadeiros
    { input: '#FFF', expected: false, msg: '', appendMsg: '' },

    // Falsos
    { input: '#000', expected: true, msg: '', appendMsg: '' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    // Mensagem
    msg = msg ? msg : `isDark(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`

    // 
    t.equal(isDark(input), expected, msg)
  })

  // Finaliza
  t.end()
})


