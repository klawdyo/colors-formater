
/**
 * Pega qualquer tipo de cor e converte para o seu equivalente em 
 * objeto RGB, no formato { r:12, g:23, b:45 }
 *
 * @tests
 *  
 *  // Cores hexadecimais válidas 
 *  √ parse(123) returns { r: 17, g: 34, b: 51 }
 *  √ parse(#123) returns { r: 17, g: 34, b: 51 }
 *  √ parse(112233) returns { r: 17, g: 34, b: 51 }
 *  √ parse(#112233) returns { r: 17, g: 34, b: 51 }
 *  √ parse("abc") returns { r: 170, g: 187, b: 204 }
 *  √ parse("#abc") returns { r: 170, g: 187, b: 204 }
 *  √ parse("ABC") returns { r: 170, g: 187, b: 204 }
 *  √ parse("#ABC") returns { r: 170, g: 187, b: 204 }
 * 
 *  // Não é uma cor hexadecimal válida
 *  √ parse(#CLA) returns null
 * 
 *  // Cores já em formato RGB retornam o mesmo valor
 *  √ parse({"r":12,"g":45,"b":67}) returns same value
 *  √ parse({"r":120,"g":125,"b":167}) returns same value
 *
 *  // Cores no formato RGB String
 *  √ parse("rgb(12, 45, 67)") returns {"r":12,"g":45,"b":67}
 *  √ parse("rgb(120,125,167)") returns {"r":120,"g":125,"b":167}
 * 
 *  // Cores no formato HSL object
 *
 * @param {String} color: Cor em formato
 * @return
 */
const parse = function (color) {
  // is rgb object
  if (isRGBObject(color)) {
    return color
  }

  // is rgb string
  else if (isRGBString(color)) {
    return convertToRGBSObject(color);
  }

  // is hsl string
  else if (isHSLString(color)) {
    return hslToRgb(convertToHSLObject(color));
  }
  // 
  else if (isHSLObject(color)) {
    return hslToRgb(color);
  }

  else if (isHexadecimal(color)) {
    return hexToRgb(color)
  }

  return null;
}

/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isRGBObject = function (color) {
  return typeof color === 'object' && Object.keys(color).every(item => ['r', 'g', 'b'].includes(item))
}


/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isRGBString = function (color) {
  return !!convertToRGBSObject(color)
}


/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isHSLObject = function (color) {
  return typeof color === 'object' && Object.keys(color).every(item => ['h', 's', 'l'].includes(item))
}


/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isHSLString = function (color) {
  return !!convertToHSLObject(color)
}


/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isHexadecimal = function (color) {
  return /^([#])?(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/.test(color)
}

/**
 * Convert a string in format:
 * rgb(12, 45, 67)
 * to an object in format:
 * { r: 12, g: 45, b: 67 }
 * 
 * @param {*} color 
 */
const convertToRGBSObject = function (color) {
  const rgx = /^rgba?\((?<r>\d+),\s*(?<g>\d+),\s*(?<b>\d+)(?:,\s*(?<a>\d*(?:\.\d+)?))?\)$/
  const match = rgx.exec(color)

  if (match && match.groups) {
    const { r, g, b } = match.groups

    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) }
  }

  return null;
}

/**
 * @validation
 * hue = 0 - 360
 * saturation = 0% - 100% (0% = shades of grey/ 100% = full color)
 * lightness = 0% - 100% (0% = black/ 100% = white)
 *
 * @tests
 *
 *    Convert HSL string to HSL object
 *
 *      √ Convert hsl(34, 56%, 10%) to {"h":34,"s":"56%","l":"10%"}
 *      √ Convert hsl(46, 96%, 0%) to {"h":46,"s":"96%","l":"0%"}
 *
 *    Try convert an INVALID HSL string to HSL object
 *
 *      √ Hue bigger than 360
 *      √ Hue lower than 0
 *      √ Saturation bigger than 360
 *      √ Light bigger than 360
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const convertToHSLObject = function (color) {
  const rgx = /^hsl\((?<h>\d+),\s*(?<s>(?<sInt>\d+)\%),\s*(?<l>(?<lInt>\d+)\%)\)$/
  const match = rgx.exec(color)

  if (match && match.groups) {
    const { h, s, l, sInt, lInt } = match.groups
    // console.log('Result', h, s, l, sInt, lInt)

    if (h < 0 || h > 360 || sInt < 0 || sInt > 100 || lInt < 0 || lInt > 100) return null

    return { h: parseInt(h), s, l }
  }

  return null;
}



/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Object}          The RGB representation
 */
const hslToRgb = function ({ h, s, l }) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Object}          The HSL representation
 */
const rgbToHsl = function ({ r, g, b }) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h, s, l };
}

/**
 *
 *
 * @example
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const hexToRgb = function (color) {
  color = normalizeHex(color).substr(1, 6);
  // parseInt(hex, 16)
  return {
    r: parseInt(color.substr(0, 2), 16),
    g: parseInt(color.substr(2, 2), 16),
    b: parseInt(color.substr(4, 2), 16),
  }
}

/**
 * 
 * 
 * @example
 * 
 * 
 * @param {String} color: Cor em formato 
 * @return
 */
const rgbToHex = function (color) {
  if (isRGBObject(color)) {
    const { r, g, b } = color;
    r = (r).toString(16)
    g = (g).toString(16)
    b = (b).toString(16)

    return normalizeHex(`${r.length === 1 ? '0' + r : r}${g.length === 1 ? '0' + g : g}${b.length === 1 ? '0' + b : b}`)
  }

  return null;
}



/**
 * Normalizes a hexadecimal color
 * 
 * normalizeHex('123')      // #112233
 * normalizeHex('#123')     // #112233
 * normalizeHex('#1232')    // throws an error (#1232 is an invalid color)
 * normalizeHex('#123345')  // #123345
 * normalizeHex('123567')   // #123567
 * normalizeHex('#abc')     // #AABBCC
 * normalizeHex('abc')      // #AABBCC
 * normalizeHex('#cla')     // throws an error (#cla is an invalid color)
 * normalizeHex('cla')      // throws an error (cla is an invalid color)
 */
const normalizeHex = function (str) {
  str = String(str).toUpperCase();
  const match = /^(?<hash>[#])?(?:(?<six>[0-9A-F]{6})|(?<three>[0-9A-F]{3}))?$/.exec(str);
  if (match && match.groups) {
    const { three, six } = match.groups

    if (three) return `#${three[0]}${three[0]}${three[1]}${three[1]}${three[2]}${three[2]}`
    return `#${six}`;
  }

  throw new Error(`${str} is an Invalid Color`)
}

module.exports = {
  parse,
  isRGBObject,
  isRGBString,
  isHSLObject,
  isHSLString,
  isHexadecimal,
  convertToRGBSObject,
  convertToHSLObject,
  hslToRgb,
  rgbToHsl,
  hexToRgb,
  rgbToHex,
  normalizeHex,
}