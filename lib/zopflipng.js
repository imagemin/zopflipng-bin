'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'zopflipng',
  bin: 'zopflipng',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/osx/zopflipng',
  src: 'http://sourceforge.jp/frs/g_redir.php?m=jaist&f=%2Fzopfli.mirror%2Fzopfli-1.0.0.zip',
  buildScript: 'unzip zopfli-1.0.0 && make zopflipng && mv ./zopflipng ' + path.join(__dirname, '../vendor'),
  platform: {
    osx: {
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