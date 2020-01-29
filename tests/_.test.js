
require('./index.test')

require('./parse.test')                                // ok

require('./is-rgb-object.test')                        // ok
require('./is-rgb-string.test')                        // ok

require('./is-hsl-object.test')                        // ok
require('./is-hsl-string.test')                        // ok

require('./is-hexadecimal.test')                       // ok

require('./convert-rgb-string-to-object.test')         // ok
require('./convert-rgb-object-to-string.test')         // OK

require('./convert-hsl-string-to-object.test')         // OK
require('./convert-hsl-object-to-string.test')         // OK

require('./hex-to-rgb.test')                           // OK

require('./normalize-hex.test')                        // OK


require('./invert.test')                               // OK

require('./darken.test')                               // OK
require('./lighten.test')                              // OK

require('./is-light.test')                              // OK
require('./is-dark.test')                               // OK
require('./is-valid.test')                              // OK



//*/