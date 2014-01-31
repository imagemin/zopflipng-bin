# [node-zopflipng-bin](https://npmjs.org/package/zopflipng-bin) [![Build Status](https://travis-ci.org/1000ch/node-zopflipng-bin.png?branch=master)](https://travis-ci.org/1000ch/node-zopflipng-bin)

## About

zopflipng (part of [zopfli](https://code.google.com/p/zopfli/)) is Node.js wrapper that optimize PNG images.

> Zopfli Compression Algorithm is a new zlib (gzip, deflate) compatible compressor. This compressor takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor we have found.

## Install

```sh
$ npm install -g zopflipng-bin
```

## Usage with NodeJS

```js
var execFile = require('child_process').execFile;
var zopflipngPath = require('zopflipng-bin').path;

execFile(zopflipngPath, ['-m', '--lossy_8bit', 'dest.png'], function() {
  console.log('Image minified');
});
```

## License

This is MIT.
[zopfli](https://code.google.com/p/zopfli/) is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).