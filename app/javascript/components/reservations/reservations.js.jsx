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
            no_params_error: '',
            shift_id: -1,
            subject_id: -1
        }

        this.getFilteredReservations = this.getFilteredReservations.bind(this)
        this.clearFilterParams = this.clearFilterParams.bind(this)
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
        var shift_id = document.getElementById('filter-form').elements['shift_id'].value
        var subject_id = document.getElementById('filter-form').elements['subject_id'].value

        this.setState({
            page: page,
            shift_id: shift_id,
            subject_id: subject_id,
        })
        this.props.fetchReservations(page, this.state.shift_id, this.state.subject_id)
    }

    loadPrevPage() {
        var currentPage = this.state.page
        var prevPage = (currentPage > 1) ? (currentPage - 1) : currentPage

        var shift_id = document.getElementById('filter-form').elements['shift_id'].value
        var subject_id = document.getElementById('filter-form').elements['subject_id'].value

        this.setState({
            page: prevPage,
            shift_id: shift_id,
            subject_id: subject_id,
        })
        this.props.fetchReservations(prevPage, this.state.shift_id, this.state.subject_id)
    }

    loadNextPage() {
        var currentPage = this.state.page
        var nextPage = (currentPage < this.props.pages) ? (currentPage + 1) : currentPage

        var shift_id = document.getElementById('filter-form').elements['shift_id'].value
        var subject_id = document.getElementById('filter-form').elements['subject_id'].value

        this.setState({
            page: nextPage,
            shift_id: shift_id,
            subject_id: subject_id,
        })
        this.props.fetchReservations(nextPage, this.state.shift_id, this.state.subject_id)
    }

    loadLastPage() {

        var shift_id = document.getElementById('filter-form').elements['shift_id'].value
        var subject_id = document.getElementById('filter-form').elements['subject_id'].value

        this.setState({
            page: this.props.pages,
            shift_id: shift_id,
            subject_id: subject_id,
        })
        this.props.fetchReservations(this.props.pages, this.state.shift_id, this.state.subject_id)
    }

    loadFirstPage() {

        var shift_id = document.getElementById('filter-form').elements['shift_id'].value
        var subject_id = document.getElementById('filter-form').elements['subject_id'].value

        this.setState({
            page: 1,
            shift_id: shift_id,
            subject_id: subject_id,
        })
        this.props.fetchReservations(1, this.state.shift_id, this.state.subject_id)
    }

    getFilteredReservations(event) {

        event.preventDefault()

        this.setState({
            page: 1,
            shift_id: event.target.shift_id.value,
            subject_id: event.target.subject_id.value,
        })

        if (event.target.shift_id.selectedIndex === 0 && event.target.subject_id.selectedIndex === 0) {
            //this.props.emptyApplicants()
            this.setState({ no_params_error: "Gözleg maglumatlary girizilmedi ..." })
            this.props.fetchReservations()
            return false;
        }
        else {
            this.setState({ no_params_error: '' })

            this.props.fetchReservations(
                1,
                event.target.shift_id.options[event.target.shift_id.selectedIndex].value,
                event.target.subject_id.options[event.target.subject_id.selectedIndex].value,
            )
        }

    }

    clearFilterParams() {
        document.getElementById('filter-form').elements['shift_id'].selectedIndex = 0
        document.getElementById('filter-form').elements['subject_id'].selectedIndex = 0
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
                                Rezerwler &nbsp; &nbsp; &nbsp;
                                {
                                    this.state.no_params_error != '' ?
                                        <span style={{ color: 'red', fontStyle: 'italic' }}>
                                            {" : " + this.state.no_params_error}
                                        </span>
                                        : ""
                                }
                            </th>
                        </tr>

                        <tr>
                            <th scope="col" colSpan="9">
                                <form noValidate onSubmit={this.getFilteredReservations} id="filter-form">
                                    <div className="row">

                                        <div className="col">
                                            <select className="custom-select" id="shift_id" name="shift_id">
                                                <option value={-1} key="no-shift">
                                                    Wagt (Seans) Saýlaň
                                                </option>
                                                {
                                                    this.props.shifts.map(shift => {
                                                        return (
                                                            <option value={shift.id} key={shift.title}>
                                                                {shift.title}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col">
                                            <select className="custom-select" id="subject_id" name="subject_id">
                                                <option value={-1} key="no-subject">
                                                    Ders Saýlaň
                                                </option>
                                                {
                                                    this.props.subjects.map(subject => {
                                                        return (
                                                            <option value={subject.id} key={subject.title}>
                                                                {subject.title}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col">
                                            <button className="btn btn-info">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </th>
                            <th scope="col">
                                <button className="btn btn-warning"
                                    onClick={this.clearFilterParams}
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                            </th>
                        </tr>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diňleýji</th>
                            <th scope="col">Dersi</th>
                            <th scope="col"><i className="fa fa-clock-o" style={{ fontSize: 24 }}></i></th>
                            <th scope="col"><i className="fa fa-calendar" style={{ fontSize: 24 }}></i></th>
                            <th scope="col">Tapgyry</th>
                            <th scope="col">SMS ?</th>
                            <th scope="col">JAŇ ?</th>
                            <th scope="col">Ýazyldymy ?</th>
                            <th scope="col"><i className="fa fa-user" style={{ fontSize: 24 }}></i></th>
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
                                            <td>{reservation.user.username}</td>
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
        shifts: state.shifts.shifts,
        subjects: state.subjects.subjects,
        pages: state.reservations.pages,
        loading: state.reservations.loading,
        error: state.reservations.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReservations: (pg, shift_id, subject_id) => dispatch(fetchReservations(pg, shift_id, subject_id)),
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

