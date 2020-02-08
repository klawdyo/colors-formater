"use strict";

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var parse = function parse(color) {
  // is rgb object
  if (isRGBObject(color)) {
    return color;
  } // is rgb string
  else if (isRGBString(color)) {
      return convertRGBStringToObject(color);
    } // is hsl string
    else if (isHSLString(color)) {
        return hslToRgb(convertHSLStringToObject(color));
      } // 
      else if (isHSLObject(color)) {
          return hslToRgb(color);
        } else if (isHexadecimal(color)) {
          return hexToRgb(color);
        }

  return null;
}; // //////////////////////////////////////////////////////////////////////////
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


var isRGBObject = function isRGBObject(color) {
  return _typeof(color) === 'object' && Object.keys(color).every(function (item) {
    return ['r', 'g', 'b'].includes(item);
  }) && color.r >= 0 && color.r <= 255 && color.g >= 0 && color.g <= 255 && color.b >= 0 && color.b <= 255;
};
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


var isRGBString = function isRGBString(color) {
  var rgb = convertRGBStringToObject(color);
  return !!rgb && isRGBObject(rgb);
};
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


var isHSLObject = function isHSLObject(color) {
  var validate = function validate(component) {
    var rgx = _wrapRegExp(/([0-9]+)%/, {
      component: 1
    });

    var match = rgx.exec(component);

    if (match && match.groups) {
      return parseInt(match.groups.component) >= 0 && parseInt(match.groups.component) <= 100;
    }

    return false;
  };

  return _typeof(color) === 'object' && Object.keys(color).every(function (item) {
    return ['h', 's', 'l'].includes(item);
  }) && color.h >= 0 && color.h <= 360 && validate(color.s) && validate(color.l);
};
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


var isHSLString = function isHSLString(color) {
  var hsl = convertHSLStringToObject(color);
  return !!hsl && isHSLObject(hsl);
};
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


var isHexadecimal = function isHexadecimal(color) {
  return /^([#])?(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/.test(color);
}; // //////////////////////////////////////////////////////////////////////////
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


var convertRGBStringToObject = function convertRGBStringToObject(color) {
  var rgx = _wrapRegExp(/^rgba?\(([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+)(?:,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]*(?:\.[0-9]+)?))?\)$/, {
    r: 1,
    g: 2,
    b: 3,
    a: 4
  });

  var match = rgx.exec(color);

  if (match && match.groups) {
    var _match$groups = match.groups,
        r = _match$groups.r,
        g = _match$groups.g,
        b = _match$groups.b;
    var rgb = {
      r: parseInt(r),
      g: parseInt(g),
      b: parseInt(b)
    };

    if (isRGBObject(rgb)) {
      return rgb;
    } else return null;
  }

  return null;
};
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


var convertRGBObjectToString = function convertRGBObjectToString(color) {
  if (isRGBObject(color)) {
    return "rgb(".concat(color.g, ", ").concat(color.g, ", ").concat(color.b, ")");
  }

  return null;
};
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


var convertHSLStringToObject = function convertHSLStringToObject(color) {
  var rgx = _wrapRegExp(/^hsl\(([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(([0-9]+)%),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(([0-9]+)%)\)$/, {
    h: 1,
    s: 2,
    sInt: 3,
    l: 4,
    lInt: 5
  });

  var match = rgx.exec(color);

  if (match && match.groups) {
    var _match$groups2 = match.groups,
        h = _match$groups2.h,
        s = _match$groups2.s,
        l = _match$groups2.l,
        sInt = _match$groups2.sInt,
        lInt = _match$groups2.lInt;
    if (h < 0 || h > 360 || sInt < 0 || sInt > 100 || lInt < 0 || lInt > 100) return null;
    return {
      h: parseInt(h),
      s: s,
      l: l
    };
  }

  return null;
};
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


var convertHSLObjectToString = function convertHSLObjectToString(color) {
  if (isHSLObject(color)) {
    return "hsl(".concat(color.h, ", ").concat(color.s, ", ").concat(color.l, ")");
  }

  return null;
};
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


var hslToRgb = function hslToRgb(_ref) {
  var h = _ref.h,
      s = _ref.s,
      l = _ref.l;
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
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
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


var rgbToHsl = function rgbToHsl(_ref2) {
  var r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l
  };
};
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


var hexToRgb = function hexToRgb(color) {
  if (isHexadecimal(color)) {
    color = normalizeHex(color).substr(1, 6); // parseInt(hex, 16)

    return {
      r: parseInt(color.substr(0, 2), 16),
      g: parseInt(color.substr(2, 2), 16),
      b: parseInt(color.substr(4, 2), 16)
    };
  }

  return null;
};
/**
 * 
 * 
 * @example
 * 
 * 
 * @param {String} color: Cor em formato 
 * @return
 */


var rgbToHex = function rgbToHex(color) {
  if (isRGBObject(color)) {
    var r = color.r,
        g = color.g,
        b = color.b;
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    return normalizeHex("".concat(r.length === 1 ? '0' + r : r).concat(g.length === 1 ? '0' + g : g).concat(b.length === 1 ? '0' + b : b));
  }

  return null;
};
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


var normalizeHex = function normalizeHex(strHexColor) {
  strHexColor = String(strHexColor).toUpperCase();

  var match = _wrapRegExp(/^(#)?(?:([0-9A-F]{6})|([0-9A-F]{3}))?$/, {
    hash: 1,
    six: 2,
    three: 3
  }).exec(strHexColor);

  if (match && match.groups) {
    var _match$groups3 = match.groups,
        three = _match$groups3.three,
        six = _match$groups3.six;
    if (three) return "#".concat(three[0]).concat(three[0]).concat(three[1]).concat(three[1]).concat(three[2]).concat(three[2]);
    return "#".concat(six);
  }

  return null;
};
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


var darken = function darken(color, step) {
  var rgb = parse(color);

  if (rgb) {
    var darkenComponent = function darkenComponent(component, step) {
      component -= component * step;
      if (component < 0) return 0;else if (component > 255) return 255;else return parseInt(component);
    };

    return {
      r: darkenComponent(rgb.r, step),
      g: darkenComponent(rgb.g, step),
      b: darkenComponent(rgb.b, step)
    };
  }

  return null;
};
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


var lighten = function lighten(color, step) {
  var rgb = parse(color);

  if (rgb) {
    var lightenComponent = function lightenComponent(component, step) {
      component += component * step;
      if (component < 0) return 0;else if (component > 255) return 255;else return parseInt(component);
    };

    return {
      r: lightenComponent(rgb.r, step),
      g: lightenComponent(rgb.g, step),
      b: lightenComponent(rgb.b, step)
    };
  }

  return null;
};
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


var isDark = function isDark(color) {
  var rgb = parse(color);

  if (rgb) {
    var r = rgb.r,
        g = rgb.g,
        b = rgb.b; // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html

    var hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)); // Using the HSP value, determine whether the color is light or dark

    return hsp < 127.5;
  }

  return false;
};
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


var isLight = function isLight(color) {
  return !isDark(color);
};
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


var isValid = function isValid(color) {
  return !!parse(color);
};
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


var invert = function invert(color, step) {
  var rgb = parse(color);

  if (rgb) {
    var invertComponent = function invertComponent(component) {
      component -= 255;
      return parseInt(component < 0 ? component * -1 : component);
    };

    return {
      r: invertComponent(rgb.r),
      g: invertComponent(rgb.g),
      b: invertComponent(rgb.b)
    };
  }

  return null;
};

module.exports = {
  parse: parse,
  isRGBObject: isRGBObject,
  isRGBString: isRGBString,
  isHSLObject: isHSLObject,
  isHSLString: isHSLString,
  isHexadecimal: isHexadecimal,
  convertRGBStringToObject: convertRGBStringToObject,
  convertRGBObjectToString: convertRGBObjectToString,
  convertHSLStringToObject: convertHSLStringToObject,
  convertHSLObjectToString: convertHSLObjectToString,
  // hslToRgb,
  // rgbToHsl,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  normalizeHex: normalizeHex,
  darken: darken,
  lighten: lighten,
  invert: invert,
  isLight: isLight,
  isDark: isDark,
  isValid: isValid
};