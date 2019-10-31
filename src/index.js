var path= require("path");
var Transform = require('readable-stream/transform');
module.exports = function(option) {
    var mainJs = option.mainJs || 'main.js';
    var pathConfig = {};
    var mainFile;
    return new Transform({
        objectMode: true,
        transform: function (file, enc, callback) {
            var fileName = path.basename(file.path);
            if (fileName !== mainJs) {
                const relativePath = path.relative(option.sourceDir, file.path);
                const touchModuleId = file.contents.toString().match(/define\(["']([0-9a-zA-Z@_\-/]+)["']/g);
                const bundlePath = option.deloyDir + relativePath.replace(/.js$/, '');
                touchModuleId.map((item) => {
                    const moduleId = item.replace(/^define\("/,'').replace(/"$/,'');
                    pathConfig[moduleId] = bundlePath;
                })
            }
            else {
                mainFile = file;
            }
            callback(null, file);
        },
        flush: function (callback) {
            var finalConfig = 'require.config({paths:' + JSON.stringify(pathConfig) + '});\n';
            mainFile.contents = new Buffer(finalConfig + mainFile.contents.toString());
            this.push(mainFile);
            callback();
        },
    });
}
