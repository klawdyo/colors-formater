"use strict";function _wrapRegExp(){function a(a,b,d){var f=c.call(this,a,b);return e.set(f,d||e.get(a)),f}function b(a,b){var c=e.get(b);return Object.keys(c).reduce(function(b,d){return b[d]=a[c[d]],b},Object.create(null))}_wrapRegExp=function(b,c){return new a(b,void 0,c)};var c=_wrapNativeSuper(RegExp),d=RegExp.prototype,e=new WeakMap;return _inherits(a,c),a.prototype.exec=function(a){var c=d.exec.call(this,a);return c&&(c.groups=b(c,this)),c},a.prototype[Symbol.replace]=function(a,c){if("string"==typeof c){var f=e.get(this);return d[Symbol.replace].call(this,a,c.replace(/\$<([^>]+)>/g,function(a,b){return"$"+f[b]}))}if("function"==typeof c){var g=this;return d[Symbol.replace].call(this,a,function(){var a=[];return a.push.apply(a,arguments),"object"!==_typeof(a[a.length-1])&&a.push(b(a,g)),c.apply(this,a)})}return d[Symbol.replace].call(this,a,c)},_wrapRegExp.apply(this,arguments)}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _wrapNativeSuper(a){var b="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(a){function c(){return _construct(a,arguments,_getPrototypeOf(this).constructor)}if(null===a||!_isNativeFunction(a))return a;if("function"!=typeof a)throw new TypeError("Super expression must either be null or a function");if("undefined"!=typeof b){if(b.has(a))return b.get(a);b.set(a,c)}return c.prototype=Object.create(a.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(c,a)},_wrapNativeSuper(a)}function _construct(){return _construct=_isNativeReflectConstruct()?Reflect.construct:function(b,c,d){var e=[null];e.push.apply(e,c);var a=Function.bind.apply(b,e),f=new a;return d&&_setPrototypeOf(f,d.prototype),f},_construct.apply(null,arguments)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function _isNativeFunction(a){return-1!==Function.toString.call(a).indexOf("[native code]")}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}/**
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
 */var parse=function(a){// is rgb object
if(isRGBObject(a))return a;// is rgb string
return isRGBString(a)?convertRGBStringToObject(a):isHSLString(a)?hslToRgb(convertHSLStringToObject(a)):isHSLObject(a)?hslToRgb(a):isHexadecimal(a)?hexToRgb(a):null},isRGBObject=function(a){return"object"===_typeof(a)&&Object.keys(a).every(function(a){return["r","g","b"].includes(a)})&&0<=a.r&&255>=a.r&&0<=a.g&&255>=a.g&&0<=a.b&&255>=a.b},isRGBString=function(a){var b=convertRGBStringToObject(a);return!!b&&isRGBObject(b)},isHSLObject=function(a){var b=function(a){var b=/*#__PURE__*/_wrapRegExp(/([0-9]+)%/,{component:1}),c=b.exec(a);return!!(c&&c.groups)&&0<=parseInt(c.groups.component)&&100>=parseInt(c.groups.component)};return"object"===_typeof(a)&&Object.keys(a).every(function(a){return["h","s","l"].includes(a)})&&0<=a.h&&360>=a.h&&b(a.s)&&b(a.l)},isHSLString=function(a){var b=convertHSLStringToObject(a);return!!b&&isHSLObject(b)},isHexadecimal=function(a){return /^([#])?(([0-9a-fA-F]{3})|([0-9a-fA-F]{6}))$/.test(a)},convertRGBStringToObject=function(a){var c=/*#__PURE__*/_wrapRegExp(/^rgba?\(([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]+)(?:,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]*(?:\.[0-9]+)?))?\)$/,{r:1,g:2,b:3,a:4}),d=c.exec(a);if(d&&d.groups){var e=d.groups,f=e.r,h=e.g,g=e.b,b={r:parseInt(f),g:parseInt(h),b:parseInt(g)};return isRGBObject(b)?b:null}return null},convertRGBObjectToString=function(a){return isRGBObject(a)?"rgb(".concat(a.g,", ").concat(a.g,", ").concat(a.b,")"):null},convertHSLStringToObject=function(a){var b=/*#__PURE__*/_wrapRegExp(/^hsl\(([0-9]+),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(([0-9]+)%),[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(([0-9]+)%)\)$/,{h:1,s:2,sInt:3,l:4,lInt:5}),c=b.exec(a);if(c&&c.groups){var d=c.groups,e=d.h,f=d.s,g=d.l,h=d.sInt,i=d.lInt;return 0>e||360<e||0>h||100<h||0>i||100<i?null:{h:parseInt(e),s:f,l:g}}return null},convertHSLObjectToString=function(a){return isHSLObject(a)?"hsl(".concat(a.h,", ").concat(a.s,", ").concat(a.l,")"):null},hslToRgb=function(a){var d,e,f,c=Math.round,i=a.h,h=a.s,j=a.l;if(0==h)d=e=f=j;else{var k=function(a,b,c){return 0>c&&(c+=1),1<c&&(c-=1),c<1/6?a+6*(b-a)*c:c<1/2?b:c<2/3?a+6*((b-a)*(2/3-c)):a},l=.5>j?j*(1+h):j+h-j*h,m=2*j-l;d=k(m,l,i+1/3),e=k(m,l,i),f=k(m,l,i-1/3)}return{r:c(255*d),g:c(255*e),b:c(255*f)}},rgbToHsl=function(a){var c=a.r,e=a.g,f=a.b;c/=255,e/=255,f/=255;var i,j,k=Math.max(c,e,f),m=Math.min(c,e,f),n=(k+m)/2;if(k==m)i=j=0;else{var l=k-m;j=.5<n?l/(2-k-m):l/(k+m);k===c?i=(e-f)/l+(e<f?6:0):k===e?i=(f-c)/l+2:k===f?i=(c-e)/l+4:void 0;i/=6}return{h:i,s:j,l:n}},hexToRgb=function(a){return isHexadecimal(a)?(a=normalizeHex(a).substr(1,6),{r:parseInt(a.substr(0,2),16),g:parseInt(a.substr(2,2),16),b:parseInt(a.substr(4,2),16)}):null},rgbToHex=function(a){if(isRGBObject(a)){var c=a.r,d=a.g,e=a.b;return c=c.toString(16),d=d.toString(16),e=e.toString(16),normalizeHex("".concat(1===c.length?"0"+c:c).concat(1===d.length?"0"+d:d).concat(1===e.length?"0"+e:e))}return null},normalizeHex=function(a){a=(a+"").toUpperCase();var b=/*#__PURE__*/_wrapRegExp(/^(#)?(?:([0-9A-F]{6})|([0-9A-F]{3}))?$/,{hash:1,six:2,three:3}).exec(a);if(b&&b.groups){var c=b.groups,d=c.three,e=c.six;return d?"#".concat(d[0]).concat(d[0]).concat(d[1]).concat(d[1]).concat(d[2]).concat(d[2]):"#".concat(e)}return null},darken=function(a,b){var c=parse(a);if(c){var d=function(a,b){return a-=a*b,0>a?0:255<a?255:parseInt(a)};return{r:d(c.r,b),g:d(c.g,b),b:d(c.b,b)}}return null},lighten=function(a,b){var c=parse(a);if(c){var d=function(a,b){return a+=a*b,0>a?0:255<a?255:parseInt(a)};return{r:d(c.r,b),g:d(c.g,b),b:d(c.b,b)}}return null},isDark=function(a){var c=parse(a);if(c){var d=c.r,e=c.g,f=c.b,b=Math.sqrt(.299*(d*d)+.587*(e*e)+.114*(f*f));// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
// Using the HSP value, determine whether the color is light or dark
return 127.5>b}return!1},isLight=function(a){return!isDark(a)},isValid=function(a){return!!parse(a)},invert=function(a){var b=parse(a);if(b){var c=function(a){return a-=255,parseInt(0>a?-1*a:a)};return{r:c(b.r),g:c(b.g),b:c(b.b)}}return null};// //////////////////////////////////////////////////////////////////////////
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
 */module.exports={parse:parse,isRGBObject:isRGBObject,isRGBString:isRGBString,isHSLObject:isHSLObject,isHSLString:isHSLString,isHexadecimal:isHexadecimal,convertRGBStringToObject:convertRGBStringToObject,convertRGBObjectToString:convertRGBObjectToString,convertHSLStringToObject:convertHSLStringToObject,convertHSLObjectToString:convertHSLObjectToString,// hslToRgb,
// rgbToHsl,
hexToRgb:hexToRgb,rgbToHex:rgbToHex,normalizeHex:normalizeHex,darken:darken,lighten:lighten,invert:invert,isLight:isLight,isDark:isDark,isValid:isValid};