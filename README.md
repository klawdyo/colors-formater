# colors-formater

A library to provide simple manipulation between colors formats in javascript

## Instalation
```git
# NPM
npm install --save https://github.com/klawdyo/colors-formater

#Yarn
yarn add https://github.com/klawdyo/colors-formater

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
  // Init with hexa color
  const color = Colors('123')
  const color = Colors('#123')
  const color = Colors('#ABCDEF') 
  
  // Init with RGB object
  const color = Colors({ r:255, g:23, b: 467 }) 
  
  // Init with RGB string
  const color = Colors('rgb(23, 45, 67)')
  const color = Colors('rgba(23, 45, 67, 0.4)')
  
  // Init with HSL object
  const color = Colors({ h:255, s:23, l: 467 })
  ```

  ### Convertions

  ```js
    color.toHex()
    color.toHSL()
    color.toRGB()
    color.toRGBString()
    color.toHSLString()
```

  ### Verifications

```js
    color.isHex()
    color.isHSL()
    color.isRGB()
    color.isLight()
    color.isDark()
  ```

  ### Calculations

  These functions changes internal initial color. Always 
  prefer using it with the constructor Colors([color])

  ```js
    Colors(#A34).darken(.2).toHex()
    Colors(#A34).lighten(.35).toRGB()
    Colors(#A34).inverted().toHSL()
```