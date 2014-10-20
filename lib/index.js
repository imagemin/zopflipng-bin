'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = 'b87006baae7ddb2142660621e20916d07928cbe2';
var BASE_URL = 'https://raw.github.com/imagemin/node-zopflipng-bin/v' + pkg.version + '/vendor/';

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/zopflipng', 'darwin')
	.src(BASE_URL + 'linux/zopflipng', 'linux')
	.src(BASE_URL + 'win32/zopflipng.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'zopflipng.exe' : 'zopflipng');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;
