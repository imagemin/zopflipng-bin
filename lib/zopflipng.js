'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'zopflipng',
  bin: 'zopflipng',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/osx/zopflipng',
  src: 'https://github.com/1000ch/zopfli/archive/master.zip',
  buildScript: 'make zopflipng && mv ./zopflipng ' + path.join(__dirname, '../vendor'),
  platform: {
    osx: {
      url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/osx/zopflipng'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/linux/zopflipng'
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;