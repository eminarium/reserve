// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../components/login.js.jsx'
import Welcome from '../components/welcome.js.jsx'

import { Provider } from 'react-redux'
import configureStore from '../redux-store/store'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../redux-store/store'

const store = configureStore()

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    //if (!localStorage.getItem('currentUser')) {
    //this.props.history.push('/login');
    //return <Redirect to="/login" />
    //} else

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/"
              render={() => (
                (localStorage.getItem('currentUser')) ? (<Welcome />) : (<Redirect to="/login" />)
              )
            }
          />
          <Route exact path="/login" component={Login} />
        </ConnectedRouter>
      </Provider>    )
  }

}

export default Main;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Main />,
    document.body.appendChild(document.createElement('root')),
  )
})

/*
const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})

*/
