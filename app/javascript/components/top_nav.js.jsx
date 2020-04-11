import React from 'react';
import { connect } from 'react-redux'
import {
    Link
} from "react-router-dom";
import { 
    fetchSeasons,
    setActiveSeason
} from '../redux-store'

class TopNav extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.props.fetchSeasons()
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem("Token");
    }
    
    render() {

        console.log(JSON.parse(localStorage.getItem("currentUser")).username);

        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">
                    <Link to="/" className="nav-link">
                        GN RESERVE APP
                    </Link>
                </h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <i className="fa fa-season"></i> {this.props.activeSeason.order_no}
                </nav>
                <nav className="my-2 my-md-0 mr-md-3">
                    <i className="fa fa-user"></i> {JSON.parse(localStorage.getItem("currentUser")).username}
                </nav>
                <Link to="/" onClick={this.handleLogout} className="btn btn-outline-primary">
                    <i className="fa fa-sign-out"></i>
                </Link>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        seasons: state.seasons.seasons,
        activeSeason: state.seasons.activeSeason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSeasons: () => dispatch(fetchSeasons()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)