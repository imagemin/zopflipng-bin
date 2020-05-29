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

	const temporary = tempy.directory();

	await binBuild.url('https://github.com/google/zopfli/archive/zopfli-1.0.3.zip', [
		`mkdir -p ${temporary}`,
		`make zopflipng && mv ./zopflipng ${path.join(temporary, 'zopflipng')}`
	]);

	t.true(fs.existsSync(path.join(temporary, 'zopflipng')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(require('..'), ['--help']));
});

test('minify a PNG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(temporary, 'test.png');
	const args = [
		'--lossy_8bit',
		src,
		dest
	];

	await execa(require('..'), args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
