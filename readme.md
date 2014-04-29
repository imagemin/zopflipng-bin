# [node-zopflipng-bin](https://npmjs.org/package/zopflipng-bin)

zopflipng (part of [zopfli](https://code.google.com/p/zopfli/)) Node.js wrapper that optimize PNG images.

> Zopfli Compression Algorithm is a new zlib (gzip, deflate) compatible compressor. This compressor takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor we have found.

[![Build Status](https://travis-ci.org/1000ch/node-zopflipng-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-zopflipng-bin)
[![NPM version](https://badge.fury.io/js/zopflipng-bin.svg)](http://badge.fury.io/js/zopflipng-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-zopflipng-bin.svg)](https://david-dm.org/1000ch/node-zopflipng-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-zopflipng-bin/dev-status.svg)](https://david-dm.org/1000ch/node-zopflipng-bin#info=devDependencies)

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

This is licensed under BSD.

[zopfli](https://code.google.com/p/zopfli/) is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
