'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

bin.run(['--version'], function (err) {
  if (err) {
    console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

    var builder = new BinBuild()
      .src('https://zopfli.googlecode.com/archive/b87006baae7ddb2142660621e20916d07928cbe2.tar.gz')
      .cmd('make zopfplipng && [ -d ' + bin.dest() + ' ] || mkdir ' + bin.dest() + ' && mv ./zopflipng ' + bin.path());

    return builder.build(function (err) {
      if (err) {
        return console.log(logSymbols.error, err);
      }

      console.log(logSymbols.success + ' zopflipng built successfully!');
    });
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});
