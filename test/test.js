/* eslint-env mocha */
/* eslint-disable promise/no-promise-in-callback, promise/no-callback-in-promise */
'use strict';
const assert = require('assert');
const execFile = require('child_process').execFile;
const fs = require('fs');
const path = require('path');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const tmp = path.join(__dirname, 'tmp');

beforeEach(cb => {
	mkdirp(tmp, cb);
});

afterEach(cb => {
	rimraf(tmp, {disableGlob: true}, cb);
});

it('rebuild the zopflipng binaries', function (cb) {
	this.timeout(50000);

	new BinBuild()
		.src('https://github.com/google/zopfli/archive/a29e46ba9f268ab273903558dcb7ac13b9fe8e29.zip')
		.cmd(`mkdir -p ${tmp}`)
		.cmd(`make zopflipng && mv ./zopflipng ${path.join(tmp, 'zopflipng')}`)
		.run(err => {
			assert(!err);
			assert(fs.statSync(path.join(tmp, 'zopflipng')).isFile());
			cb();
		});
});

it('return path to binary and verify that it is working', () => {
	return binCheck(require('../'), ['--help']).then(works => {
		assert(works);
	});
});

it('minify a PNG', cb => {
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'--lossy_8bit',
		src,
		dest
	];

	execFile(require('../'), args, err => {
		assert(!err);

		compareSize(src, dest).then(res => {
			assert(res[dest] < res[src]);
			cb();
		}).catch(cb);
	});
});
