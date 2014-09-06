# [zopflipng-bin](https://npmjs.org/package/zopflipng-bin) [![Build Status](http://img.shields.io/travis/imagemin/zopflipng-bin.svg?style=flat)](https://travis-ci.org/imagemin/zopflipng-bin) [![Build status](https://ci.appveyor.com/api/projects/status/wby51t87xij21y34)](https://ci.appveyor.com/project/ShinnosukeWatanabe/zopflipng-bin)

zopflipng (part of [zopfli](https://code.google.com/p/zopfli/)) Node.js wrapper that optimize PNG images.

> Zopfli Compression Algorithm is a new zlib (gzip, deflate) compatible compressor. This compressor takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor we have found.

## Install

```sh
$ npm install --save zopflipng-bin
```

## Usage

```js
var execFile = require('child_process').execFile;
var zopfli= require('zopflipng-bin').path;

execFile(zopfli, ['-m', '--lossy_8bit', 'input.png', 'outout.png'], function (err) {
  if (err) {
    throw err;
  }

  console.log('Image minified');
});
```

## License

MIT © [imagemin](https://github.com/imagemin)
