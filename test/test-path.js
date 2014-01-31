'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

describe('zopflipng()', function () {
  this.timeout(0);

  after(function () {
    fs.unlinkSync('test/fixtures/minified.png');
  });

  it('should return path to zopflipng binary', function (callback) {
    var binPath = require('../lib/zopflipng').path;

    execFile(binPath, ['-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('ZopfliPNG') !== -1);
      callback();
    });
  });

  it('should successfully proxy zopflipng', function (callback) {
    var binPath = path.join(__dirname, '../bin/zopflipng.js');

    execFile('node', [binPath, '-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('ZopfliPNG') !== -1);
      callback();
    });
  });

  it('should minify a .png', function (callback) {
    var binPath = path.join(__dirname, '../bin/zopflipng.js');
    var args = [
      //'-m',
      //'-y',
      //'--iterations=500',
      //'--splitting=3',
      //'--filters=01234mepb',
      //'--lossy_8bit',
      //'--lossy_transparent',
      path.join(__dirname, 'fixtures', 'test.png'),
      path.join(__dirname, 'fixtures', 'minified.png')
    ];

    exec('node ' + [binPath].concat(args).join(' '), function () {
      var actual = fs.statSync('test/fixtures/minified.png').size;
      var original = fs.statSync('test/fixtures/test.png').size;

      assert(actual < original);
      callback();
    });
  });
});