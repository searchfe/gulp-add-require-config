import { readFileSync } from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';
import { addRequireConfig } from '../src/addRequireConfig';

describe('addRequireConfig Test', () => {
    it('addRequireConfig', () => {
        const file = `${__dirname}\/dist\/bundle_xxxxxxx.js`;
        var p = new Promise((resolve) => {
            gulp.src(`${__dirname}\/assert/*.js`)
            .pipe(
                addRequireConfig({
                    mainJs: 'main.js',
                    baseUrl: 'xxx',
                    deloyDir: '//xxx/xx/',
                    sourceDir: path.resolve('test')
                })
            )
            .pipe(
                gulp.dest(`${__dirname}\/dist\/`)
            ).on('end',
                () => {
                    const code = readFileSync(file).toString();
                    resolve(code)
                }
            );
        });
    });
});
