/**
 * @param {String} env 
 * return RootURL
 */
const rootFn = env => {
    // rootUrl = env == 'dev' ? '//16bit.sunland.com/d/api/' : '//16bit.sunland.com/p/api/';
    const rootUrl = env == 'dev' ? '//127.0.0.1:3000/d/api' : '//16bit.sunland.com/p/api';
    return rootUrl;
}

export default rootFn;