import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { connect } from 'react-redux'
import {
    fetchReservations,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

import LoaderImage from 'images/loader.gif'

class ReservationsReportList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.fetchReservations(
            0,
            this.props.location.state.shift_id,
            this.props.location.state.subject_id,
        )
    }

    render() {
        return (
            <div>
                <Link to={"/reservations"}>
                    <button className="btn btn-primary">
                        <i className="fa fa-list"></i>
                    </button>
                </Link>
                &nbsp;&nbsp;
                <ReactHTMLTableToExcel
                    className="btn btn-info"
                    table="reservations"
                    filename="Rezerwler"
                    sheet="Reserves"
                    buttonText="Excel Hasabat"
                />

                <table className="table table-hover" id="reservations">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="13">
                                REZERWLER
                                {
                                    this.props.location.state.shift_id != -1 ?
                                        (" / " + this.props.shift) : " / Ähli Wagtlar (Smenalar)"
                                }
                                {
                                    this.props.location.state.subject_id != -1 ?
                                        (" / " + this.props.subject) : " / Ähli Dersler"
                                }
                                {" / JEMI : " + this.props.reservations.length + " rezerw..."}
                            </th>
                        </tr>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diňleýji</th>
                            <th scope="col">Öý Tel. Belgisi</th>
                            <th scope="col">Mobil Tel. Belgisi</th>
                            <th scope="col">Dersi</th>
                            <th scope="col">Wagty (Smena)</th>
                            <th scope="col">Bellenen Senesi</th>
                            <th scope="col">Tapgyry</th>
                            <th scope="col">SMS ?</th>
                            <th scope="col">JAŇ ?</th>
                            <th scope="col">Ýazyldymy ?</th>
                            <th scope="col">Bellän Ulanyjy</th>
                            <th scope="col">Teswiri</th>
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
                            this.props.reservations.map((reservation, index) => {

                                var reg_date = new Date(reservation.created_at)

                                return (
                                    <tr key={reservation.id}>
                                        <th scope="row">{(index + 1)}</th>
                                        <td>
                                            {reservation.applicant.first_name} &nbsp;
                                            {reservation.applicant.last_name} &nbsp;
                                            {reservation.applicant.patronymic}
                                        </td>
                                        <td>{reservation.applicant.home_phone}</td>
                                        <td>{reservation.applicant.mobile_phone}</td>
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
                                                    "Yes" :
                                                    "No"
                                            }
                                        </td>
                                        <td>
                                            {
                                                reservation.is_called ?
                                                    "Yes" :
                                                    "No"
                                            }
                                        </td>
                                        <td>
                                            {
                                                reservation.is_registered ?
                                                    "Yes" :
                                                    "No"
                                            }
                                        </td>
                                        <td>{reservation.user.username}</td>
                                        <td>{reservation.notes}</td>
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
        shift: (state.reservations.reservations[0]) ? state.reservations.reservations[0].shift.title : "",
        subject: (state.reservations.reservations[0]) ? state.reservations.reservations[0].subject.title : "",
        loading: state.reservations.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReservations: (pg, shift_id, subject_id) => dispatch(fetchReservations(pg, shift_id, subject_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsReportList)

