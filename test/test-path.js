'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');

describe('zopflipng()', function () {
  after(function () {
    fs.unlinkSync('test/fixtures/minified.png');
  });

  it('should return path to zopflipng binary', function (cb) {
    var binPath = require('../lib/zopflipng').path;

    execFile(binPath, ['-v', '-'], function (err, stdout, stderr) {
      assert(stderr.toString().indexOf('zopflipng') !== -1);
      cb();
    });
  });

  it('should successfully proxy zopflipng', function (cb) {
    var binPath = path.join(__dirname, '../bin/zopflipng.js');

    execFile('node', [binPath, '-v', '-'], function (err, stdout, stderr) {
      assert(stderr.toString().indexOf('zopflipng') !== -1);
      cb();
    });
  });

  it('should minify a .png', function (cb) {
    var binPath = path.join(__dirname, '../bin/zopflipng.js');
    var args = [
      '-m',
      '--iterations=500',
      '--splitting=3',
      '--filters=01234mepb',
      '--lossy_8bit',
      '--lossy_transparent',
      path.join(__dirname, 'fixtures', 'test.png'),
      path.join(__dirname, 'fixtures', 'minified.png')
    ];

    execFile('node', [binPath].concat(args), function () {
      var actual = fs.statSync('test/fixtures/minified.png').size;
      var original = fs.statSync('test/fixtures/test.png').size;

      assert(actual < original);
      cb();
    });
  });
});