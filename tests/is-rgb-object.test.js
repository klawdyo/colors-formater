const test = require('tape')
const { isRGBObject } = require('../HandleColors')


test('Is RGB Object', t => {

  t.deepEqual(isRGBObject({ r: 244, g: 23, b: 0 }), true, 'isRGBObject({r:244, g:23, b:0}) = true')

  t.end()
})

test('Try convert an INVALID HSL string to HSL object ', t => {

  t.notOk(hc.convertToHSLObject('hsl(361,0%,0%)'), 'Hue bigger than 360')
  t.notOk(hc.convertToHSLObject('hsl(-5,0%,0%)'), 'Hue lower than 0')

  t.notOk(hc.convertToHSLObject('hsl(36,120%,0%)'), 'Saturation bigger than 360')
  t.notOk(hc.convertToHSLObject('hsl(36,10%,120%)'), 'Light bigger than 360')

  t.end()
})