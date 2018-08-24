import { handleActions } from 'redux-actions';
import { LOGIN_FAIL, LOGIN_SUCCESS } from './../constants/index';
import { Modal } from 'antd';

export default handleActions({
    [LOGIN_SUCCESS](state, actions) {
        console.log(actions);
        return {
            ...state,
            userInfo: actions.userInfo
        }
    },
    [LOGIN_FAIL](state, actions) {
        console.log(actions);
        Modal.error({
            title: '提示',
            content: actions.message
        })
        return state
    }
}, {
        userInfo: {}
    })