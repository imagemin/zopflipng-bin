import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['--help']).then(() => {
	console.log('zopflipng pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('zopflipng pre-build test failed');
	console.info('compiling from source');

	let makeBin = 'make';
	let makeArgs = '';

	if (process.platform === 'freebsd') {
		makeBin = 'gmake';
		makeArgs = 'CC=cc CXX=c++';
	}

	try {
		const source = fileURLToPath(new URL('../vendor/source/zopfli-1.0.3.tar.gz', import.meta.url));
		await binBuild.file(source, [
			`mkdir -p ${bin.dest()}`,
			`${makeBin} zopflipng ${makeArgs} && mv ./zopflipng ${bin.path()}`,
		]);

		console.log('zopflipng built successfully');
	} catch (error) {
		console.error(error.stack);
	}
});
