# zopflipng-bin [![Build Status](https://travis-ci.org/imagemin/zopflipng-bin.svg?branch=master)](https://travis-ci.org/imagemin/zopflipng-bin)

> zopfli Compression Algorithm is a new zlib (gzip, deflate) compatible compressor that takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor


## Install

```
$ npm install --save zopflipng-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var zopflipng = require('zopflipng-bin');

execFile(zopflipng, ['-m', '--lossy_8bit', 'input.png', 'outout.png'], function (err) {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global zopflipng-bin
```

```
$ zopflipng --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
