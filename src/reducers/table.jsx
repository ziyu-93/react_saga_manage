import { handleActions } from 'redux-actions';
import * as Constants from './../constants/index';
import { Modal } from 'antd';

export default handleActions({
    [Constants.DEFAULTQUERY_SUCCESS](state, actions) {
        // console.log(actions);
        return {
            ...state,
            defaultList: actions.data
        }
    },
    [Constants.DEFAULTQUERY_FAIL](state, actions) {
        console.log(actions);
        Modal.error({
            title: '错误提示',
            content: actions.message
        })
        return state
    }
}, {
        defaultList: {}
    })

