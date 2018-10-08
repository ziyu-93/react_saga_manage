import React, { Component } from "react";
import classname from './index.less';
import { DEFAULTQUERY_RESULT } from './../../../constants';
import { getForm } from './../../../api/promise_ajax';
import path from 'path';
import { Spin, Drawer } from 'antd';

export default class Default extends Component {

    constructor(...arg) {
        super(...arg);
        this.state = {
            updataList: [],
            itemValue: null,
            itemCont: {
                title: "",
                content: ""
            },
            visible: false
        }
    }

    componentWillMount() {
        console.log('load')
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const that = this;
        getForm('http://127.0.0.1/sunland_data/default.json?132').then((res) => {
            let data = JSON.parse(res).data;
            let arr = []
            for (let i in data) {
                arr = data[i].content.split('\n');
                data[i].content = arr;
            }
            console.log(data);
            that.setState({
                updataList: data
            })
        })
    }

    shouldComponentUpdate(prevProps, nextState) {
        // console.log(prevProps);
        // console.log(nextState.updataList != this.state.updataList);
        if (nextState.updataList !== [] && nextState.updataList != this.state.updataList) {
            return true;
        } else if (nextState.itemValue !== null) {
            return true;
        }
    }

    handleClick(e) {
        const { updataList } = this.state;
        const itemCont = updataList[e];
        const self = this;
        this.setState({
            itemValue: e,
            itemCont
        }, () => {
            self.onClick();
        })
    }

    onClick = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { updataList, itemValue, itemCont, visible } = this.state;
        return (
            <div className={classname['content']}>
                <h1 className={classname['title']}>自考王者版本更新时间轴</h1>
                <Drawer
                    title={itemCont.title}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                >
                    <div>
                        <p style={{ color: 'red' }}>{itemCont.time}</p>
                        {
                            itemCont.content ? itemCont.content.map((e, i) => {
                                return <p key={i}>{e}</p>
                            }) : ""
                        }
                    </div>
                </Drawer>
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