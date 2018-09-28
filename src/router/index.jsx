
import React from "react";
import { Route, Redirect, Switch, IndexRoute } from 'react-router-dom';

import Header from "./../containers/Header";
import LeftMenu from "./../containers/LeftMenu";
import RightCont from "./../containers/RightCont";
import Default from "./../containers/Default";
import TableData from "./../containers/TableData";
import Dailydata from "./../containers/Daily_data";
import ChartData from "./../containers/ChartData";
import Login from './../containers/Login';
import className from './../less/index.less';

const Cont = () => {
    return <section className={className['app']}>
        <Header />
        <LeftMenu />
        <RightCont>
            <Switch>
                <Route exact path="/zkwz_clientSystem" component={Default} />
                <Route path="/zkwz_clientSystem/userTable" component={TableData} />
                <Route path="/zkwz_clientSystem/chart" component={ChartData} />
                <Route path="/zkwz_clientSystem/daily_data" component={Dailydata} />
                <Redirect from="*" to="/zkwz_clientSystem" component={Default} />
            </Switch>
            {/* <Route render={({ location }) => {
                    return (
                        <Switch key={location.pathname}>
                            <Route location={location} exact path="/" component={Default} />
                            <Route location={location} path="/table" component={TableData} />
                            <Route location={location} path="/chart" component={ChartData} />
                            <Redirect from="*" to="/" component={Default} />
                        </Switch>
                    )
                }}> */}
        </RightCont>
    </section>
}
const ContRouter = () => {
    return <section className={className['app']}>
        <Switch>
            <Route exact path="/zkwz_login" component={Login} ></Route>
            <Route path="/zkwz_clientSystem" component={Cont} ></Route>
            <Redirect from="*" to="/zkwz_login" component={Login} />
        </Switch>
    </section>
}

export default ContRouter;