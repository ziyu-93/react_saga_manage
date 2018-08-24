import React, { Component } from 'react';
import classname from './index.less';

export default class RightCont extends Component {

    componentWillMount() {
        // console.log(this.props);
    }

    render() {
        const { rightCont } = this.props;
        const { leftMenuReducer } = rightCont;
        return (
            <section className={classname[leftMenuReducer ? 'rightContFull' : 'rightCont']}>
                <div style={{ margin: '40px 60px', height: '100%', WebkitBoxSizing: 'border-box', boxSizing: 'border-box' }}>
                    {
                        this.props.children
                    }
                </div>
            </section>
        )
    }
}
