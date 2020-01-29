const Colors = require('../index')
const test = require('tape')


test('tsts', t => {


  // const color = new Colors('#A34')

  console.log(Colors('#A34').toRGB())
  console.log(Colors('#A34').darken(.6).toRGB())

  // console.log(Colors('#A34').toHex())
  // console.log(Colors('#A34').darken(.6).toHex())
  // console.log(Colors('#A34').lighten(.3).toHex())

  t.equal(Colors('#A34').toHex(), '#AA3344', '#A34 converted to #AA3344')
  t.equal(Colors('#A34').darken(.6).toHex(), '#44141B', '#A34 darkened in 60% to #44141B')
  t.equal(Colors('#A34').lighten(.3).toHex(), '#DD4258', '#A34 illuminated in 30% to #DD4258')

  t.end()
})

