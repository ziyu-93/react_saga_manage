
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// React 中间件，意在解决的问题是，在state 发生变化的时候，如何减少渲染的压力，使用了缓存机制
import { createSelector } from 'reselect';

import LeftMenu from './../../components/LeftMenu';

const getState = state => {
    return state.rightCont;
}

const selectors = createSelector(  // 创建记忆 selectors 接受两个参数，对 state 进行对比，如果没变化，就直接返回原 state
    [getState],                    // 一个是，input-selectors  
    (state) => {                   // 一个是，变换函数
        return state;
    }
)

// 没写 withRouter 地址改变了，content 改变了。 navLink 没有随着地址改变，而发生变化
// withRouter 提供了 {match ,location , history}  三个对象

export default withRouter(connect(selectors)(LeftMenu));