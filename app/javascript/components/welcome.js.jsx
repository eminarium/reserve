import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux-store/store'
import axios from 'axios'

import {
    Link
} from "react-router-dom";

import TopNav from './top_nav.js.jsx'
import Container from './container.js.jsx'

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <TopNav />
                    <Container />
                </Provider>
            </div>
        )
    }
}

export default Welcome;