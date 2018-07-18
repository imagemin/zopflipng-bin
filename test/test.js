'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');

test('rebuild the zopflipng binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const tmp = tempy.directory();

	await binBuild.url('https://github.com/google/zopfli/archive/a29e46ba9f268ab273903558dcb7ac13b9fe8e29.zip', [
		`mkdir -p ${tmp}`,
		`make zopflipng && mv ./zopflipng ${path.join(tmp, 'zopflipng')}`
	])
		.then(() => t.true(fs.existsSync(path.join(tmp, 'zopflipng'))));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(require('..'), ['--help']));
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'--lossy_8bit',
		src,
		dest
	];

	await execa(require('..'), args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
