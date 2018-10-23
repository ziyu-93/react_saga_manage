import React, { Component } from "react";
import classname from './index.less';
import ReactEcharts from 'echarts-for-react';
import { postObj } from './../../../api/promise_ajax';
import { QUERYCHARTDATA_LINE_ANSWER } from './../../../api/interface';
import { DatePicker, Button } from 'antd';
import echarts from 'echarts';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

export default class EchersAverageAnswer extends Component {

    constructor(...arg) {

        super(...arg);

        this.state = {
            cnt: 0,
            starTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
            endTime: moment().format("YYYY-MM-DD"),
            timeArr: [],
            allAverageAnswerArr: [],
            newAverageAnswerArr: [],
            oldAverageAnswerArr: [],
            sunlandsAverageAnswerArr: [],
            noSunlandsAverageAnswerArr: []
        }

        this.columns = [
            {
                title: "",
                dataIndex: ""
            }
        ]
    }

    option = (timeArr, allAverageAnswerArr, newAverageAnswerArr, oldAverageAnswerArr, sunlandsAverageAnswerArr, noSunlandsAverageAnswerArr) => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['总用户', '新用户', '老用户', '付费用户', '未付费用户']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true,
                    iconStyle: {
                        borderColor: '#22bb22'
                    }
                },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['tiled', 'line', 'bar', 'stack']
                },
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
                name: '总用户',
                type: 'line',
                symbolSize: 4,   //拐点圆的大小
                data: allAverageAnswerArr,
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
                name: '新用户',
                type: 'line',
                symbol: 'circle',
                // stack: '总量',
                smooth: true,
                symbolSize: 4,
                data: newAverageAnswerArr,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            // 区域图，纵向渐变填充
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#333' },
                                    { offset: 0.5, color: '#777' },
                                    { offset: 1, color: '#ddd' }
                                ]
                            )
                        }
                    }
                },
            },
            {
                name: '老用户',
                type: 'line',
                symbol: 'circle',
                // stack: '总量',
                smooth: true,
                symbolSize: 4,
                data: oldAverageAnswerArr
            },
            {
                name: '付费用户',
                type: 'line',
                symbol: 'circle',
                // stack: '总量',
                smooth: true,
                symbolSize: 4,
                data: sunlandsAverageAnswerArr
            },
            {
                name: '未付费用户',
                type: 'line',
                symbol: 'circle',
                // stack: '总量',
                smooth: true,
                symbolSize: 4,
                data: noSunlandsAverageAnswerArr
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
        postObj(QUERYCHARTDATA_LINE_ANSWER, { 'starTime': starTime, 'endTime': endTime }).then((res) => {
            console.log(JSON.parse(res));
            const dateArr = JSON.parse(res);
            let timeArr = []
            let allAverageAnswerArr = []
            let newAverageAnswerArr = []
            let oldAverageAnswerArr = []
            let sunlandsAverageAnswerArr = []
            let noSunlandsAverageAnswerArr = [];

            for (let i in dateArr) {
                timeArr.push(dateArr[i].currTime);
                allAverageAnswerArr.push((dateArr[i].all_answerNum / dateArr[i].all_answerPer).toFixed(0));
                newAverageAnswerArr.push((dateArr[i].new_answerNum / dateArr[i].new_answerPer).toFixed(0));
                oldAverageAnswerArr.push(((dateArr[i].all_answerNum - dateArr[i].new_answerNum) / (dateArr[i].all_answerPer - dateArr[i].new_answerPer)).toFixed(0));
                sunlandsAverageAnswerArr.push((dateArr[i].all_sunlandAnswerNum / dateArr[i].all_sunlandAnswerPer).toFixed(0));
                noSunlandsAverageAnswerArr.push((dateArr[i].all_noSunlandAnswerNum / dateArr[i].all_noSunlandAnswerPer).toFixed(0));
            }

            this.setState({
                timeArr,
                allAverageAnswerArr,
                newAverageAnswerArr,
                oldAverageAnswerArr,
                sunlandsAverageAnswerArr,
                noSunlandsAverageAnswerArr
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

    render() {
        const { starTime, endTime, timeArr, allAverageAnswerArr, newAverageAnswerArr, oldAverageAnswerArr, sunlandsAverageAnswerArr, noSunlandsAverageAnswerArr } = this.state;
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
                    </div>
                    <ReactEcharts
                        option={this.option(timeArr, allAverageAnswerArr, newAverageAnswerArr, oldAverageAnswerArr, sunlandsAverageAnswerArr, noSunlandsAverageAnswerArr)}
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