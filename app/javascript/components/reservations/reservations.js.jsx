import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux'
import {
    fetchReservations,
    editReservation,
    reservationInfo,
    removeReservation,
    applicantInfo,
    fetchApplicantInfo,
    toggleReservationSMS,
    toggleReservationIsCalled,
    toggleReservationIsRegistered
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Reservations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        }

        this.handlePageChange = this.handlePageChange.bind(this)
        this.loadFirstPage = this.loadFirstPage.bind(this)
        this.loadLastPage = this.loadLastPage.bind(this)
        this.loadNextPage = this.loadNextPage.bind(this)
        this.loadPrevPage = this.loadPrevPage.bind(this)
    }

    componentDidMount() {
        this.props.fetchReservations(this.state.page)
    }


    handlePageChange(page) {
        this.setState({ page: page })
        this.props.fetchReservations(page)
    }

    loadPrevPage() {
        var currentPage = this.state.page
        var prevPage = (currentPage > 1) ? (currentPage - 1) : currentPage
        this.setState({ page: prevPage })
        this.props.fetchReservations(prevPage)
    }

    loadNextPage() {
        var currentPage = this.state.page
        var nextPage = (currentPage < this.props.pages) ? (currentPage + 1) : currentPage
        this.setState({ page: nextPage })
        this.props.fetchReservations(nextPage)
    }

    loadLastPage() {
        this.setState({ page: this.props.pages })
        this.props.fetchReservations(this.props.pages)
    }

    loadFirstPage() {
        this.setState({ page: 1 })
        this.props.fetchReservations(1)
    }

    render() {


        let items = []
        let activePage = this.state.page
        let totalPages = this.props.pages


        if (totalPages <= 10) {
            for (let number = 1; number <= totalPages; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                )
            }
        } else {

            if (activePage <= 3 || activePage >= totalPages - 2) {

                for (let number = 1; number <= 3; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }
                items.push(
                    <Pagination.Ellipsis key="middle" disabled />
                )
                for (let number = totalPages - 3; number <= totalPages; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }
            }
            else {

                items.push(
                    <Pagination.Ellipsis key="start" disabled />
                )

                for (let number = activePage - 2; number <= activePage + 2; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }

                items.push(
                    <Pagination.Ellipsis key="end" disabled />
                )
            }

        }

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
                                            <th scope="row">{(this.state.page - 1) * 10 + (index + 1)}</th>
                                            <td>
                                                <Link onClick={() => this.props.fetchApplicantInfo(reservation.applicant.id)} to={"/applicants/" + reservation.applicant.id} >
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
                                                        <i className="fa fa-check" onClick={() => this.props.toggleReservationSMS(reservation)} style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" onClick={() => this.props.toggleReservationSMS(reservation)} style={{ color: 'red', fontSize: 20 }}></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    reservation.is_called ?
                                                        <i className="fa fa-check" onClick={() => this.props.toggleReservationIsCalled(reservation)} style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" onClick={() => this.props.toggleReservationIsCalled(reservation)} style={{ color: 'red', fontSize: 20 }}></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    reservation.is_registered ?
                                                        <i className="fa fa-check" onClick={() => this.props.toggleReservationIsRegistered(reservation)} style={{ color: 'green', fontSize: 20 }}></i> :
                                                        <i className="fa fa-times" onClick={() => this.props.toggleReservationIsRegistered(reservation)} style={{ color: 'red', fontSize: 20 }}></i>
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

                <Pagination>
                    <Pagination.First onClick={() => this.loadFirstPage()} />
                    <Pagination.Prev onClick={() => this.loadPrevPage()} />
                    {items}
                    <Pagination.Next onClick={() => this.loadNextPage()} />
                    <Pagination.Last onClick={() => this.loadLastPage()} />
                </Pagination>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reservations: state.reservations.reservations,
        pages: state.reservations.pages,
        loading: state.reservations.loading,
        error: state.reservations.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReservations: (pg) => dispatch(fetchReservations(pg)),
        editReservation: (id) => dispatch(editReservation(id)),
        removeReservation: (id) => dispatch(removeReservation(id)),
        reservationInfo: (id) => dispatch(reservationInfo(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id)),
        fetchApplicantInfo: (id) => dispatch(fetchApplicantInfo(id)),
        toggleReservationSMS: (reservation) => dispatch(toggleReservationSMS(reservation)),
        toggleReservationIsCalled: (reservation) => dispatch(toggleReservationIsCalled(reservation)),
        toggleReservationIsRegistered: (reservation) => dispatch(toggleReservationIsRegistered(reservation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)

