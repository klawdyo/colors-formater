const Colors = require('../index')
const test = require('tape')


test('Colors.index Tests', t => {
  t.equal(Colors('#A34').toHex(), '#AA3344', '#A34 converted to #AA3344')
  t.equal(Colors('#A34').darken(.6).toHex(), '#44141B', '#A34 darkened in 60% to #44141B')
  t.equal(Colors('#A34').lighten(.3).toHex(), '#DD4258', '#A34 illuminated in 30% to #DD4258')


  t.equal(Colors('#CCC').isLight(), true, '#CCC is light')
  t.equal(Colors('#666').isDark(), true, '#666 is dark')
  t.equal(Colors('#A34').isValid(), true, '#A34 is Valid')

  t.end()
})

