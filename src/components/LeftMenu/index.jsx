import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import className from './index.less';
import { LEFTMENU } from './../../constants';
import { Icon } from 'antd';
export default class LeftMenu extends Component {
    constructor(...arg) {
        super(...arg);

        this.state = {
            leftMenuFlag: false
        }
    }

    componentWillMount() {
        // console.log(this.props);
    }

    leftMenu = () => {
        const { dispatch } = this.props;
        this.setState({
            leftMenuFlag: !this.state.leftMenuFlag
        }, () => {
            dispatch({
                type: LEFTMENU,
                leftMenuFlag: this.state.leftMenuFlag
            })
        })
    }

    render() {
        const { leftMenuReducer } = this.props;
        return (
            <section className={className[leftMenuReducer ? 'leftMenuHide' : 'leftMenu']}>
                <Icon style={{ fontSize: '24px', color: '#001529' }} type={leftMenuReducer ? "menu-unfold" : "menu-fold"} className={className['leftArrow']} onClick={this.leftMenu} />
                {
                    this.props.menuList.map((v, k) => {
                        return <div className={className['menuItem']}>
                            <NavLink activeClassName={className['activeMenu']} to={v.hash} exact key={v.id}>
                                <Icon type={v.icon} style={{ fontSize: '16px' }} />
                                <span style={Object.assign({}, { width: '90px' }, leftMenuReducer ? { display: 'none' } : { display: 'inline-block' })}>{v.text}</span>
                            </NavLink>
                        </div>
                    })
                }
            </section >
        )
    }
}

LeftMenu.defaultProps = {
    menuList: [
        { id: 0, text: '版本更新', hash: "/zkwz_clientSystem", icon: "desktop" },
        { id: 1, text: '用户列表', hash: "/zkwz_clientSystem/userTable", icon: "table" },
        { id: 2, text: '图形统计', hash: "/zkwz_clientSystem/chart", icon: "area-chart" },
        { id: 3, text: '用户答题', hash: "/zkwz_clientSystem/daily_data", icon: "table" }
    ]
}