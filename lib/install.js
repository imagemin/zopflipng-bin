'use strict';

var BinBuild = require('bin-build');
var log = require('logalot');
var bin = require('./');

bin.run(['--help'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('zopflipng pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('https://github.com/google/zopfli/archive/zopfli-1.0.1.zip')
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
