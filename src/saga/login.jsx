import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { LOGIN } from './../api/interface';
import { postObj } from './../api/promise_ajax';
import { LOGIN_FAIL, LOGIN_RESULT, LOGIN_SUCCESS } from './../constants/index';

function* login(actions) {
    console.log(actions);
    try {
        let data = yield call(postObj, LOGIN, actions.params);
        data = JSON.parse(data);
        if (data.code == 200) {
            console.log(JSON.stringify(actions.params))
            localStorage.setItem('user', JSON.stringify(actions.params));
            yield put({
                type: LOGIN_SUCCESS,
                userInfo: actions.params
            })
        } else {
            yield put({
                type: LOGIN_FAIL,
                message: data.message
            })
        }
    } catch (e) {
        yield put({
            type: LOGIN_FAIL,
            message: '账号密码，提交失败'
        })
    }

}

function* loginHandleSaga() {
    yield* takeEvery(LOGIN_RESULT, login);
}

export default loginHandleSaga;