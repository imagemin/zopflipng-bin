'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--help'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('zopflipng pre-build test failed');
		log.info('compiling from source');

		let makeBin = 'make';

		if (process.platform === 'freebsd') {
			makeBin = 'gmake';
		}

		const builder = new BinBuild()
			.src('https://github.com/google/zopfli/archive/6818a0859063b946094fb6f94732836404a0d89a.zip')
			.cmd(`mkdir -p ${bin.dest()}`)
			.cmd(`${makeBin} zopflipng && mv ./zopflipng ${bin.path()}`);

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('zopflipng built successfully');
		});
	}

	log.success('zopflipng pre-build test passed successfully');
});
