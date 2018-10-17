import React, { Component } from "react";
import classname from './index.less';
import { Table, Pagination, Icon } from 'antd';
import { QUERYTABLEDATA } from './../../../api/interface';
import { getForm, postObj } from './../../../api/promise_ajax';
import { DEFAULTQUERY_RESULT } from './../../../constants/index';


export default class TableData extends Component {
    constructor(...arg) {
        super(...arg);

        this.state = {
            userList: [],
            total: null,
            pageObj: {
                current: 1,
                pageSize: 10
            }
        }

        this.columns = [
            {
                title: "用户Id",
                dataIndex: "id"
            },
            {
                title: "用户名称",
                dataIndex: "nickname"
            },
            {
                title: "头像",
                dataIndex: "avatar",
                render: (text, record) => {
                    return text ? <img className={classname['avater']} src={text}></img> : ""
                }
            },
            {
                title: "性别",
                dataIndex: "sex",
                render: (text, record) => {
                    return text == 1 ? "男" : text == 2 ? "女" : "未知"
                }
            },
            {
                title: "学历",
                dataIndex: "qualifications_type",
                render: (t, r) => {
                    return t == 2 ? "本科" : t == 1 ? "专科" : "未知"
                }
            },
            {
                title: "电话号码",
                dataIndex: "tel_no"
            },
            {
                title: "是否尚德用户",
                dataIndex: "buy_status",
                render: (t, r) => {
                    return t == 1 ? "是" : "否"
                }
            },
            {
                title: "渠道来源",
                dataIndex: "channel"
            },
            {
                title: "入库时间",
                dataIndex: "add_time"
            }
        ]
    }

    componentWillMount() {
        console.log('first renader ');
    }

    componentDidMount() {
        const { defaultList } = this.props;
        const { userList } = defaultList;
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

        // 普通请求
        // postObj(QUERYTABLEDATA, queryObj).then((res) => {
        //     console.log(JSON.parse(res));
        //     const userList = JSON.parse(res).userList;
        //     _that.setState({
        //         userList,
        //         total: JSON.parse(res).userNum
        //     })
        // })

        // 连入了 redux-saga 为保存当前页面内容
        let { pageObj } = this.state;
        const { dispatch } = this.props;
        pageObj = Object.assign({}, queryObj, pageObj);
        dispatch({
            type: DEFAULTQUERY_RESULT,
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

    render() {
        // const { pageObj } = this.state;
        console.log(this.props);
        const { defaultList } = this.props;
        let { userList, userNum, pageObj } = defaultList;
        console.log(userList)
        const style = {
            position: 'absolute',
            right: '-20px',
            top: '-20px',
            color: '#001529',
            fontSize: '32px'
        }
        return (
            <div style={{ position: 'relative' }}>
                {/* <Icon type="form" style={style} /> */}
                <Table columns={this.columns} dataSource={userList} loading={userList && userList.length > 0 ? false : true} pagination={false} scroll={{ x: true }} />
                {
                    userNum > 0 ? <Pagination total={userNum} current={pageObj.current} pageSize={pageObj.pageSize} onChange={this.onChange} style={{ marginBottom: '20px' }} /> : ""
                }
            </div>
        )
    }
}