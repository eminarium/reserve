import React from 'react'
import { connect } from 'react-redux'
import {
    fetchReservations,
    editReservation,
    reservationInfo,
    removeReservation,
    applicantInfo
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Reservations extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReservations()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="11">
                                Rezerwler
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diňleýji</th>
                            <th scope="col">Dersi</th>
                            <th scope="col">Wagty (Smena)</th>
                            <th scope="col">Bellenilen Senesi</th>
                            <th scope="col">Tapgyry</th>
                            <th scope="col">SMS ?</th>
                            <th scope="col">JAŇ ?</th>
                            <th scope="col">Ýazyldymy ?</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                                (
                                    <tr>
                                        <td colSpan="11">
                                            <div style={{ alignItems: 'center' }} >
                                                <img src={LoaderImage} />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (<tr><td></td></tr>)
                        }
                        {
                            (this.props.error) ?
                                (
                                    <tr>
                                        <td colSpan="11">
                                            <h3>
                                                {this.props.error}
                                            </h3>
                                        </td>
                                    </tr>
                                ) :
                                this.props.reservations.map((reservation, index) => {

                                    var reg_date = new Date(reservation.created_at)

                                    return (
                                        <tr key={reservation.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <Link onClick={() => this.props.applicantInfo(reservation.applicant.id)} to={"/applicants/" + reservation.applicant.id} >
                                                    {reservation.applicant.first_name} &nbsp;
                                                {reservation.applicant.last_name} &nbsp;
                                                {reservation.applicant.patronymic}
                                                </Link>
                                            </td>
                                            <td>
                                                {reservation.subject.title} &nbsp;
                                                ({reservation.subject.language.title})
                                        </td>
                                            <td>{reservation.shift.title}</td>
                                            <td>
                                                {reg_date.getDate() < 9 ? "0" : ""}{reg_date.getDate()}-
                                            {reg_date.getMonth() < 9 ? "0" : ""}{reg_date.getMonth() + 1}-
                                            {reg_date.getFullYear()}
                                            </td>
                                            <td>{reservation.season.order_no}</td>
                                            <td>
                                                {
                                                    reservation.is_sms_sent ?
                                                        <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    reservation.is_called ?
                                                        <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    reservation.is_registered ?
                                                        <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                                }
                                            </td>
                                            <td>{reservation.notes}</td>
                                            <td>
                                                <Link to={"/reservations/" + reservation.id}>
                                                    <button className="btn btn-primary"
                                                        onClick={() => this.props.reservationInfo(reservation.id)}
                                                    >
                                                        <i className="fa fa-info"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/reservations/" + reservation.id + "/edit"}>
                                                    <button className="btn btn-warning"
                                                        onClick={() => this.props.editReservation(reservation.id)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                    onClick={() => { if (window.confirm("Rezerwi bozmalymy ?")) this.props.removeReservation(reservation.id) }}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reservations: state.reservations.reservations,
        loading: state.reservations.loading,
        error: state.reservations.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReservations: () => dispatch(fetchReservations()),
        editReservation: (id) => dispatch(editReservation(id)),
        removeReservation: (id) => dispatch(removeReservation(id)),
        reservationInfo: (id) => dispatch(reservationInfo(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)

