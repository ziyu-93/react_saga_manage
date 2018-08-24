

import { message } from 'antd';

const sysSuccess = (str) => {
    return message.success(str);
}

const sysError = (str) => {
    return message.error(str);
}

const sysWarning = (str) => {
    return message.warning(str);
}

export {
    sysSuccess,
    sysError,
    sysWarning
}