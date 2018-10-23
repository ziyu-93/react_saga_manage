import React, { Component } from "react";
import classname from './index.less';
import ReactEcharts from 'echarts-for-react';
import { postObj } from './../../../api/promise_ajax';
import { QUERYCHARTDATA_LINE } from './../../../api/interface';
import { DatePicker, Button } from 'antd';
import echarts from 'echarts';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

export default class EchersLine extends Component {

    constructor(...arg) {

        super(...arg);

        this.state = {
            cnt: 0,
            starTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
            endTime: moment().format("YYYY-MM-DD"),
            timeArr: [],
            newGetInArr: [],
            AllGetInArr: [],
            newAnswerArr: [],
            allAnswerArr: [],
            oldAnswerArr: [],
            oldGetIn: [],
            userType: '新用户',
            currSwitch: 1
        }

        this.columns = [
            {
                title: "",
                dataIndex: ""
            }
        ]
    }

    option = (userType, timeArr, openArr, answerArr) => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['打开', '答题人数']
        },
        toolbox: {
            show: true,
            feature: {
                // mark: {
                //     show: true,
                //     iconStyle: {
                //         borderColor: '#22bb22'
                //     }
                // },
                // dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['tiled', 'line', 'bar', 'stack']
                },
                // restore: {
                //     show: true,
                //     iconStyle: {
                //         borderColor: '#22bb22'
                //     }
                // },
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: timeArr
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: `{value}人`
                }
            }
        ],
        series: [
            {
                name: '打开',
                type: 'line',
                symbolSize: 4,   //拐点圆的大小
                data: openArr,
                // stack: '总量',
                smooth: false,   //关键点，为true是不支持虚线的，实线就用true
                symbol: 'none',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            // 区域图，纵向渐变填充
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: 'red' },
                                    { offset: 0.5, color: 'pink' },
                                    { offset: 1, color: '#ddd' }
                                ]
                            )
                        }
                    }
                },
            },
            {
                name: '答题人数',
                type: 'line',
                symbol: 'circle',
                // stack: '总量',
                smooth: true,
                symbolSize: 4,
                data: answerArr
            }
        ]
    })


    componentDidMount() {
        this.onSearch();
    }

    onChartClick = (param, echarts) => {
        console.log(param, echarts);
        // alert('chart click');
        // this.setState({
        //     cnt: this.state.cnt + 1,
        // })
    };

    onChartReadyCallback = () => {
        console.log('echarts is ready');
    }

    onChartClick = (param, echarts) => {
        console.log(param, echarts);
        // alert('chart click');
        // this.setState({
        //     cnt: this.state.cnt + 1,
        // })
    };

    onChartLegendselectchanged = (param, echart) => {
        console.log(param, echart);
        // alert('chart legendselectchanged');
    };

    onGetTime = () => {
        const yesterday = new Date().valueOf() - 1000 * 60 * 60 * 24;
        const date = new Date(yesterday);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const dates = date.getDate();
        return `${year}-${month}-${dates}`;
    }

    onSearch = (starTime = '', endTime = '') => {
        postObj(QUERYCHARTDATA_LINE, { 'starTime': starTime, 'endTime': endTime }).then((res) => {
            console.log(JSON.parse(res));
            const dateArr = JSON.parse(res);
            let timeArr = []
            let newGetInArr = []
            let AllGetInArr = []
            let newAnswerArr = []
            let allAnswerArr = []
            let oldGetIn = [];
            let oldAnswerArr = [];

            for (let i in dateArr) {
                timeArr.push(dateArr[i].currTime);
                newGetInArr.push(dateArr[i].new_getIn);
                AllGetInArr.push(dateArr[i].all_getIn);
                newAnswerArr.push(dateArr[i].new_answerPer);
                allAnswerArr.push(dateArr[i].all_answerPer);
                oldGetIn.push(dateArr[i].all_getIn - dateArr[i].new_getIn)
                oldAnswerArr.push(dateArr[i].all_answerPer - dateArr[i].new_answerPer)
            }
            console.log(starTime, endTime);
            this.setState({
                timeArr,
                newGetInArr,
                AllGetInArr,
                newAnswerArr,
                allAnswerArr,
                oldGetIn,
                oldAnswerArr
            })
        })
    }

    onChange = (date, dateStrings) => {
        console.log(dateStrings);
        if (!dateStrings[0]) {
            dateStrings[0] = this.onGetTime();
        }
        this.setState({
            starTime: dateStrings[0],
            endTime: dateStrings[1]
        })
    }

    onSwitch = (e) => {
        this.setState({
            currSwitch: e
        })
    }

    render() {
        const { starTime, endTime, timeArr, newGetInArr, AllGetInArr, newAnswerArr, allAnswerArr, userType, currSwitch, oldGetIn, oldAnswerArr } = this.state;
        let [currGetIn, currAnswerArr] = currSwitch == 1 ? [AllGetInArr, allAnswerArr] : currSwitch == 2 ? [newGetInArr, newAnswerArr] : [oldGetIn, oldAnswerArr];
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        };
        const style = {
            'padding': '20px',
            'background': 'white',
            'boxSizing': 'border-box',
            'WebKitboxSizing': 'border-box',
            'height': '380px'
        }
        return (
            <div className={classname['echarts_item']}>
                <div>
                    <div className={classname['serach_wrap']}>
                        <RangePicker
                            format="YYYY-MM-DD"
                            showTime
                            onChange={this.onChange}
                            ranges={{ 昨天数据: [moment().subtract(1, 'days'), moment()] }}
                            defaultValue={[moment().subtract(1, 'days'), moment()]}
                        />
                        <Button className={classname['serach_btn']} onClick={() => this.onSearch(starTime, endTime)} type="primary">确定</Button>
                        <div style={{ float: 'right' }}>
                            <Button className={classname['serach_btn']} onClick={() => this.onSwitch(1)} type={currSwitch == 1 ? "primary" : "default"}>总用户</Button>
                            <Button className={classname['serach_btn']} onClick={() => this.onSwitch(2)} type={currSwitch == 2 ? "primary" : "default"}>新用户</Button>
                            <Button className={classname['serach_btn']} onClick={() => this.onSwitch(3)} type={currSwitch == 3 ? "primary" : "default"}>老用户</Button>
                        </div>
                    </div>
                    <ReactEcharts
                        option={this.option(userType, timeArr, currGetIn, currAnswerArr)}
                        style={style}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        onChartReady={this.onChartReadyCallback}
                        onEvents={onEvents}
                        opts={{ renderer: 'svg' }}
                    />
                </div>
            </div >
        )
    }
}