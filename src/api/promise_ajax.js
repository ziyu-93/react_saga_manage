/**
 * promise_ajax module
 * author: 16bit_bzs
 * @param {String} URL 
 * @param {Object} PARAMS 
 * @param {String} AJAXMETUOD
 * @param {String,Object} PARAMSMETHOD
 * return Promise 
 */

const promise_ajax = (URL, PARAMS = {}, AJAXMETUOD = 'GET', PARAMSMETHOD) => {

    return new Promise((resolve, reject) => {

        let xml = undefined;

        if (window.XMLHttpRequest) {

            xml = new XMLHttpRequest();

        } else {

            xml = new ActiveXObject("Microsoft.XMLHttpRequest");

        }

        if (!xml) throw new Error('xml can`t be used');

        URL += AJAXMETUOD == 'GET' ? '?' + objToStr(PARAMS) : '';

        xml.open(AJAXMETUOD, URL);

        xml.onerror = () => reject('something is wrong, please check...'); // 接口请求失败，promise reject 返回内容

        xml.onreadystatechange = () => {

            if (xml.status == 404) {

                reject(xml); // 这个位置 reject 的内容，需要与后端沟通

            }

            if (xml.readyState == 4 && xml.status == 200) {

                resolve(xml.responseText);

            }

        }

        if (AJAXMETUOD == 'POST' && PARAMSMETHOD !== 'form') {

            xml.setRequestHeader("Content-type", "application/json");

            PARAMS = JSON.stringify(PARAMS);

            xml.send(PARAMS);

        } else if (AJAXMETUOD == 'POST' && PARAMSMETHOD == 'form') {

            xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xml.send(objToStr(PARAMS));

        } else {

            xml.send();

        }
    })
}

const objToStr = (PARAMS) => {

    let strParams = '';

    for (let i in PARAMS) {

        strParams += i + '=' + PARAMS[i] + '&'

    }

    strParams = strParams.slice(0, -1);

    return strParams;

}

const postForm = (URL, PARAMS) => {
    return promise_ajax(URL, PARAMS, 'POST', 'form');
}

const postObj = (URL, PARAMS = {}) => {
    return promise_ajax(URL, PARAMS, 'POST', {});
}

const getForm = (URL, PARAMS) => {
    return promise_ajax(URL, PARAMS, 'GET');
}

export {
    postForm,
    postObj,
    getForm
}