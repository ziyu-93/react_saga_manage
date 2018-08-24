
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultConfig = require('./default');

// 不写这个会报错 ---> Error: [HMR] Hot Module Replacement is disabled
const plugins = defaultConfig.getDefaultPlugins().concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"deve"'
    })
])

const modules = defaultConfig.getDefaultModules();
modules.rules = modules.rules.concat([
    {
        test: /\.(js|jsx)$/,
        use: [
            {
                loader: 'babel-loader',
            }
        ],
        include: [path.join(__dirname, '../src')]
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    },
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
            'less-loader'
        ],
        include: [path.join(__dirname, '../src')],
    },
    {
        test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader",
            options: {
                javascriptEnabled: true
                // less 3.0+ 需要加这一段 
                // 报错：https://github.com/ant-design/ant-motion/issues/44   
                // .bezierEasingMixin();
                // JavaScript is not enabled
            }
        }],
        include: [path.join(__dirname, '../node_modules')],
    }
])

const deveConfig = Object.assign({}, baseConfig, {
    mode: 'development',  // 环境，需要配置 mode 。development or production 
    entry: {
        index: [
            'webpack-dev-server/client?http://0.0.0.0:' + defaultConfig.defaultPort,
            'webpack/hot/only-dev-server',
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, './../dist'),
        filename: '[name].js',
        publicPath: `.${defaultConfig.publicPath}`
    },
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    plugins,
    module: modules,
    resolve: {
        extensions: ['.js', '.jsx']           // 自动解决扩展名
    }
})

module.exports = deveConfig;