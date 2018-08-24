import 'antd/dist/antd.less';
import './less/antd_changeStyle.less';

// import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from "react";
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import saga from './saga/index';

// import leftMenuReducer from './reducers/leftMenu';
import reducers from './reducers/index';
import ContRouter from "./router/index";


// 建立 saga middleware
const sagaMiddleware = [createSagaMiddleware()];
const enhancer = compose(
    // saga 中间件绑定
    applyMiddleware(...sagaMiddleware)
)

// saga middleware and reducers combine 
const initialState = {};
const store = createStore(
    combineReducers({
        ...reducers,
        // leftMenuReducer,
        //  routing : routerReducer 这个位置的效果，还没明确  
        routing
    }),
    initialState,
    enhancer
)
console.log(process.env.NODE_ENV);
sagaMiddleware[0].run(saga);
// react-router 4.0 以前用这个 给 Router 绑定history
// const history = syncHistoryWithStore(BrowserRouter, store);
const ele = document.getElementById("app");
ReactDom.render(
    <BrowserRouter >
        <Provider store={store}>
            <ContRouter />
        </Provider>
    </BrowserRouter>
    , ele
)

if (module.hot) {
    module.hot.accept();  //  webpack-server-dev  hot:true  &&  module.hot.accept()
}