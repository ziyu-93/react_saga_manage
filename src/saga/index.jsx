import { fork } from 'redux-saga/effects';

const context = require.context('./', false, /\.jsx$/);

const keys = context.keys().filter(item => item != './index.jsx');

export default function* root() {
    for (let i = 0; i < keys.length; i++) {
        for (let key in context(keys[i])) {
            yield fork(context(keys[i])[key]);
        }
    }
}

