import React from 'react'
import { connect } from 'react-redux'

import {
    editSeason,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class SeasonInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var dstart = new Date(this.props.season.start_date)
        var dend = new Date(this.props.season.end_date)
        var dreturn = new Date(this.props.season.return_deadline)

        return (
            <div>
                <br/>

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Tapgyr Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.season.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">T/b</th>
                                    <td>{this.props.season.order_no}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Başlanýan Senesi</th>
                                    <td>
                                        {dstart.getDate() < 9 ? "0" : ""}{dstart.getDate()}-
                                        {dstart.getMonth() < 9 ? "0" : ""}{dstart.getMonth() + 1}-
                                        {dstart.getFullYear()} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Tamamlanýan Senesi</th>
                                    <td>
                                        {dend.getDate() < 9 ? "0" : ""}{dend.getDate()}-
                                        {dend.getMonth() < 9 ? "0" : ""}{dend.getMonth() + 1}-
                                        {dend.getFullYear()} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Gaýtarma Senesi</th>
                                    <td>
                                        {dreturn.getDate() < 9 ? "0" : ""}{dreturn.getDate()}-
                                        {dreturn.getMonth() < 9 ? "0" : ""}{dreturn.getMonth() + 1}-
                                        {dreturn.getFullYear()} 
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.season.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/seasons/" + this.props.season.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editSeason(this.props.season.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link> 
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/seasons"}>
                                            <button className="btn btn-primary">
                                                <i className="fa fa-list"></i>
                                            </button>
                                        </Link> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        season: state.seasons.currentSeason,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editSeason: (id) => dispatch(editSeason(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonInfo)
