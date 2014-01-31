'use strict';

var bin = require('./zopflipng').bin;
var chalk = require('chalk');

bin.check(function (w) {
  if (!w) {
    console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

    if (process.platform === 'win32') {
      return console.log(chalk.red('✗ building is not supported on ' + process.platform));
    }

    return bin.build(function (error) {
      if (error) {
        return console.log(chalk.red('✗ ' + error.message));
      }

      console.log(chalk.green('✓ zopflipng rebuilt successfully'));
    });
  }

  console.log(chalk.green('✓ pre-build test passed successfully'));
});