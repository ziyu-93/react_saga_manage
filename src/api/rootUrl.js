/**
 * @param {String} env 
 * return RootURL
 */
const rootFn = env => {
    const rootUrl = env == 'dev' ? '//172.16.117.43:8686/d/api' : '//16bit.sunland.com/p/api';
    // const rootUrl = env == 'dev' ? '//172.16.50.41:8686/d/api' : '//16bit.sunland.com/p/api';
    return rootUrl;
}

export default rootFn;