"use strict";

/**
 *
 * @example
 * // Init with hexa color
 * const color = Colors('123')
 * const color = Colors('#123')
 * const color = Colors('#ABCDEF')
 *
 * // Init with RGB object
 * const color = Colors({ r:255, g:23, b: 467 })
 *
 * // Init with RGB string
 * const color = Colors('rgb(23, 45, 67))
 * const color = Colors('rgba(23, 45, 67, 0.4))
 *
 * // Init with HSL object
 * const color = Colors({ h:255, s:23, l: 467 })
 *
 * //Conversions
 * color.toHex()
 * color.toHSL()
 * color.toRGB()
 * color.toRGBString()
 * color.toHSLString()
 *
 * // Verifications
 * color.isHex()
 * color.isHSL()
 * color.isRGB()
 * color.isLight()
 * color.isDark()
 *
 * // Calculations
 * // These functions changes internal initial color. Always prefer using
 * // the construtor Colors()
 * Colors(#A34).darken(.2).toHex()
 * Colors(#A34).lighten(.35).toRGB()
 * Colors(#A34).inverted().toHSL()
 */
var HandleColors = require("./dist/HandleColors");

function Colors(color) {
  var RGB = HandleColors.parse(color);
  return {
    toHex: function toHex() {
      return HandleColors.rgbToHex(RGB);
    },
    toHexa: function toHEXA(alpha) {
      return HandleColors.rgbToHex(RGB) + HandleColors.alphaToHex(alpha);
    },
    toRGB: function toRGB() {
      return RGB;
    },
    toRGBA: function toRGBA(alpha) {
      return { ...RGB, a: alpha };
    },
    toRGBAString: function toRGBAString(alpha) {
      return `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${alpha} )`;
    },
    toRGBString: function toRGBString() {
      return HandleColors.convertRGBObjectToString(RGB);
    },
    darken: function darken(step) {
      RGB = HandleColors.darken(RGB, step);
      return this;
    },
    lighten: function lighten(step) {
      RGB = HandleColors.lighten(RGB, step);
      return this;
    },
    invert: function invert() {
      RGB = HandleColors.invert(RGB);
      return this;
    },
    isLight: function isLight() {
      return HandleColors.isLight(RGB);
    },
    isDark: function isDark() {
      return HandleColors.isDark(RGB);
    },
    isValid: function isValid() {
      return HandleColors.isValid(RGB);
    },
  };
}

module.exports = Colors;
