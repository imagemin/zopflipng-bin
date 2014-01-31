'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'zopflipng',
  bin: 'zopflipng',
  path: path.join(__dirname, '../vendor'),
  src: 'https://code.google.com/p/zopfli/downloads/detail?name=zopfli-1.0.0.zip&can=2&q=',
  buildScript: 'make zopflipng && mv zopflipng ' + path.join(__dirname, '../vendor'),
  platform: {
    darwin: {
      url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/osx/zopflipng'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/linux/x86/zopflipng',
      arch: {
        x64: {
          url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/linux/x64/zopflipng'
        }
      }
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;