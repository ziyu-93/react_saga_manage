import React, { Component } from "react";
import className from './index.less';
import userImg from './../../images/userImg.png';
import logout from './../../images/logout.png';
import logo from './../../images/header_logo.png';
import { Link, Redirect } from 'react-router-dom';
import { Modal } from 'antd';

export default class Header extends Component {
    constructor(...arg) {
        super(...arg);
        this.state = {
            userName: '请登录',
            projectName: '自考王者数据展示平台'
        }
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({
                userName: JSON.parse(user).username
            })
        }
    }


    handleLogout = () => {
        Modal.confirm({
            title: '确定要退出登录吗？',
            okText: '退出',
            cancelText: '暂不离开',
            onOk() {
                logout()
            },
            onCancel() {
                console.log('暂不离开');
            }
        })
        const logout = () => {
            console.log('退出')
            localStorage.clear('user');
            this.setState({
                userName: '请登录'
            })
        }

    }

    render() {
        const { userName, projectName } = this.state;
        const user = localStorage.getItem('user');
        if (userName == '请登录' && !user) {
            return <Redirect to="/zkwz_login" />
        }
        return (
            <section className={className['header']}>
                <div className={className['logo']}>
                    <img src={logo} alt="logo" />
                    <span>{projectName}</span>
                </div>
                <div className={className['logout']} onClick={this.handleLogout}>
                    <img src={logout} alt="logout" />
                </div>
                <div className={className['user']}>
                    <Link to={{
                        pathname: '/zkwz_login',
                        search: '?login_in'
                    }}>
                        <img src={userImg} alt="userImg" className={className['userImg']} />
                        <span className={className['userName']}>{userName}</span>
                    </Link>
                </div>
            </section>
        )
    }
}