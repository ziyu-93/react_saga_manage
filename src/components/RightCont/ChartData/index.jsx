import React, { Component } from "react";
import classname from './index.less';
import { Modal, Button } from 'antd';
import moment from 'moment';
import chartLine from './../../../images/line-simple.png';
import chartPie from './../../../images/pie-simple.png';
import EchersLine from './echers_line';
import EchersPie from './echers_pie';
import EchersAverageAnswer from './echers_average_answer';
export default class ChartData extends Component {

    constructor(...arg) {

        super(...arg);

        this.state = {
            visible: false,
            target: null
        }

        this.columns = [
            {
                title: "",
                dataIndex: ""
            }
        ]
    }

    onTarget = (e) => {
        this.setState({
            target: e,
            visible: true
        })
    }

    onHandleOk = () => {
        this.setState({
            visible: false
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { visible, target } = this.state;
        const id = target ? target.id : "";
        return (
            <div className={classname['chart_wrap']}>
                {
                    this.props.chartList.map((i, k) => {
                        return <div className={classname['chart_item']} key={k} onClick={() => this.onTarget(i)}>
                            <a>
                                <p><a>{i.chartType}</a></p>
                                <img src={i.src} alt="" />
                            </a>
                        </div>
                    })
                }
                <Modal
                    visible={visible}
                    title={target ? target.chartType : '自考王者数据'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='70%'
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleCancel}>
                            确定
                        </Button>
                    ]}>
                    {
                        id == 1 ? <EchersPie /> : id == 2 ? <EchersLine /> : <EchersAverageAnswer />
                    }
                </Modal>
            </div >
        )
    }
}

ChartData.defaultProps = {
    chartList: [
        { 'id': 1, chartType: '渠道新增 - 圆饼图', 'src': chartPie },
        { 'id': 2, chartType: '打开答题 - 折线图', 'src': chartLine },
        { 'id': 3, chartType: '人均答题 - 折线图', 'src': chartLine },
    ]
}