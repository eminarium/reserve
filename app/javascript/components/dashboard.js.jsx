import React from 'react'
import axios from 'axios'

import {
    Link
} from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: 0,
            contractors: 0,
        }
    }

    componentDidMount() {
        /*
        axios.get('/api/v1/customers', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => response.data)
        .then(data => {
            if (data) {
                console.log("Customers fetched !")
                this.setState({
                    customers: Object.keys(data).length
                })
            }
        })
        .catch(errors => {
            console.log("Customer error : " + JSON.stringify(errors));
            if (errors.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem("Token");
                this.props.history.push('/');
            }
        })

        axios.get('/api/v1/contractors', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => response.data)
        .then(data => {
            if (data) {
                console.log("Contractors fetched !")
                this.setState({
                    contractors: Object.keys(data).length
                })
            }
        })
        .catch(errors => {
            if (errors.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem("Token");
                this.props.history.push('/');
            }

            //console.log("Contractor error data: " + JSON.stringify(errors.response.data));
            //console.log("Contractor error status: " + JSON.stringify(errors.response.status));
            //console.log("Contractor error headers: " + JSON.stringify(errors.response.headers));
        })
        */
    }

    render() {
        return (
            <div>
                <h1>ГЛАВНАЯ ПАНЕЛЬ</h1>
                <br/><br/><br/>
            </div>
        )
    }
}

export default Dashboard;