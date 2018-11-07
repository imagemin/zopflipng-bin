'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--help'])
	.then(() => log.success('zopflipng pre-build test passed successfully'))
	.catch(err => {
		log.warn(err.message);
		log.warn('zopflipng pre-build test failed');
		log.info('compiling from source');

		let makeBin = 'make';
		let makeArgs = '';

		if (process.platform === 'freebsd') {
			makeBin = 'gmake';
			makeArgs = 'CC=cc CXX=c++';
		}

		binBuild.url('https://github.com/google/zopfli/archive/zopfli-1.0.2.zip', [
			`mkdir -p ${bin.dest()}`,
			`${makeBin} zopflipng ${makeArgs} && mv ./zopflipng ${bin.path()}`
		])
			.then(() => log.success('zopflipng built successfully'))
			.catch(err => log.error(err.stack));
	});
