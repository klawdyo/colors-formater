# colors-formater

A library to provide simple manipulation between colors formats in javascript

## Instalation

### Latest Version

```git
// NPM
npm install --save colors-formater

// Yarn
yarn add colors-formater

```

### A Specific Version

```git
// NPM
npm install --save colors-formater#v.0.8

// Yarn
yarn add colors-formater#v.0.8

```


## Examples

### Import

```js
  // CommonJS
  const Colors = require('colors-formater')

  // ES6
  import Colors from 'colors-formater'
```


### Initialization

```js
  // Initialization with a Hexa Color
  const color = Colors('123')
  const color = Colors('#123')
  const color = Colors('#ABCDEF') 
  
  // Initialization with a RGB Object
  const color = Colors({ r: 255, g: 23, b: 87 }) 
  
  // Initialization with a RGB String
  const color = Colors('rgb(23, 45, 67)')
  const color = Colors('rgba(23, 45, 67, 0.4)')
  
  // Initialization with a HSL Object
  const color = Colors({ h: 255, s: '23%', l: '50%' })

  // Initialization with a HSL Sring
  const color = Colors('hsl(255, 23%, 50%)')
  ```

  ### Convertions

```js
    // Init
    const color = Colors('#abc')

    // Convert do normalized Hexadecimal
    color.toHex()       // #AABBCC

    // Convert do RGB Object
    color.toRGB()       // { r: 12, g: 45, b: 56 }

    // Convert to RGB string
    color.toRGBString() // rgb( 12, 45, 56 )

    // Convert to HSL Object
    color.toHSL()       // { h: 30, s: 50%, l: 50% }

    // Convert to HSL String
    color.toHSLString() // hsl( 30, 50%, 50% )
```

  ### Verifications

```js
    // Init
    const color = Colors('#abc')

    // Is a valid color in any format supported by parse()?
    color.isValid()         // true

    // Is a hexadecimal color?
    color.isHex()           // true

    // Is a HSL object color?
    color.isHSL()          // false

    // Is a RGB Object color?
    color.isRGB()         //false

    // Is a Light color?
    color.isLight()       //false

    // Is a Dark color?
    color.isDark()        //true
```

  ### Calculations

  These functions changes internal initial color. Always 
  prefer using it with the constructor Colors([color])

```js
    // Init
    const color = Colors('#abc')

    // Darken a color and returns the result as hexadecimal
    Colors('#A34').darken(.2).toHex()

    // Lighten a color and returns the result as RGB object
    Colors('#A34').lighten(.35).toRGB()

    // Inverts a color and returns the result as HSL object
    Colors('#A34').invert().toHSL()
```
