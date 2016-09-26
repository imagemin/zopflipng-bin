/* eslint-env mocha */
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var tmp = path.join(__dirname, 'tmp');

beforeEach(function (cb) {
	mkdirp(tmp, cb);
});

afterEach(function (cb) {
	rimraf(tmp, {disableGlob: true}, cb);
});

it('rebuild the zopflipng binaries', function (cb) {
	this.timeout(50000);

	new BinBuild()
		.src('https://github.com/google/zopfli/archive/zopfli-1.0.1.zip')
		.cmd('mkdir -p ' + tmp)
		.cmd('make zopflipng && mv ./zopflipng ' + path.join(tmp, 'zopflipng'))
		.run(function (err) {
			assert(!err);
			assert(fs.statSync(path.join(tmp, 'zopflipng')).isFile());
			cb();
		});
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../'), ['--help'], function (err, works) {
		assert(!err);
		assert(works);
		cb();
	});
});

it('minify a PNG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test.png');
	var args = [
		'--lossy_8bit',
		src,
		dest
	];

	execFile(require('../'), args, function (err) {
		assert(!err);

		compareSize(src, dest, function (err, res) {
			assert(!err);
			assert(res[dest] < res[src]);
			cb();
		});
	});
});
