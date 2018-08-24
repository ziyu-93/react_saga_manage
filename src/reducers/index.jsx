// Use require.context to require reducers automatically
// Ref: https://webpack.github.io/docs/context.html

// require.context('directory', useSubdirectories, regExp );
// 1、引入的文件目录。 2、是否查找该目录下的子级。 3、正则匹配要引入的文件
// require.context 返回一个 require 函数 ，有三个属性， resolve 、keys、id


const context = require.context('./', false, /\.jsx$/);

const keys = context.keys().filter(item => item !== './index.jsx');

const reducers = keys.reduce((memo, key) => {

    // console.log(context(key));
    
    memo[key.match(/([^\/]+)\.jsx$/)[1]] = context(key).default;
    
    return memo;

}, {});

export default reducers;
