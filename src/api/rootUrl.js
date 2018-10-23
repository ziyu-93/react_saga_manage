/**
 * @param {String} env 
 * return RootURL
 */

const rootFn = env => {
    const rootUrl = process.env.NODE_ENV == 'deve' ? '//172.16.50.41:8686/d/api' : '//172.16.117.43:8686/d/api';
    return rootUrl;
}

export default rootFn;