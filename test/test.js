'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the zopflipng binaries', function (t) {
	t.plan(2);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('https://zopfli.googlecode.com/archive/' + version + '.tar.gz')
		.cmd('mkdir -p ' + tmp)
		.cmd('make zopflipng && mv ./zopflipng ' + path.join(tmp, 'zopflipng'));

	builder.run(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'zopflipng'), function (exists) {
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--help'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a PNG', function (t) {
	t.plan(4);

	var args = [
		'--lossy_8bit',
		path.join(__dirname, 'fixtures/test.png'),
		path.join(tmp, 'test.png')
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		fs.stat(path.join(__dirname, 'fixtures/test.png'), function (err, a) {
			t.assert(!err, err);

			fs.stat(path.join(tmp, 'test.png'), function (err, b) {
				t.assert(!err, err);
				t.assert(b.size < a.size);
			});
		});
	});
});
