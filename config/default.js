const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, '/../src');
const defaultPort = 8888;
const publicPath = '/assets/';
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const getDefaultModules = () => {
    return {
        rules: [
            // 图片字体
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },

            // 视频资源
            {
                test: /\.(mp4|ogg)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    }
}

const getDefaultPlugins = () => [
    new webpack.NoEmitOnErrorsPlugin(), //热更相关插件
    new uglifyjsWebpackPlugin(),
    new webpack.DllReferencePlugin({
        context: path.join(__dirname, "/../dist/"),
        manifest: require("../dist/assets/vendor-manifest.json")
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
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery'
    // }) 
]

module.exports = {
    srcPath,
    defaultPort,
    publicPath,
    getDefaultModules,
    getDefaultPlugins,
}