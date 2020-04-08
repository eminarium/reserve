import React from 'react'
import { connect } from 'react-redux'

import {
    editShift,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class ShiftInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <br/>

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Wagt (Smena) Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.shift.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.shift.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/shifts/" + this.props.shift.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editShift(this.props.shift.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link> 
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/shifts"}>
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
        shift: state.shifts.currentShift,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editShift: (id) => dispatch(editShift(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftInfo)
