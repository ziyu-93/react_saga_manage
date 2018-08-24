import React, { PureComponent } from 'react';

import Default from "./../containers/Default";
import Table from "./../containers/TableData";
import Chart from "./../containers/ChartData";


const Components = {
    Default,
    Table,
    Chart
}

export default class GetComponent extends PureComponent {
    upperFirst = (s) => s.substring(0, 1).toUpperCase() + s.substring(1);

    getChartComponent = (type) => {
        const s = this.upperFirst(type);
        return Components[s] ? Components[s] : Default;
    };

    render() {
        const {
            params,
        } = this.props;
        console.log(params);

        const ChartComponent = this.getChartComponent(params.type);

        return (<ChartComponent />);
    }
}