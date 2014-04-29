'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/osx/zopflipng', 'darwin')
  .src('https://raw.github.com/1000ch/node-zopflipng-bin/master/vendor/linux/zopflipng', 'linux')
  .dest(path.join(__dirname, 'vendor'))
  .use('zopflipng');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
  if (!exists) {
    bin.run(['--version'], function (err) {
      if (err) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('https://zopfli.googlecode.com/files/zopfli-1.0.0.zip')
          .make('make && mkdir ' + bin.dest() + ' && mv ./zopfli ' + bin.use());

        return builder.build(function (err) {
          if (err) {
            return console.log(chalk.red('✗ ' + err));
          }

          console.log(chalk.green('✓ zopfli built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */

module.exports.path = bin.use();
