import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchReservations,
    editReservation,
    reservationInfo,
    removeReservation
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
                            <th scope="col" colSpan="8">
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
                                    <td colSpan="8">
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
                                    <td colSpan="8">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.reservations.map((reservation, index) => {
                                return (
                                    <tr key={reservation.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            {reservation.applicant.first_name} 
                                            {reservation.applicant.last_name} 
                                            {reservation.applicant.patronymic} 
                                        </td>
                                        <td>
                                            {reservation.subject.title}
                                            ({reservation.subject.language.title})
                                        </td>
                                        <td>{reservation.shift.title}</td>
                                        <td>{reservation.reg_datetime}</td>
                                        <td>{reservation.season.order_no}</td>
                                        <td>{reservation.is_sms_sent}</td>
                                        <td>{reservation.is_called}</td>
                                        <td>{reservation.is_registered}</td>
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
        reservationInfo: (id) => dispatch(reservationInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)

