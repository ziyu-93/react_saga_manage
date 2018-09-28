import React, { Component } from "react";
import className from './index.less';
import { Table, Pagination, Icon } from 'antd';
import { QUERYDAILYDATA } from './../../../api/interface';
import { getForm, postObj } from './../../../api/promise_ajax';
import { DEFAULT_DAILYDATA_QUERY_RESULT } from './../../../constants/index';


export default class Dailydata extends Component {
    constructor(...arg) {
        super(...arg);

        this.state = {
            userList: [{
                currTime: '2018-09-26',
                new_getIn: 552,
                new_answer: 394,
                new_info: 120,
                new_phone: 279,
                new_answerNum: 13858,
                new_answerPer: 301,
                new_sunlandPhone: 72,
                new_sunlandInfo: 72,
                new_sunlandAnswerPer: 65,
                new_sunlandAnswerNum: 8484,
                new_noSunlandPhone: 207,
                new_noSunlandInfo: 48,
                new_noSunlandAnswerPer: 236,
                new_noSunlandAnswerNum: 5374,
                all_answerNum: 104099,
                all_answerPer: 1704,
                all_sunlandAnswerNum: 77862,
                all_noSunlandAnswerNum: 26237,
                all_sunlandAnswerPer: 1085,
                all_noSunlandAnswerPer: 619
            }],
            total: null,
            pageObj: {
                current: 1,
                pageSize: 7
            },
            dateArr: []
        }

        this.columns = [
            {
                title: "日期",
                dataIndex: "currTime",
                fixed: 'left'
            },
            {
                title: "新用户相关",
                dataIndex: "nickname",
                children: [{
                    title: "新总用户",
                    children: [{
                        title: '进入',
                        dataIndex: "new_getIn"
                    }, {
                        title: '新手题目',
                        dataIndex: "new_answer"
                    }, {
                        title: '微信授权',
                        dataIndex: "new_info"
                    }, {
                        title: '手机号',
                        dataIndex: "new_phone"
                    }, {
                        title: '答题人数',
                        dataIndex: "new_answerPer"
                    }, {
                        title: '答题数',
                        dataIndex: "new_answerNum"
                    }]
                }, {
                    title: '付费用户',
                    children: [{
                        title: '手机号',
                        dataIndex: "new_sunlandPhone"
                    }, {
                        title: '微信授权',
                        dataIndex: "new_sunlandInfo"
                    }, {
                        title: '答题人数',
                        dataIndex: "new_sunlandAnswerPer"
                    }, {
                        title: '答题数',
                        dataIndex: "new_sunlandAnswerNum"
                    }]
                }, {
                    title: '非付费用户',
                    children: [{
                        title: '手机号',
                        dataIndex: "new_noSunlandPhone"
                    }, {
                        title: '微信授权',
                        dataIndex: "new_noSunlandInfo"
                    }, {
                        title: '答题人数',
                        dataIndex: "new_noSunlandAnswerPer"
                    }, {
                        title: '答题数',
                        dataIndex: "new_noSunlandAnswerNum"
                    }]
                }]
            },
            {
                title: "老用户相关",
                dataIndex: "nickname",
                children: [{
                    title: "老总用户",
                    children: [{
                        title: '进入',
                        dataIndex: "date"
                    }, {
                        title: '微信授权',
                        dataIndex: "date"
                    }, {
                        title: '答题人数',
                        dataIndex: "all_answerPer"
                    }, {
                        title: '答题数',
                        dataIndex: "all_answerNum"
                    }]
                }, {
                    title: '付费用户',
                    children: [{
                        title: '手机号',
                        dataIndex: "date"
                    }, {
                        title: '微信授权',
                        dataIndex: "date"
                    }, {
                        title: '答题人数',
                        dataIndex: "all_sunlandAnswerPer",
                        render: (c, a) => {
                            return c - a.new_sunlandAnswerPer
                        }
                    }, {
                        title: '答题数',
                        dataIndex: "all_sunlandAnswerNum",
                        render: (c, a) => {
                            return c - a.new_sunlandAnswerNum
                        }
                    }]
                }, {
                    title: '非付费用户',
                    children: [{
                        title: '手机号',
                        dataIndex: "date"
                    }, {
                        title: '微信授权',
                        dataIndex: "date"
                    }, {
                        title: '答题人数',
                        dataIndex: "all_noSunlandAnswerPer",
                        render: (c, a) => {
                            return c - a.new_noSunlandAnswerPer
                        }
                    }, {
                        title: '答题数',
                        dataIndex: "all_noSunlandAnswerNum",
                        render: (c, a) => {
                            return c - a.new_noSunlandAnswerNum
                        }
                    }]
                }]
            },
        ]
    }

    componentWillMount() {
        console.log('first renader ');
        this.onGetCurrDate();
    }

    componentDidMount() {
        const { dailyDataList } = this.props;
        const { userList } = dailyDataList;
        userList ? console.log('已有数据') : this.onSerach();
    }

    shouldComponentUpdate(prevProps, nextState) {
        // console.log(nextState);
        if (nextState.pageObj.current !== this.state.pageObj.current) {
            return true;
        }
        if (nextState.userList != []) {
            return true;
        }
    }

    onSerach = (queryObj = {}) => {
        const _that = this;

        // for (let i = 0; i < dateArr.length; i++) {
        // 普通请求
        // postObj(QUERYDAILYDATA, { 'date': '2018-09-26' }).then((res) => {
        //     console.log(JSON.parse(res));
        //     const userList = JSON.parse(res);
        //     _that.setState({
        //         userList
        //     })
        // })
        // }


        // 连入了 redux-saga 为保存当前页面内容
        // let { pageObj } = this.state;
        // const { dispatch } = this.props;
        // pageObj = Object.assign({}, queryObj, pageObj);
        // dispatch({
        //     type: DEFAULT_DAILYDATA_QUERY_RESULT,
        //     pageObj
        // })
    }

    onChange = (e) => {
        let { pageObj } = this.state;
        pageObj.current = e;
        this.setState({
            pageObj
        })
        this.onSerach(pageObj);
    }

    onGetCurrDate = () => {
        const date = new Date();
        console.log(this.onHandleGetDate(date));
    }

    onFormatDate = date => {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    // 获取昨天日期
    onHandleGetDate = date => {
        let newDate = new Date(date - 24 * 3600 * 1000);
        this.onHandleGetDay(newDate);
        let y = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        let d = newDate.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    // 获取日期对应星期 => 显示一周
    onHandleGetDay(time) {
        let date = time.getDay();
        let dateArr = [];
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let j = 1;
        // 从星期一 ==> 星期日
        for (let i = 0; i < 7; i++) {
            if ((7 - date) != 7) {
                if (j <= date) {
                    let obj = {
                        'week': week[j],
                        'date': this.onFormatDate(new Date(time - (date - j) * 24 * 3600 * 1000))
                    }
                    dateArr.push(obj);
                } else if ((7 - date) >= (j - date)) {
                    let obj = {
                        'week': week[j == 7 ? 0 : j],
                        'date': this.onFormatDate(new Date(new Date().valueOf() + (j - date) * 24 * 3600 * 1000))
                    }
                    dateArr.push(obj);
                }
                j++;
            } else {
                if (j <= 7) {
                    let obj = {
                        'week': week[j],
                        'date': this.onFormatDate(new Date(time - (7 - j) * 24 * 3600 * 1000))
                    }
                    dateArr.push(obj);
                }
                j++;
            }
        }
        // this.setState({
        //     dateArr
        // })
        console.log(dateArr);
    }

    render() {
        const { dailyDataList } = this.props;
        let { userNum, pageObj } = dailyDataList;
        const { userList } = this.state;
        console.log(userList)
        return (
            <div style={{ position: 'relative' }} className={className['daily_data']}>
                {/* <Icon type="form" style={style} /> */}
                <Table
                    columns={this.columns}
                    dataSource={userList}
                    loading={userList && userList.length > 0 ? false : true} pagination={false}
                    size="middle"
                    scroll={{ x: true }}
                    bordered
                />
                {
                    userNum > 0 ? <Pagination total={userNum} current={pageObj.current} pageSize={pageObj.pageSize} onChange={this.onChange} style={{ marginBottom: '20px' }} /> : ""
                }
            </div>
        )
    }
}