import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.github.com/imagemin/zopflipng-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}osx/zopflipng`, 'darwin')
	.src(`${url}linux/zopflipng`, 'linux')
	.src(`${url}win32/zopflipng.exe`, 'win32')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'zopflipng.exe' : 'zopflipng');

export default binWrapper;
