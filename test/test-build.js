'use strict';

var assert = require('assert');
var Bin = require('bin-wrapper');
var fs = require('fs');
var options = require('../lib/zopflipng').options;
var path = require('path');

describe('zopflipng.build()', function () {
  it('should rebuild the zopflipng binaries', function (cb) {
    this.timeout(false);
    var bin = new Bin(options);

    bin.path = path.join(__dirname, '../tmp', bin.bin);
    bin.buildScript = 'make zopflipng && mv zopflipng ' + path.join(__dirname, '../vendor');

    bin.build(function () {
      var origCTime = fs.statSync(bin.path).ctime;
      var actualCTime = fs.statSync(bin.path).ctime;

      assert(actualCTime !== origCTime);
      cb();
    });
  });
});