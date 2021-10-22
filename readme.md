# zopflipng-bin ![GitHub Actions Status](https://github.com/imagemin/zopflipng-bin/workflows/test/badge.svg?branch=main)


> [zopfli](https://github.com/google/zopfli) Compression Algorithm is a new zlib (gzip, deflate) compatible compressor that takes more time (~100x slower), but compresses around 5% better than zlib and better than any other zlib-compatible compressor

You probably want [`imagemin-zopfli`](https://github.com/imagemin/imagemin-zopfli) instead.


## Install

```
$ npm install zopflipng-bin
```


## Usage

```js
import {execFile} from 'node:child_process';
import zopflipng from 'zopflipng-bin';

execFile(zopflipng, ['-m', '--lossy_8bit', 'input.png', 'outout.png'], () => {
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

MIT © [Imagemin](https://github.com/imagemin)
