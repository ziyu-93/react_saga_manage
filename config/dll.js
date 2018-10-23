const path = require('path');
const webpack = require('webpack');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-saga', 'redux-actions', 'reselect', 'classnames'];
// const vendor = ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-saga', 'redux-actions', 'reselect', 'classnames', 'antd'];
const dllConfig = Object.assign({}, {
    mode: 'production', // webpack 4+ 需要写 mode : production or development 
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        vendor
        // reduxObj
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
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        })
    ]
})


module.exports = dllConfig;