'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

bin.run(['--help'], function (err) {
	if (err) {
		console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

		var builder = new BinBuild()
			.src('https://zopfli.googlecode.com/archive/' + bin.v + '.tar.gz')
			.cmd('mkdir -p ' + bin.dest())
			.cmd('make zopflipng && mv ./zopflipng ' + bin.path());

		return builder.build(function (err) {
			if (err) {
				return console.log(logSymbols.error, err);
			}

			console.log(logSymbols.success + ' zopflipng built successfully!');
		});
	}

	console.log(logSymbols.success + ' pre-build test passed successfully!');
});
