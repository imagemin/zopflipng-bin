#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var zopflipng = require('./');
var input = process.argv.slice(2);

spawn(zopflipng, input, {stdio: 'inherit'})
	.on('exit', process.exit);
