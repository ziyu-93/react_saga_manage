import { handleActions } from 'redux-actions';
import * as Constants from './../constants/index';
import { Modal } from 'antd';

export default handleActions({
    [Constants.DEFAULT_DAILYDATA_QUERY_SUCCESS](state, actions) {
        // console.log(actions);
        return {
            ...state,
            dailyDataList: actions.data
        }
    },
    [Constants.DEFAULT_DAILYDATA_QUERY_FAIL](state, actions) {
        console.log(actions);
        Modal.error({
            title: '错误提示',
            content: actions.message
        })
        return state
    }
}, {
        dailyDataList: {}
    })

