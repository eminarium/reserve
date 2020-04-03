import React from 'react'
import axios from 'axios'

import {
    Link
} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_signed_in: false,
            user: '',
            errors: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {

        e.preventDefault();

        axios.post('/login', JSON.stringify({
            user: {
                username: e.target.username.value,
                password: e.target.password.value
            }
        }), {
            headers: { "Content-type": "application/json" }
        })
        .then(response => {
            console.log("User logged in");

            localStorage.setItem('currentUser', JSON.stringify(response.data));
            localStorage.setItem('Token', response.headers.authorization);
            this.setState({
                is_signed_in: true,
                user: response.data,
                errors: '',
            })

            this.props.history.push('/')
        })
        .catch(errors => {
            this.setState({ errors: "Ошибка соединения или введены неправильные данные ..." })
            console.log(errors);
            console.log("Che to ne to oza ...")
        })        
    }

    render() {
        return (

            <div>

                <div className="card" style={{ margin: 'auto', width: '30%', padding: '10px', top: '50px' }}>
                    <div className="card-body">
                        <h5 className="card-title">ВХОД В СИСТЕМУ</h5>
                        <form noValidate onSubmit={this.handleLogin}>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-6 col-form-label">Пользователь</label>
                                <div className="col-sm-10">
                                    <input type="text" id="username" name="username" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-6 col-form-label">Пароль</label>
                                <div className="col-sm-10">
                                    <input type="password" id="password" name="password" className="form-control" required />
                                </div>
                            </div>

                            <button className="btn btn-primary">Вход</button>
                        </form>
                        <br />
                        <div style={{ color: "red" }}>
                            {this.state.errors}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Login;