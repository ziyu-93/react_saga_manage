/**
 * Created by 16bit_bzs on 2018/09/27
 */
import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { postObj } from './../api/promise_ajax';
import { QUERYTABLEDATA } from './../api/interface';
import { DEFAULT_DAILYDATA_QUERY_SUCCESS, DEFAULT_DAILYDATA_QUERY_FAIL, DEFAULT_DAILYDATA_QUERY_RESULT } from './../constants/index';


function* queryDailyList(action) {
    // console.log(action);
    try {
        let data = yield call(postObj, QUERYTABLEDATA, action.pageObj);
        data = Object.assign({}, JSON.parse(data), action);
        console.log(data);
        yield put({
            type: DEFAULT_DAILYDATA_QUERY_SUCCESS,
            data: data
        })
    } catch (e) {
        yield put({
            type: DEFAULT_DAILYDATA_QUERY_FAIL,
            message: e
        })
    }
}

function* takeEveryDailySaga() {
    yield* takeEvery(DEFAULT_DAILYDATA_QUERY_RESULT, queryDailyList);
}


export default takeEveryDailySaga;




