import React, { Component } from "react";
import className from './index.less';
import { Table, Pagination, Icon, Button } from 'antd';
import { QUERYDAILYDATA } from './../../../api/interface';
import { getForm, postObj } from './../../../api/promise_ajax';
import { DEFAULT_DAILYDATA_QUERY_RESULT } from './../../../constants/index';


export default class Dailydata extends Component {
    constructor(...arg) {
        super(...arg);

        this.state = {
            list: [],
            total: null,
            pageObj: {
                current: 1,
                pageSize: 10
            },
            dateArr: [],
            userNum: 0,
            switchTab: 1
        }

        this.newColumns = [
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
                        title: '点击开始',
                        dataIndex: "new_click_star_btn",
                        render: (c, a) => {
                            return c ? c : '--'
                        }
                    }, {
                        title: '手机号',
                        dataIndex: "new_phone"
                    }, {
                        title: '新手学历',
                        dataIndex: "new_answer"
                    }, {
                        title: '答题人数',
                        dataIndex: "new_answerPer"
                    }, {
                        title: '答题数',
                        dataIndex: "new_answerNum"
                    }, {
                        title: '人均答题',
                        dataIndex: "new_averageAnswer",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{(a.new_answerNum / a.new_answerPer).toFixed(0)}</span>
                        }
                    }, {
                        title: '微信授权',
                        dataIndex: "new_info"
                    }, {
                        title: '添加专业',
                        dataIndex: "new_add_education"
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
                    }, {
                        title: '人均答题',
                        dataIndex: "new_sunlandAverageAnswer",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{(a.new_sunlandAnswerNum / a.new_sunlandAnswerPer).toFixed(0)}</span>
                        }
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
                    }, {
                        title: '人均答题',
                        dataIndex: "new_noSunlandAverageAnswer",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{(a.new_noSunlandAnswerNum / a.new_noSunlandAnswerPer).toFixed(0)}</span>
                        }
                    }]
                }]
            }
        ]
        this.oldColumns = [
            {
                title: "日期",
                dataIndex: "currTime",
                fixed: 'left'
            }, {
                title: "老用户相关",
                dataIndex: "nickname",
                children: [{
                    title: "老总用户",
                    children: [{
                        title: '进入',
                        dataIndex: "all_getIn",
                        render: (c, a) => {
                            return c - a.new_getIn
                        }
                    }, {
                        title: '答题人数',
                        dataIndex: "all_answerPer",
                        render: (c, a) => {
                            return c - a.new_answerPer
                        }
                    }, {
                        title: '答题数',
                        dataIndex: "all_answerNum",
                        render: (c, a) => {
                            return c - a.new_answerNum
                        }
                    }, {
                        title: '人均答题',
                        dataIndex: "all_AverageAnswer",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{(a.all_answerNum / a.all_answerPer).toFixed(0)}</span>
                        }
                    }]
                }, {
                    title: '付费用户',
                    children: [{
                        title: '进入',
                        dataIndex: "oldSunlands_getIn",
                        render: (c, a) => {
                            return c ? c : '--';
                        }
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
                    }, {
                        title: '人均答题',
                        dataIndex: "all_sunlandAverageAnswerNum",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{((a.all_sunlandAnswerNum - a.new_sunlandAnswerNum) / (a.all_sunlandAnswerPer - a.new_sunlandAnswerPer)).toFixed(0)}</span>
                        }
                    }]
                }, {
                    title: '非付费用户',
                    children: [{
                        title: '进入',
                        dataIndex: "oldNoSunlands_getIn",
                        render: (c, a) => {
                            return c ? c : '--';
                        }
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
                    }, {
                        title: '人均答题',
                        dataIndex: "all_noSunlandAverageAnswerNum",
                        render: (c, a) => {
                            return <span style={{ color: 'red' }}>{((a.all_noSunlandAnswerNum - a.new_noSunlandAnswerNum) / (a.all_noSunlandAnswerPer - a.new_noSunlandAnswerPer)).toFixed(0)}</span>
                        }
                    }]
                }]
            }]

        this.allColumns = [
            {
                title: "日期",
                dataIndex: "currTime",
                fixed: 'left'
            }, {
                title: "打开",
                dataIndex: "all_getIn",
            }, {
                title: "答题数",
                dataIndex: "all_answerNum",
            }, {
                title: "答题人数",
                dataIndex: "all_answerPer",
            }, {
                title: "人均答题数",
                dataIndex: "all_averageAnswerNum",
                render: (c, a) => {
                    return <span style={{ color: 'red' }}>{(a.all_answerNum / a.all_answerPer).toFixed(0)}</span>
                }
            }, {
                title: "答题人数/打开",
                dataIndex: "all_AnswerPer_open",
                render: (c, a) => {
                    return <span style={{ color: 'red' }}>{(a.all_answerPer * 100 / a.all_getIn).toFixed(2)}%</span>
                }
            }
        ]

        this.newAverageColumns = [
            {
                title: "日期",
                dataIndex: "currTime",
                fixed: 'left'
            }, {
                title: "点击开始/打开",
                dataIndex: "new_click_star_btn/open",
                render: (c, a) => {
                    return <span>{(a.new_click_star_btn * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }, {
                title: "手机号/打开",
                dataIndex: "new_phone/open",
                render: (c, a) => {
                    return <span>{(a.new_phone * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }, {
                title: "答新手学历/打开",
                dataIndex: "new_answer/open",
                render: (c, a) => {
                    return <span>{(a.new_answer * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }, {
                title: "答题人数/打开",
                dataIndex: "new_answerPer/open",
                render: (c, a) => {
                    return <span>{(a.new_answerPer * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }, {
                title: "微信/打开",
                dataIndex: "new_info/open",
                render: (c, a) => {
                    return <span>{(a.new_info * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }, {
                title: "添加专业/打开",
                dataIndex: "new_add_education/open",
                render: (c, a) => {
                    return <span>{(a.new_add_education * 100 / a.new_getIn).toFixed(2)}%</span>
                }
            }
        ]
        // {
        //     title: "答第一关/打开",
        //     dataIndex: "new_first_answer/open",
        //     render: (c, a) => {
        //         return <span>{(a.new_first_answer*100 / a.new_getIn).toFixed(2)}%</span>
        //     }
        // }, 
    }

    componentWillMount() {
        console.log('first renader ');
        this.onGetCurrDate();
    }

    componentDidMount() {
        const { dailyDataList } = this.props;
        const { list } = dailyDataList;
        list ? console.log('已有数据') : this.onSerach();
    }

    shouldComponentUpdate(prevProps, nextState) {
        // console.log(nextState);
        if (nextState.pageObj.current !== this.state.pageObj.current) {
            return true;
        }
        if (nextState.list != []) {
            return true;
        }
    }

    onSerach = (queryObj = {}) => {
        const _that = this;
        // postObj(QUERYDAILYDATA).then((res) => {
        //     console.log(JSON.parse(res));
        //     const userList = JSON.parse(res);
        //     _that.setState({
        //         userList,
        //         userNum: userList.length
        //     })
        // })

        // 连入了 redux-saga 为保存当前页面内容
        let { pageObj } = this.state;
        const { dispatch } = this.props;
        pageObj = Object.assign({}, queryObj, pageObj);
        dispatch({
            type: DEFAULT_DAILYDATA_QUERY_RESULT,
            pageObj
        })
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

    onSwitchTab = (e) => {
        this.setState({
            switchTab: e
        })
    }

    render() {
        const { dailyDataList } = this.props;
        console.log(dailyDataList)
        let { pageObj, list, length } = dailyDataList;
        let { switchTab } = this.state;
        return (
            <div style={{ position: 'relative' }} className={className['daily_data']}>
                <div className={className['btn_wrap']}>
                    <Button onClick={() => this.onSwitchTab(1)} type={switchTab == 1 ? "primary" : "default"}>总用户</Button>
                    <Button onClick={() => this.onSwitchTab(2)} type={switchTab == 2 ? "primary" : "default"}>新用户</Button>
                    <Button onClick={() => this.onSwitchTab(3)} type={switchTab == 3 ? "primary" : "default"}>新统计</Button>
                    <Button onClick={() => this.onSwitchTab(4)} type={switchTab == 4 ? "primary" : "default"}>老用户</Button>

                </div>
                {/* <Icon type="form" style={style} /> */}
                <Table
                    columns={switchTab == 1 ? this.allColumns : switchTab == 2 ? this.newColumns : switchTab == 3 ? this.newAverageColumns : this.oldColumns}
                    dataSource={list}
                    loading={list && list.length > 0 ? false : true} pagination={false}
                    size="middle"
                    scroll={{ x: true }}
                    bordered
                />
                {
                    length > 0 ? <Pagination total={length} current={pageObj.current} pageSize={pageObj.pageSize} onChange={this.onChange} style={{ marginBottom: '20px', marginTop: '20px' }} /> : ""
                }
            </div>
        )
    }
}