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
    }

    render() {
        return (
            <div>
                <h1>ГЛАВНАЯ ПАНЕЛЬ</h1>
                <br/><br/><br/>
                <div className="row">
                
                    &nbsp;&nbsp;&nbsp;
                    
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Заказчики</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Всего : {this.state.customers}
                            </h6>
                            <p className="card-text">Инстанции или Субъекты заказавшие Вам перечень работ.</p>
                            
                            <Link to={"/customers/"} className="card-link" >
                                Перейти
                            </Link>     

                        </div>
                    </div>  

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Подрядчики</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Всего : {this.state.contractors}
                            </h6>
                            <p className="card-text">Инстанции или Субъекты которым Вы заказали перечень работ.</p>
                            
                            <Link to={"/contractors/"} className="card-link" >
                                Перейти
                            </Link>     

                        </div>
                    </div>  

                </div>

            </div>
        )
    }
}

export default Dashboard;