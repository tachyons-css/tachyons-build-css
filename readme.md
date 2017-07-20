# tachyons-build-css [![Build Status](https://secure.travis-ci.org/tachyons-css/tachyons-build-css.svg?branch=master)](https://travis-ci.org/tachyons-css/tachyons-build-css) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Transpile Tachyons PostCSS to vanilla CSS.
This build process also removes comments, autoprefixes, and has options for minifying the output or repeating class selectors (to play nice with overly specific CSS frameworks).

## Installation

```bash
npm install --save-dev tachyons-build-css
```

## Usage

```javascript
const fs = require('fs')
const tachyonsBuildCss = require('tachyons-build-css')

const input = fs.readFileSync('input.css', 'utf8')

tachyonsBuildCss(input, {
  from: 'input.css',
  to: 'output.css',
  minify: true,
  plugins: [my(), other(), plugins()]
}).then(result => {
  fs.writeFileSync('output.css', result.css)
})
```

If you want more control, but want the plugins used here, you can get them with the `getPlugins` function
```javascript
const { getPlugins } = require('tachyons-build-css')

const plugins = getPlugins({
  from: 'input.css',
  to: 'output.css',
  minify: true
})
```

#### Options

| Option | Default | Description | Values |
| ------ | ------- | ----------- | ------ |
| `from` | `undefined` | The input file name | file name |
| `to` | `undefined` | The output file name | file name |
| `minify` | `false` | Minify the output CSS | `true`, `false` |
| `repeat` | `false` | Whether to repeat classes in selectors | `false`, `1..10` |
| `plugins` | `false` | Additional postcss plugins | [my(), other(), plugins()] |
| `atImport` | `{}` | Options for `postcss-import` | `postcss-import` options |

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
