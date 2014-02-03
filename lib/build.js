'use strict';

var bin = require('./zopflipng').bin;
var chalk = require('chalk');

bin.build(function (error) {
  if (error) {
    return console.log(chalk.red('✗ ' + error.message));
  }

  console.log(chalk.green('✓ zopflipng built successfully'));
});