const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultConfig = require('./default');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 不写这个会报错 ---> Error: [HMR] Hot Module Replacement is disabled
const plugins = defaultConfig.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: '../index.html',
    }),
    new ExtractTextPlugin('[name].css'),
    new AddAssetHtmlPlugin([{
        filepath: path.join(__dirname, "/../dist/assets/dll.vendor.js"),
        hash: true,
        includeSourcemap: false
    }]),
    new webpack.DllReferencePlugin({
        context: path.join(__dirname, "/../dist/"),
        manifest: require("../dist/assets/vendor-manifest.json")
    })
])

const modules = defaultConfig.getDefaultModules()

modules.rules = modules.rules.concat([{
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'babel-loader',
        }, ],
        include: [path.join(__dirname, '/../src')],
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
            publicPath: './',
        }),
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]', 'less-loader'],
            publicPath: './',
        }),
        include: [path.join(__dirname, '../src')],
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader",
                options: {
                    javascriptEnabled: true
                }
            }],
            publicPath: './',
        }),
        include: [path.join(__dirname, '../node_modules')],
    }
])


const config = Object.assign({}, baseConfig, {
    mode: "production",
    entry: {
        index: [
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, './../dist/assets'),
        filename: '[name].js',
        publicPath: `.${defaultConfig.publicPath}`
    },
    cache: false,
    devtool: 'cheap-module-source-map',
    plugins,
    module: modules,
    resolve: {
        extensions: ['.js', '.jsx'] // 自动解决扩展名
    }
})

module.exports = config