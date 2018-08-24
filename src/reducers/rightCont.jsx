
// 普通的 reducer 在接收 dispatch 的时候，会得到所有的 actions 然后进行分配执行。
// 由于用了 saga 所以不能用原生的 reducer 来构建其中一个的 dispatch 执行

// function leftMenuReducer(state, action) {
//     // console.log(state); 上一次的值
//     console.log(action);
//     return action.type == 'LEFTMENU' ? action.leftMenuFlag : '';
// }

// export default leftMenuReducer;

import { handleActions } from 'redux-actions';
import { LEFTMENU } from './../constants/index';

export default handleActions({
    [LEFTMENU](state, actions) {
        // console.log(actions);
        return {
            leftMenuReducer: actions.leftMenuFlag
        }
    }
},
    {
        leftMenuReducer: false
    })
