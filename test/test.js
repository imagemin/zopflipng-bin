/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('zopflipng()', function () {
  afterEach(function (cb) {
    rm(path.join(__dirname, 'tmp'), cb);
  });

  beforeEach(function (cb) {
    fs.mkdir(path.join(__dirname, 'tmp'), cb);
  });

  it('should rebuild the zopfli binaries', function (cb) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('https://zopfli.googlecode.com/archive/b87006baae7ddb2142660621e20916d07928cbe2.tar.gz')
      .cmd('make zopflipng && mkdir -p ' + tmp + ' && mv ./zopflipng ' + path.join(tmp, 'zopflipng'));

    builder.build(function (err) {
      assert(!err);
      assert(fs.existsSync(path.join(tmp, 'zopflipng')));
      cb();
    });
  });

  it('should return path to binary and verify that it is working', function (cb) {
    var binPath = require('../').path;

    binCheck(binPath, ['--version'], function (err, works) {
      assert(!err);
      assert.equal(works, true);
      cb();
    });
  });

  it('should minify a PNG', function (cb) {
    var binPath = require('../').path;
    var args = [
      '--lossy_8bit',
      path.join(__dirname, 'fixtures/test.png'),
      path.join(__dirname, 'tmp/test.png')
    ];

    execFile(binPath, args, function (err) {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.png')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.png')).size;

      assert(!err);
      assert(dest < src);
      cb();
    });
  });
});
