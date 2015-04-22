'use strict';

var path = require('path');
var BinWrapper = require('bin-wrapper');
var pkg = require('../package.json');
var url = 'https://raw.github.com/imagemin/zopflipng-bin/v' + pkg.version + '/vendor/';

module.exports = new BinWrapper()
	.src(url + 'osx/zopflipng', 'darwin')
	.src(url + 'linux/zopflipng', 'linux')
	.src(url + 'win32/zopflipng.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'zopflipng.exe' : 'zopflipng');
