import React, { Component } from "react";
import classname from './index.less';
import ReactEcharts from 'echarts-for-react';
import { postObj } from '../../../api/promise_ajax';
import { QUERYCHARTDATA_PIE } from '../../../api/interface';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

export default class EchersPie extends Component {

    constructor(...arg) {

        super(...arg);

        this.state = {
            cnt: 0,
            newPerson: '--',
            fromChannelList: [
                '菠萝英语',
                '派学院',
                '瑞波学院',
                '尚德机构官网菜单',
                '尚德机构官网公众号',
                '自考王者King',
                '太罗学院',
                '自变量学院1',
                '自变量学院2',
                '其它'
            ],
            dataKey: [],
            dataList: [],
            starTime: moment().subtract(1, 'days').format("YYYY-MM-DD"),
            endTime: moment().format("YYYY-MM-DD"),
        }

        this.columns = [
            {
                title: "",
                dataIndex: ""
            }
        ]
    }

    options = (newPerson = null, fromChannelList, dataKey = [], data = []) => ({
        title: {
            text: '新用户访问来源',
            subtext: `新用户数：${newPerson}`,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 'left',
            data: fromChannelList,
            selected: dataKey
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                label: {
                    normal: {
                        formatter: '{b}({c}人 - {d}%)',
                    }
                },
                center: ['50%', '60%'],
                data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    
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

    onMapping = (item) => {
        let x = null;
        switch (item) {
            case 'boluoyingyu':
                x = '菠萝英语'
                break;
            case 'pai':
                x = '派学院'
                break;
            case 'ruibo':
                x = '瑞波学院'
                break;
            case 'sdjggwfwh-cd':
                x = '尚德机构官网菜单'
                break;
            case 'sdjggwgzh':
                x = '尚德机构官网公众号'
                break;
            case 'zkwzkfwh':
                x = '自考王者King'
                break;
            case 'tailuo':
                x = '太罗学院'
                break;
            case 'zbl1':
                x = '自变量学院1'
                break;
            case 'zbl2':
                x = '自变量学院2'
                break;
            default:
                x = '其它'
        }
        return x
    }

    onSearch = (starTime = this.onGetTime(), endTime = '') => {
        const self = this;
        postObj(QUERYCHARTDATA_PIE, { 'starTime': starTime, 'endTime': endTime }).then((res) => {
            const channelList = JSON.parse(res);
            let newPerson = 0;
            let dataKey = [];
            let dataList = [];
            for (let i in channelList) {
                newPerson += channelList[i].n;
                dataKey.push(self.onMapping(channelList[i].channel));
                let obj = {
                    value: channelList[i].n,
                    name: self.onMapping(channelList[i].channel)
                }
                dataList.push(obj);
            }
            self.setState({
                newPerson,
                dataList,
                dataKey
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
        const { newPerson, dataList, dataKey, fromChannelList, starTime, endTime } = this.state;
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
                        option={this.options(newPerson, fromChannelList, dataKey, dataList)}
                        style={style}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        onChartReady={this.onChartReadyCallback}
                        onEvents={onEvents}
                        opts={{ renderer: 'svg' }}
                    />
                </div>
            </div>
        )
    }
}