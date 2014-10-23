# zopflipng-bin [![Build Status](http://img.shields.io/travis/imagemin/zopflipng-bin.svg?style=flat)](https://travis-ci.org/imagemin/zopflipng-bin)

> zopfli Compression Algorithm is a new zlib (gzip, deflate) compatible compressor that takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor


## Install

```sh
$ npm install --save zopflipng-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var zopflipng = require('zopflipng-bin').path;

execFile(zopflipng, ['-m', '--lossy_8bit', 'input.png', 'outout.png'], function (err) {
	if (err) {
		throw err;
	}

	console.log('Image minified!');
});
```


## CLI

```sh
$ npm install --global zopflipng-bin
```

```sh
$ zopflipng --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
