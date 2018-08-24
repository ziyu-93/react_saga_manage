
const path = require('path');
const defaultConfig = require("./default");
const fs = require('fs');

module.exports = {
    devServer: {
        contentBase: './src',                   // 本地服务，默认打开文件路径
        historyApiFallback: true,               // 不跳转，用于应对返回404页面时，定向到特定页面用的
        host:'0.0.0.0',                         // 设置服务主机号，localhost:   or  0.0.0.0:  都可以访问
        hot:true,                               // 启动热更新
        port:defaultConfig.defaultPort,         // 默认启动端口号
        // inline:true,                            // 启动自动刷新
        compress:false,                         // 设置为true 则会采用gzip 压缩，
                                                // 优点是，提高对js，css压缩率，提升文件传输。
                                                // 缺点是服务端对文件压缩，客户端要进行解压，增加了两边的负载。
        overlay:{                               // 在浏览器输出编译错误。
            wranings:true,
            errors:true
        },
        stats:'errors-only',                    // 配置在 shell 上输出的内容。
        // open:true                            // 设置是否，在启动时直接打开
        proxy:{                                 // 设置重定向，是解决跨越的好办法
            '/sunland_data/*': {
                target: 'http://172.16.51.252', /*本地 apache */
            }
        },
        publicPath:defaultConfig.publicPath,    // 输出文件，路径。（ 编译后的文件路径 ）

        // 这部分，是要用到 express node 中的一些中间件，在开启服务器之前，提前加载 vendor 文件
        before(app){                            // 提供在服务器内部，所有其他中间件之前，执行自定义中间件的，能力
            app.get('/assets/dll.vendor.js',(req,res)=>{
                res.send(fs.readFileSync(path.join(__dirname,"../dist/assets/dll.vendor.js"),'utf8'))
            })
        }
    }
}