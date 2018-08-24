import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { LEFTMENU_RESULT, LEFTMENU } from './../constants/index';

function* queryRightCont(actions) {
    // console.log(actions);
    yield put({
        type: LEFTMENU,
        data: actions.leftMenuFlag
    })
}

function* rightContSaga() {
    yield* takeEvery(LEFTMENU_RESULT, queryRightCont)
}

export default rightContSaga

