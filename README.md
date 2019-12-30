# gulp-add-require-config
解析打包后文件中所有模块的moduleID, 生成config后插到入口文件(mainJS)的头部

## Install

```bash
npm i gulp-add-require-config --save-dev
```

## example
```bash
const addRequireConfig = require('gulp-add-require-config');

gulp.src(['src/static/**/*.js'])
.pipe(
    addRequireConfig({
        // 指向入口文件
        mainJs: 'main.js',
        baseUrl: 'xxx',
        // 文件部署路径
        deloyDir: '//xxx/xxx/',
        sourceDir: path.resolve('src')
    })
)
.pipe(gulp.dest('dist'))
```
// before 

// bundle_xxxxxxx.js
```bash
define("test/a_556240b",["require","exports"],function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.init=function(e){console.log(e,"执行了")}});
define("test/b_fd483c4",["require","exports"],function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.b=function(e){console.log(e,"执行了")}});
```
// main.js
```bash
import { a } from './a';
import { b } from './b';
export default class test {
    constructor () {
        a(page, 'init');
        b(page, 'ready'); 
    }
}
```

// after
```bash
require.config({baseUrl:'xxx',paths:{"test/a_556240b":"//xxx/xx/assert/bundle_xxxxxxx","test/b_fd483c4":"//xxx/xx/assert/bundle_xxxxxxx"}});
import { a } from './a';
import { b } from './b';
export default class test {
    constructor () {
        a(page, 'init');
        b(page, 'ready'); 
    }
}
```
