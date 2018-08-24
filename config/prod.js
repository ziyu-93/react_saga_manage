const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultConfig = require('./default');


// 不写这个会报错 ---> Error: [HMR] Hot Module Replacement is disabled
const plugins = defaultConfig.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    })
])