import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Dashboard from './dashboard.js.jsx'

class Content extends React.Component  {
    render() {
        return (
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Switch>
                        <Route exact path="/" 
                            render={ ({location}) => {
                                    { if (location.pathname == '/') return <Dashboard /> }
                                }
                            }
                        
                        />
                    </Switch>
                </main>
        );
    }
}

export default Content;