'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var log = require('imagemin-log');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

bin.run(['--help'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('zopflipng pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('https://zopfli.googlecode.com/archive/' + bin.v + '.tar.gz')
			.cmd('mkdir -p ' + bin.dest())
			.cmd('make zopflipng && mv ./zopflipng ' + bin.path());

		return builder.run(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('zopflipng built successfully');
		});
	}

	log.success('zopflipng pre-build test passed successfully');
});
