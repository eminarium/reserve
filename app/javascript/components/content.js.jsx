import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Dashboard from './dashboard.js.jsx'

import Languages from './languages/languages.js'
import LanguageNewForm from './languages/language_new_form.js'

import Shifts from './shifts/shifts.js'

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

                        <Route exact path="/languages" component={Languages} />
                        <Route exact path="/languages/new" component={LanguageNewForm} />

                        <Route exact path="/shifts" component={Shifts} />
                    </Switch>
                </main>
        );
    }
}

export default Content;