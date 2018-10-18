const copyfiles = require('copyfiles');

//拷贝图片到根目录dist目录下，能够递归拷贝
copyfiles(['./src/images/**', './dist'], 1, () => {console.log('图片已拷贝到dist目录！')});