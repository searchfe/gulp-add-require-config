"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var Transform = require('readable-stream').Transform;
/** 解析所有文件的moduleID, 生成config后插到入口文件的头部 */
function addRequireConfig(option) {
    var mainJs = option.mainJs || 'main.js';
    var pathConfig = {};
    var mainFile;
    return new Transform({
        objectMode: true,
        // 从每个文件中读取moduleId, 保存到pathConfig对象中。
        transform: function (file, enc, callback) {
            var fileName = path_1.basename(file.path);
            if (fileName !== mainJs) {
                var relativePath = path_1.relative(option.sourceDir, file.path);
                var touchModuleId = file.contents.toString().match(/define\(["']([0-9a-zA-Z@_\-/]+)["']/g);
                var bundlePath_1 = option.deloyDir + relativePath.replace(/.js$/, '');
                touchModuleId.map(function (item) {
                    var moduleId = item.replace(/^define\("/, '').replace(/"$/, '');
                    pathConfig[moduleId] = bundlePath_1;
                });
            }
            else {
                mainFile = file;
            }
            callback(null, file);
        },
        // 将pathConfig对象中的moduleId打印成config文件，塞入主文件main.js
        flush: function (callback) {
            var finalConfig = 'require.config({paths:' + JSON.stringify(pathConfig) + '});\n';
            mainFile.contents = Buffer.from(finalConfig + mainFile.contents.toString());
            this.push(mainFile);
            callback();
        }
    });
}
exports.addRequireConfig = addRequireConfig;
