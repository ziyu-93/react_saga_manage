/**
 * Created by 16bit_bzs on 2018/08/21
 */
import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { postObj } from './../api/promise_ajax';
import { QUERYTABLEDATA } from './../api/interface';
import { DEFAULTQUERY_SUCCESS, DEFAULTQUERY_FAIL, DEFAULTQUERY_RESULT } from './../constants/index';


function* queryTableList(action) {
    // console.log(action);
    try {
        let data = yield call(postObj, QUERYTABLEDATA, action.pageObj);
        data = Object.assign({}, JSON.parse(data), action);
        // console.log(data);
        yield put({
            type: DEFAULTQUERY_SUCCESS,
            data: data
        })
    } catch (e) {
        yield put({
            type: DEFAULTQUERY_FAIL,
            message: e
        })
    }
}

function* takeEveryTableSaga() {
    yield* takeEvery(DEFAULTQUERY_RESULT, queryTableList);
}


export default takeEveryTableSaga;




