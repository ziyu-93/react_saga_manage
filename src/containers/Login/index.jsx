import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Login from './../../components/Login';

const getState = state => {
    return state.login;
}

const selector = createSelector(
    [getState],
    (state) => {
        return state
    }
)

export default connect(selector)(Login);