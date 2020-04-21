
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
 * @return {Object} RGB object if a valid color or null
 */
const parse = function (color) {
  // is rgb object
  if (isRGBObject(color)) {
    return color
  }

  // is rgb string
  else if (isRGBString(color)) {
    return convertRGBStringToObject(color);
  }

  // is hsl string
  else if (isHSLString(color)) {
    return hslToRgb(convertHSLStringToObject(color));
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

// //////////////////////////////////////////////////////////////////////////
//
//  VALIDATIONS
//
// //////////////////////////////////////////////////////////////////////////


/**
 * Verify if a specified param is a RGB color object
 *
 * @tests
 *
 *    Is RGB Object
 *
 *      √ isRGBObject({r:244, g:23, b:0}) = true
 *
 *    Is NOT a RGB Object
 *
 *      √ {"r":244,"g":23,"ba":0} is not a valid rgb object
 *      √ {"r":260,"g":23,"b":0} is not a valid rgb object
 *      √ {"r":244,"g":260,"b":0} is not a valid rgb object
 *      √ {"r":244,"g":23,"b":260} is not a valid rgb object
 * 
 *
 *
 * @param {String} color: Cor em formato
 * @return {Boolean}
 */
const isRGBObject = function (color) {
  if (!color) return false;
  return typeof color === 'object'
    && Object.keys(color).every(item => ['r', 'g', 'b'].includes(item))
    && color.r >= 0 && color.r <= 255
    && color.g >= 0 && color.g <= 255
    && color.b >= 0 && color.b <= 255
}

/**
 * Verify if the specified param color is a valida RGB string color in format:
 *  rgb(255, 255, 255)
 * 
 * @example
 * isRGBString('rgb(12, 34, 57)')
 *
 * @tests
 *
 * Is a RGB String Color
 *
 *   √ isRGBString(rgb(12, 34, 57)) returns true.
 *   √ isRGBString(rgb(260, 34, 57)) returns false. "R" component cannot be bigger than 255
 *   √ isRGBString(rgb(12, 260, 57)) returns false. "G" component cannot be bigger than 255
 *   √ isRGBString(rgb(12, 34, 260)) returns false. "B" component cannot be bigger than 255 
 *
 *
 * @param {String} color: Cor em formato
 * @return {Boolean}
 */
const isRGBString = function (color) {
  if (!color) return false;
  const rgb = convertRGBStringToObject(color);
  return !!rgb && isRGBObject(rgb)
}


/**
 * Validates a HSL object specified in param
 * 
 * @example
 * isHSLObject( { h:12, s:'0%', l:'20%' } )
 * 
 * @tests
 *
 * Is a HSL Object Color
 *
 *  √ isHSLObject({"h":12,"s":"0%","l":"20%"}) returns true.
 *  √ isHSLObject({"h":460,"s":"34%","l":"57%"}) returns false. "Hue" component cannot be bigger than 360
 *  √ isHSLObject({"h":12,"s":"260%","l":"57%"}) returns false. "Saturation" component cannot be bigger than 100%
 *  √ isHSLObject({"h":12,"s":"34%","l":"260%"}) returns false. "Light" component cannot be bigger than 100%
 *  √ isHSLObject({"h":12,"s":"34%","l":"80"}) returns false. "Saturation" component is not in percent format
 *  √ isHSLObject({"h":12,"s":"34","l":"80%"}) returns false. "Light" component is not in percent format
 *
 *
 * @param {String} color: Cor em formato HSL Object
 * @return {Boolean}
 */
const isHSLObject = function (color) {
  const validate = component => {
    const rgx = /(?<component>[0-9]+)\%/
    const match = rgx.exec(component);
    if (match && match.groups) {
      return parseInt(match.groups.component) >= 0 && parseInt(match.groups.component) <= 100
    }

    return false;
  }

  return typeof color === 'object'
    && Object.keys(color).every(item => ['h', 's', 'l'].includes(item))
    && color.h >= 0 && color.h <= 360
    && validate(color.s)
    && validate(color.l)
}


/**
 * Validates if a specified param is a HSL string color
 *
 * @example
 * isHSLString('hsl(12, 90%, 50%)')
 * 
 * @tests
 *
 *  Is a HSL String Color
 *
 *    √ isHSLString(hsl(12, 0%, 20%)) returns true.
 *    √ isHSLString(hsl(460, 34%, 57%)) returns false. "Hue" component cannot be bigger than 360
 *    √ isHSLString(hsl(12, 260%, 57%)) returns false. "Saturation" component cannot be bigger than 100%
 *    √ isHSLString(hsl(12, 34%, 120%)) returns false. "Light" component cannot be bigger than 100%
 *    √ isHSLString(hsl(12, 34%, 80)) returns false. "Saturation" component is not in percent format
 *    √ isHSLString(hsl(12, 34, 80%)) returns false. "Light" component is not in percent format
 *
 *    total:     6
 *    passing:   6
 *    duration:  16ms
 * 
 *
 *
 * @param {String} color: Cor em formato
 * @return {Boolean}
 */
const isHSLString = function (color) {
  const hsl = convertHSLStringToObject(color);
  return !!hsl && isHSLObject(hsl)
}


/**
 * Validates if the specified param is a hexadecimal color
 *
 * @example
 * isHexadecimal('#FFF')
 * 
 * @tests
 *
 *  Is a VALID Hexadecimal Color
 * 
 *    √ isHexadecimal(123) returns true
 *    √ isHexadecimal(#123) returns true
 *    √ isHexadecimal(#123345) returns true
 *    √ isHexadecimal(123567) returns true
 *    √ isHexadecimal(#abc) returns true
 *    √ isHexadecimal(abc) returns true
 * 
 *  Is a INVALID Hexadecimal Color
 * 
 *    √ "#1232" is not a valid hexadecimal color. Returns false
 *    √ "#cla" is not a valid hexadecimal color. Returns false
 *    √ "cla" is not a valid hexadecimal color. Returns false
 * 
 * 
 *   total:     9
 *   passing:   9
 *   duration:  19ms
 *
 * @param {String} color: Cor em formato
 * @return
 */
const isHexadecimal = function (color) {
  return /^([#])?(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/.test(color)
}

// //////////////////////////////////////////////////////////////////////////
//
//  CONVERSIONS
//
// //////////////////////////////////////////////////////////////////////////

/**
 * Convert a string in format  rgb(12, 45, 67) to an object in format: { r: 12, g: 45, b: 67 }
 * 
 * @example
 *  convertRGBStringToObject('rgb(12, 45, 67)')
 * 
 * @tests
 *
 *  Convert RGB String to Object
 *
 *    √ convertRGBStringToObject("rgb(12, 45, 67)") returns {"r":12,"g":45,"b":67}.
 *    √ convertRGBStringToObject("rgb(260, 45, 67)") returns null. "Red" component cannot be bigger than 255
 *    √ convertRGBStringToObject("rgb(12, 260, 67)") returns null. "Green" component cannot be bigger than 255
 *    √ convertRGBStringToObject("rgb(12, 45, 260)") returns null. "Blue" component cannot be bigger than 255
 *
 *
 *  total:     4
 *  passing:   4
 *  duration:  17ms
 * 
 * 
 * @param {*} color 
 */
const convertRGBStringToObject = function (color) {

  const rgx = /^rgba?\((?<r>\d+),\s*(?<g>\d+),\s*(?<b>\d+)(?:,\s*(?<a>\d*(?:\.\d+)?))?\)$/
  const match = rgx.exec(color)

  if (match && match.groups) {
    const { r, g, b } = match.groups

    const rgb = { r: parseInt(r), g: parseInt(g), b: parseInt(b) }

    if (isRGBObject(rgb)) {
      return rgb
    }
    else return null
  }


  return null;
}

/**
 * Converts a RGB Object format to a String Format
 * 
 * @example
 *  convertRGBObjectToString( { h:23, s: '50%', l: '50%' } )
 * 
 * @tests
 *
 *    Try to Convert RGB Object to String
 *
 *      √ convertRGBObjectToString({"r":240,"g":240,"b":240}) returns "rgb(240, 240, 240)".
 *      √ convertRGBObjectToString({"r":260,"g":240,"b":240}) returns null. "Reg" component cannot be bigger than 255
 *      √ convertRGBObjectToString({"r":240,"g":260,"b":240}) returns null. "Green" component cannot be bigger than 255
 *      √ convertRGBObjectToString({"r":240,"g":240,"b":260}) returns null. "Blue" component cannot be bigger than 255
 *
 *
 *    total:     4
 *    passing:   4
 *    duration:  20ms
 * 
 * 
 * 
 * @param {Object} color
 * @returns {String} in format rgb(23, 45, 67) or null if invalid rgb color object
 */
const convertRGBObjectToString = function (color) {
  if (isRGBObject(color)) {
    return `rgb(${color.g}, ${color.g}, ${color.b})`
  }

  return null;
}


/**
 * Convert a string in format hsl(24, 50%, 50%) in format {h:24, s: '50%', l:'50%'}
 * 
 * @validation
 * hue = 0 - 360
 * saturation = 0% - 100% (0% = shades of grey/ 100% = full color)
 * lightness = 0% - 100% (0% = black/ 100% = white)
 *  
 * @example
 *  convertHSLStringToObject('hsl(24, 50%, 50%)')
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
 *    total:     6
 *    passing:   6
 *    duration:  21ms
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const convertHSLStringToObject = function (color) {
  const rgx = /^hsl\((?<h>\d+),\s*(?<s>(?<sInt>\d+)\%),\s*(?<l>(?<lInt>\d+)\%)\)$/
  const match = rgx.exec(color)

  if (match && match.groups) {
    const { h, s, l, sInt, lInt } = match.groups

    if (h < 0 || h > 360 || sInt < 0 || sInt > 100 || lInt < 0 || lInt > 100) return null

    return { h: parseInt(h), s, l }
  }

  return null;
}

/**
 * Converts a HSL Object format to a String Format
 * 
 * @example
 *  convertHSLObjectToString( { h:23, s: '50%', l: '50%' } )
 * 
 * @tests
 *
 *  Try convert a HSL Object to String
 *
 *    √ convertHSLObjectToString({"h":12,"s":"0%","l":"20%"}) returns "hsl(12, 0%, 20%)".
 *    √ convertHSLObjectToString({"h":460,"s":"34%","l":"57%"}) returns null. "Hue" component cannot be bigger than 360
 *    √ convertHSLObjectToString({"h":12,"s":"260%","l":"57%"}) returns null. "Saturation" component cannot be bigger than 100%
 *    √ convertHSLObjectToString({"h":12,"s":"34%","l":"260%"}) returns null. "Light" component cannot be bigger than 100%
 *    √ convertHSLObjectToString({"h":12,"s":"34%","l":"80"}) returns null. "Saturation" component is not in percent format
 *    √ convertHSLObjectToString({"h":12,"s":"34","l":"80%"}) returns null. "Light" component is not in percent format
 *
 *
 *  total:     6
 *  passing:   6
 *  duration:  20ms 
 * 
 * @param {Object} color
 * @returns {String} in format hsl(23, 50%, 50%) or null if invalid hsl color object
 */
const convertHSLObjectToString = function (color) {
  if (isHSLObject(color)) {
    return `hsl(${color.h}, ${color.s}, ${color.l})`
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
 * @tests
 *
 *  Try convert Hexadecimal Color to RGB
 *
 *    √ hexToRgb(123) returns {"r":17,"g":34,"b":51}
 *    √ hexToRgb(#123) returns {"r":17,"g":34,"b":51}
 *    √ hexToRgb(112233) returns {"r":17,"g":34,"b":51}
 *    √ hexToRgb(#112233) returns {"r":17,"g":34,"b":51}
 *    √ hexToRgb(abc) returns {"r":170,"g":187,"b":204}
 *    √ hexToRgb(#abc) returns {"r":170,"g":187,"b":204}
 *
 *
 *  total:     6
 *  passing:   6
 *  duration:  18ms
 * 
 *
 *
 * @param {String} color: Cor em formato
 * @return
 */
const hexToRgb = function (color) {
  if (isHexadecimal(color)) {

    color = normalizeHex(color).substr(1, 6);
    // parseInt(hex, 16)
    return {
      r: parseInt(color.substr(0, 2), 16),
      g: parseInt(color.substr(2, 2), 16),
      b: parseInt(color.substr(4, 2), 16),
    }
  }

  return null
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
    let { r, g, b } = color;
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
 * @tests
 *
 *  Normalize Hexadecimal Color
 *
 *    √ normalizeHex(123) returns #112233
 *    √ normalizeHex(#123) returns #112233
 *    √ normalizeHex(#123345) returns #123345
 *    √ normalizeHex(123567) returns #123567
 *    √ normalizeHex(#abc) returns #AABBCC
 *    √ normalizeHex(abc) returns #AABBCC
 *    √ "#1232" is not a valid hexadecimal color. Returns null
 *    √ "#cla" is not a valid hexadecimal color. Returns null
 *    √ "cla" is not a valid hexadecimal color. Returns null
 *
 * @example
 *    normalizeHex('123')      // #112233
 *    normalizeHex('#123')     // #112233
 *    normalizeHex('#123345')  // #123345
 *    normalizeHex('123567')   // #123567
 *    normalizeHex('#abc')     // #AABBCC
 *    normalizeHex('abc')      // #AABBCC
 *    normalizeHex('#1232')    // null
 *    normalizeHex('#cla')     // null
 *    normalizeHex('cla')      // null
 * 
 * @param {String} strHexColor: Hexadecimal color
 */
const normalizeHex = function (strHexColor) {
  strHexColor = String(strHexColor).toUpperCase();
  const match = /^(?<hash>[#])?(?:(?<six>[0-9A-F]{6})|(?<three>[0-9A-F]{3}))?$/.exec(strHexColor);
  if (match && match.groups) {
    const { three, six } = match.groups

    if (three) return `#${three[0]}${three[0]}${three[1]}${three[1]}${three[2]}${three[2]}`
    return `#${six}`;
  }

  return null
}

/**
 * Darken a specified color
 * 
 * @example
 *  darken('#DCF', 0.2)
 *  darken({r: 23, g: 45, b: 67}, 0.25)
 *  darken('rgb(12, 65, 87)', 0.4)
 * 
 * @tests
 *
 *    Darkening colors
 *
 *      √ { r: 10, g: 10, b: 10 } darkened in 10%
 *      √ { r: 0, g: 10, b: 10 } darkened in 10%
 *      √ rgb(0, 10,10) darkened in 10%
 *      √ #000A0A darkened in 10%
 *
 *
 *    total:     4
 *    passing:   4
 *    duration:  17ms
 *
 * 
 * 
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @param {Float}: Number between 0 and 1 to darken color
 * @returns {Object} RGB Color object
 */
const darken = function (color, step) {
  const rgb = parse(color);

  if (rgb) {

    const darkenComponent = (component, step) => {
      component -= component * step;
      if (component < 0) return 0
      else if (component > 255) return 255
      else return parseInt(component)
    }


    return {
      r: darkenComponent(rgb.r, step),
      g: darkenComponent(rgb.g, step),
      b: darkenComponent(rgb.b, step)
    }
  }

  return null
}

/**
 * Lighten a specified color
 * 
 * @example
 *  lighten('#DCF', 0.2)
 *  lighten({r: 23, g: 45, b: 67}, 0.25)
 *  lighten('rgb(12, 65, 87)', 0.4)
 * 
 * @tests
 *
 *
 *    Lighting up colors
 *
 *      √ { r: 10, g: 10, b: 10 } illuminated in 10%
 *      √ { r: 255, g: 10, b: 10 } illuminated in 10%
 *      √ rgb(255, 10,10) illuminated in 10%
 *      √ #FF0A0A illuminated in 10%
 *
 *
 *    total:     4
 *    passing:   4
 *    duration:  17ms
 *
 * 
 * 
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @param {Float}: Number between 0 and 1 to darken color
 * @returns {Object} RGB Color object
 */
const lighten = function (color, step) {
  const rgb = parse(color);

  if (rgb) {

    const lightenComponent = (component, step) => {
      component += component * step;
      if (component < 0) return 0
      else if (component > 255) return 255
      else return parseInt(component)
    }


    return {
      r: lightenComponent(rgb.r, step),
      g: lightenComponent(rgb.g, step),
      b: lightenComponent(rgb.b, step)
    }
  }

  return null
}

/**
 * Verify if a specified param is a dark color
 *
 * @example
 *  isDark('#DCF')
 *  isDark({r: 23, g: 45, b: 67})
 *  isDark('rgb(12, 65, 87)')
 * 
 * @tests
 *
 *  Is a Dark Color
 *
 *    √ isDark("#FFF") returns false.
 *    √ isDark("#000") returns true.
 *
 *
 *  total:     2
 *  passing:   2
 *  duration:  28ms
 * 
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @returns {Boolean}
 */
const isDark = function (color) {

  const rgb = parse(color);
  if (rgb) {
    const { r, g, b } = rgb;

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    return hsp < 127.5;
  }

  return false;
}

/**
 * Verify if a specified param is a light color
 * 
 * @example
 *  isLight('#DCF')
 *  isLight({r: 23, g: 45, b: 67})
 *  isLight('rgb(12, 65, 87)')
 *
 * @tests
 *
 *  Is a Light Color
 *
 *    √ isLight("#FFF") returns true.
 *    √ isLight("#000") returns false.
 *
 *
 *  total:     2
 *  passing:   2
 *  duration:  19ms
 * 
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @returns {Object} RGB Color object
 */
const isLight = function (color) {
  return !isDark(color)
}


/**
 * Verify if a specified param is a valid color in anu format supperted by parse()
 * 
 * @example
 *  isValid('#DCF')
 *  isValid({r: 23, g: 45, b: 67})
 *  isValid('rgb(12, 65, 87)')
 *
 * @tests
 *
 *    Is a Valid Color
 *
 *      √ isValid("#FFF") returns true.
 *      √ isValid("#000") returns true.
 *
 *    Is a INVALID Color
 *
 *      √ isValid("#kla") returns false.
 *      √ isValid({"r":244,"g":43}) returns false.
 *      √ isValid({"h":244,"s":"43%","l":12}) returns false.
 *
 *
 *    total:     5
 *    passing:   5
 *    duration:  28ms
 * 
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @returns {Object} RGB Color object
 */
const isValid = function (color) {
  return !!parse(color);
}




/**
 * Invert a specified color
 * 
 * @example
 *  invert('#DCF')
 *  invert({r: 23, g: 45, b: 67})
 *  invert('rgb(12, 65, 87)')
 * 
 * @tests
 *
 *  Inverting colors
 *
 *    √ { r: 10, g: 10, b: 10 } inverted
 *    √ { r: 255, g: 10, b: 10 } inverted
 *    √ rgb(255, 10,10) inverted
 *    √ #FF0A0A inverted
 * 
 * @param {String, Object} color: Any supported format by parse()
 * @returns {Object} RGB Color object
 */
const invert = function (color, step) {
  const rgb = parse(color);

  if (rgb) {

    const invertComponent = (component) => {
      component -= 255
      return parseInt(component < 0 ? component * (-1) : component)
    }


    return {
      r: invertComponent(rgb.r),
      g: invertComponent(rgb.g),
      b: invertComponent(rgb.b)
    }
  }

  return null
}

module.exports = {
  parse,
  isRGBObject,
  isRGBString,
  isHSLObject,
  isHSLString,
  isHexadecimal,
  convertRGBStringToObject,
  convertRGBObjectToString,
  convertHSLStringToObject,
  convertHSLObjectToString,
  // hslToRgb,
  // rgbToHsl,
  hexToRgb,
  rgbToHex,
  normalizeHex,

  darken,
  lighten,
  invert,

  isLight,
  isDark,
  isValid
}