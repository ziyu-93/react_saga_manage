'use strict';

const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const config = require('./webpack.config');
const open = require('open');
console.log('-------------- webServer ----------------');
new webpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.port, config.devServer.host, (err) => {
        if (err) console.log(err);
        console.log('open system browser...');
        console.log('Listening at localhost:' + config.devServer.port);

        open('http://localhost:' + config.devServer.port, () => {
            console.log('-------------- open ----------------');
            console.log("open success...");
        });
    })
