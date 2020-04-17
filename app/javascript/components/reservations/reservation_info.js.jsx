import React from 'react'
import { connect } from 'react-redux'

import {
    editReservation,
    applicantInfo
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class ReservationInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <br />

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Rezerw Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Diňleýji</th>
                                    <td>
                                        <Link onClick={() => this.props.applicantInfo(this.props.reservation.applicant.id)} to={"/applicants/" + this.props.reservation.applicant.id} >
                                            {this.props.reservation.applicant.first_name} &nbsp;
                                            {this.props.reservation.applicant.last_name} &nbsp;
                                            {this.props.reservation.applicant.patronymic}
                                        </Link>

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Rezerw Tapgyry</th>
                                    <td>{this.props.reservation.season.order_no}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Rezerwirlenen Dersi</th>
                                    <td>{this.props.reservation.subject.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Wagty (Smenasy)</th>
                                    <td>{this.props.reservation.shift.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">SMS Ugradyldymy ?</th>
                                    <td>
                                        {
                                            this.props.reservation.is_sms_sent ?
                                                <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Jaň Edildimi ?</th>
                                    <td>
                                        {
                                            this.props.reservation.is_called ?
                                                <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Ýazyldymy ?</th>
                                    <td>
                                        {
                                            this.props.reservation.is_registered ?
                                                <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.reservation.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ýazga alan ulanyjy</th>
                                    <td>{this.props.reservation.user.username}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/reservations/" + this.props.reservation.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editReservation(this.props.reservation.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/reservations"}>
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
        reservation: state.reservations.currentReservation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editReservation: (id) => dispatch(editReservation(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationInfo)
