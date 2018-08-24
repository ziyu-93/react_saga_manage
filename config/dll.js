
const path = require('path');
const webpack = require('webpack');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-saga', 'reselect', 'antd', 'classnames', 'redux-actions'];

const dllConfig = Object.assign({}, {
    mode: 'production',             // webpack 4+ 需要写 mode : production or development  
                                    // 也需要下载一个插件 webpack-cli  or  webpack-command
    // optimization: {              // 这部分的，是想整合重复代码，提取重复，打入新包
    //     splitChunks: {           
    //         chunks: 'all'
    //     }
    // },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        vendor
    },
    output: {
        path: path.join(__dirname, '/../dist/assets/'),
        filename: "dll.[name].js",
        library: "[name]_[chunkhash]"
    },
    plugins: [
        // 这部分，设置环境变量，好像没什么用，deve 和 prod 都用的上
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"',
        // }),
        new uglifyjsWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, "/../dist/assets/", "[name]-manifest.json"),
            name: '[name]_[chunkhash]',
            context: path.join(__dirname, "/../dist/"),
        })
    ]
})


module.exports = dllConfig;