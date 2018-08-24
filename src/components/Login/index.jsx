import React, { Component } from "react";
import { Button, Input, Form, Icon, Checkbox } from 'antd';
import className from './index.less';
import { sysSuccess, sysError, sysWarning } from './../../api/sysNotification';
import { LOGIN_RESULT } from './../../constants/index';
import bg from './../../resources/images/image_33.jpg';
import { Redirect } from 'react-router-dom';

export default class Header extends Component {
    constructor(...arg) {
        super(...arg);
        this.state = {
            submitFlag: true
        }
    }

    login = () => {
        const username = this.refs['username'].input.value.trim();
        const password = this.refs['password'].input.value.trim();
        const { dispatch } = this.props;
        if (!username && !password) {
            sysError('请输入账号密码');
        } else if (!username) {
            sysWarning('请输入账号');
        } else if (!password) {
            sysWarning('请输入密码');
        } else {
            dispatch({
                type: LOGIN_RESULT,
                params: {
                    username,
                    password
                }
            })
        }
    }

    render() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        console.log(userInfo)
        if (userInfo && userInfo['username']) {
            return <Redirect to="/zkwz_clientSystem" push />
        }

        return (
            <section className={className['loginPage']}>
                <img src={bg} alt="" className={className['bgImg']} />
                {/* <h1 className={className['title']}>自考王者 — 后端管理系统</h1> */}
                <section className={className['loginCont']}>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25' }} />}
                        type="text"
                        placeholder="Username"
                        ref="username"
                        style={{ width: '400px', height: '50px', marginTop: '40px' }}
                    />
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25' }} />}
                        type="password"
                        placeholder="Password"
                        ref="password"
                        style={{ width: '400px', height: '50px', marginTop: '40px' }}
                    />
                    <Button type="primary"
                        className={className['login_btn']}
                        style={{ marginTop: '60px', height: '50px', fontSize: '18px' }}
                        onClick={this.login}
                    >Log in</Button>
                </section>
            </section>
        )
    }
}