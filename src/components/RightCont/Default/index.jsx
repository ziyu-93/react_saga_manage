import React, { Component } from "react";
import classname from './index.less';
import { DEFAULTQUERY_RESULT } from './../../../constants';
import { getForm } from './../../../api/promise_ajax';
import path from 'path';
import { Spin } from 'antd';

export default class Default extends Component {

    constructor(...arg) {
        super(...arg);
        this.state = {
            updataList: [],
            itemValue: null
        }
    }

    componentWillMount() {
        console.log('load')
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const that = this;
        getForm('http://172.16.48.154/sunland_data/default.json?12').then((res) => {
            console.log(JSON.parse(res));
            setTimeout(() => {
                that.setState({
                    updataList: JSON.parse(res).data
                })
            }, 1000);
        })
    }

    shouldComponentUpdate(prevProps, nextState) {
        console.log(nextState);
        if (nextState.updataList !== [] && nextState.updataList != this.state.updataList) {
            return true;
        } else if (nextState.itemValue !== null) {
            return true;
        }
    }

    handleClick(e) {
        this.setState({
            itemValue: e
        })
    }

    render() {
        const { updataList, itemValue } = this.state;
        return (
            <div className={classname['content']}>
                <h1 className={classname['title']}>自考王者版本更新时间轴</h1>
                {
                    updataList.length > 0 ?
                        <div className={classname['main']}>
                            {
                                updataList.map((k, v) => {
                                    return <div className={classname['main_item']}>
                                        <div className={classname['circular']}></div>
                                        <div ref={`item${v}`} className={`${classname[itemValue != undefined && itemValue == v && v % 2 == 1 ? 'item_animationRight' : itemValue != undefined && itemValue == v && v % 2 == 0 ? 'item_animationLeft' : 'item']} ${classname['item']}`} key={v} onClick={() => this.handleClick(v)}>
                                            <h3>{k.title}</h3>
                                            <span className={classname['item_time']}>{k.time}</span>
                                            <div className={classname['item_cont']}>{k.content}</div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        : <Spin size="large" />
                }
            </div>
        )
    }
}