import React, { Component } from 'react';
import classname from './index.less';

export default class RightCont extends Component {

    componentWillMount() {
        // console.log(this.props);
    }

    render() {
        const { rightCont } = this.props;
        const { leftMenuReducer } = rightCont;
        const style = {
            padding: '40px 60px',
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%'
        }
        return (
            <section className={classname[leftMenuReducer ? 'rightContFull' : 'rightCont']}>
                <div style={style}>
                    {
                        this.props.children
                    }
                </div>
            </section>
        )
    }
}
