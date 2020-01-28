/**
 * 
 * @example
 * // Init with hexa color
 * const color = handleColor('123')
 * const color = handleColor('#123')
 * const color = handleColor('#ABCDEF') 
 * 
 * // Init with RGB object
 * const color = handleColor({ r:255, g:23, b: 467 }) 
 * 
 * // Init with RGB string
 * const color = handleColor('rgb(23, 45, 67))
 * const color = handleColor('rgba(23, 45, 67, 0.4))
 * 
 * // Init with HSL object
 * const color = handleColor({ h:255, s:23, l: 467 })
 * 
 * //Conversions
 * color.toHex()
 * color.toHSL()
 * color.toRGB()
 * 
 * // Verifications
 * color.isHex()
 * color.isHSL()
 * color.isRGB()
 * color.isLight()
 * color.isDark()
 * 
 * // Calculations
 * color.darken(.2).toHex()
 * color.lighten(.35).toRGB()
 * color.inverted().toHSL()
 * 
 */

const HandleColors = require('./HandleColors')

function Colors(color) {


  return {


    /**
     * 
     * 
     */






  }

}

module.exports = Colors;