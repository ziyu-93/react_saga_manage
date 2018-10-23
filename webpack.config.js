const path = require("path");
const args = require('minimist')(process.argv.slice(2)); // minimist 一种解析引擎
const argsArr = ['dll', 'deve', 'prod'];

let env = '';
// if (args._.length > 0 && args._.indexOf('start') !== -1) {
//     env = 'test';
// } else 
if (args.env) {
    env = args.env;
} else {
    env = 'deve';
}

process.env.REACT_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Objecy} Webpack config
 */

const buildConfig = wantedEnv => {
    const isValid = wantedEnv && argsArr.indexOf(wantedEnv) !== -1;
    const validEnv = isValid ? wantedEnv : 'deve';
    const config = require(path.join(__dirname, 'config/' + validEnv));
    return config;
}
module.exports = buildConfig(env);