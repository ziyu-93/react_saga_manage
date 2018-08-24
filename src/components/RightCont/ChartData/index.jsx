import React, { Component } from "react";
import classname from './index.less';
// import echarts from 'echarts/lib/echarts.js';
import ReactEcharts from 'echarts-for-react';
import { Table } from 'antd';

export default class ChartData extends Component {

    constructor(...arg) {

        super(...arg);

        this.state = {
            cnt: 0
        }

        this.columns = [
            {
                title: "",
                dataIndex: ""
            }
        ]
    }

    getOption1 = () => ({
        title: {
            text: '自考王者访问来源',
            subtext: '完善中',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
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

    getOption2 = () => ({
        title: {
            text: '自考王者一周内新用户',
            subtext: '完善中',
            x: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    });

    onChartClick = (param, echarts) => {
        console.log(param, echarts);
        // alert('chart click');
        this.setState({
            cnt: this.state.cnt + 1,
        })
    };

    onChartReadyCallback = () => {
        console.log('echarts is ready');
    }

    onChartClick = (param, echarts) => {
        console.log(param, echarts);
        alert('chart click');
        this.setState({
            cnt: this.state.cnt + 1,
        })
    };

    onChartLegendselectchanged = (param, echart) => {
        console.log(param, echart);
        alert('chart legendselectchanged');
    };
    render() {
        
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        };
        const style = {
            'width': '50%',
            'padding': '20px',
            'background': 'white',
            'boxSizing': 'border-box',
            'WebKitboxSizing': 'border-box'
        }

        return (
            <div>
                <ReactEcharts
                    option={this.getOption1()}
                    style={style}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                    onEvents={onEvents}
                    opts={{ renderer: 'svg' }}
                />
                <ReactEcharts
                    option={this.getOption2()}
                    style={Object.assign({}, style, { marginTop: '30px', fontSize: '12px' })}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                    onEvents={onEvents}
                    opts={{ renderer: 'svg' }}
                />
            </div>
        )
    }
}