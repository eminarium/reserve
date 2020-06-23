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
    toggleReservationIsRegistered,
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
            subject_id: -1,
            is_sms_sent: -1,
            is_called: -1,
            is_registered: -1
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
        this.setState({
            page: page,
        })
        this.props.fetchReservations(page, this.getShiftId.value, this.getSubjectId.value, this.getIsSMSSent.value, this.getIsCalled.value, this.getIsRegistered.value)
    }

    loadPrevPage() {
        var currentPage = this.state.page
        var prevPage = (currentPage > 1) ? (currentPage - 1) : currentPage

        this.setState({
            page: prevPage,
        })
        this.props.fetchReservations(prevPage, this.getShiftId.value, this.getSubjectId.value, this.getIsSMSSent.value, this.getIsCalled.value, this.getIsRegistered.value)
    }

    loadNextPage() {
        var currentPage = this.state.page
        var nextPage = (currentPage < this.props.pages) ? (currentPage + 1) : currentPage

        this.setState({
            page: nextPage,
        })
        this.props.fetchReservations(nextPage, this.getShiftId.value, this.getSubjectId.value, this.getIsSMSSent.value, this.getIsCalled.value, this.getIsRegistered.value)
    }

    loadLastPage() {

        this.setState({
            page: this.props.pages,
        })
        this.props.fetchReservations(this.props.pages, this.getShiftId.value, this.getSubjectId.value, this.getIsSMSSent.value, this.getIsCalled.value, this.getIsRegistered.value)
    }

    loadFirstPage() {

        this.setState({
            page: 1,
        })
        this.props.fetchReservations(1, this.getShiftId.value, this.getSubjectId.value, this.getIsSMSSent.value, this.getIsCalled.value, this.getIsRegistered.value)
    }

    getFilteredReservations() {

        if (this.getShiftId.value == -1 && this.getSubjectId.value == -1 && this.getIsSMSSent.value == -1 && this.getIsCalled.value == -1 && this.getIsRegistered.value == -1) {
            this.setState({ no_params_error: "Gözleg maglumatlary girizilmedi ..." })
            this.props.fetchReservations(1)
        }
        else {
            this.setState({ no_params_error: '' })

            this.props.fetchReservations(
                1,
                this.getShiftId.value,
                this.getSubjectId.value,
                this.getIsSMSSent.value,
                this.getIsCalled.value,
                this.getIsRegistered.value
            )
        }

        this.setState({
            shift_id: this.getShiftId.value,
            subject_id: this.getSubjectId.value,
            is_sms_sent: this.getIsSMSSent.value,
            is_called: this.getIsCalled.value,
            is_registered: this.getIsRegistered.value
        })
    }

    clearFilterParams() {
        this.getShiftId.value = -1
        this.getSubjectId.value = -1
        this.getIsSMSSent.value = -1
        this.getIsCalled.value = -1
        this.getIsRegistered.value = -1

        this.getFilteredReservations()
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
                            <th scope="col" colSpan="12">
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
                            <th scope="col" colSpan="10">
                                <form noValidate id="filter-form">
                                    <div className="row">

                                        <div className="col">
                                            <select className="custom-select" id="shift_id" name="shift_id"
                                                onChange={this.getFilteredReservations}
                                                ref={value => this.getShiftId = value}
                                            >
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
                                            <select className="custom-select" id="subject_id" name="subject_id"
                                                onChange={this.getFilteredReservations}
                                                ref={value => this.getSubjectId = value}
                                            >
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
                                            <select className="custom-select" id="is_sms_sent" name="is_sms_sent"
                                                onChange={this.getFilteredReservations}
                                                ref={value => this.getIsSMSSent = value}
                                            >
                                                <option value={-1} key="sms-1">
                                                    SMS Ugradyldymy
                                                </option>
                                                <option value="true" key="sms-2">
                                                    Hawa
                                                </option>
                                                <option value="false" key="sms-3">
                                                    Ýok
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col">
                                            <select className="custom-select" id="is_called" name="is_called"
                                                onChange={this.getFilteredReservations}
                                                ref={value => this.getIsCalled = value}
                                            >
                                                <option value={-1} key="jan-1">
                                                    Jaň Edildimi
                                                </option>
                                                <option value="true" key="jan-2">
                                                    Hawa
                                                </option>
                                                <option value="false" key="jan-3">
                                                    Ýok
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col">
                                            <select className="custom-select" id="is_registered" name="is_registered"
                                                onChange={this.getFilteredReservations}
                                                ref={value => this.getIsRegistered = value}
                                            >
                                                <option value={-1} key="reg-1">
                                                    Ýazyldymy
                                                </option>
                                                <option value="true" key="reg-2">
                                                    Hawa
                                                </option>
                                                <option value="false" key="reg-3">
                                                    Ýok
                                                </option>
                                            </select>
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
                            <th scope="col">
                                <Link
                                    to={{
                                        pathname: "/reservations/report-list",
                                        state: {
                                            shift_id: this.state.shift_id,
                                            subject_id: this.state.subject_id,
                                            is_sms_sent: this.state.is_sms_sent,
                                            is_called: this.state.is_called,
                                            is_registered: this.state.is_registered
                                        }
                                    }}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-file-excel-o"></i>
                                    </button>
                                </Link>
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
                                                        onClick={() => {
                                                                this.props.fetchApplicantInfo(reservation.applicatn)
                                                                this.props.reservationInfo(reservation.id)
                                                            }
                                                        }
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
        fetchReservations: (pg, shift_id, subject_id, is_sms_sent, is_called, is_registered) => dispatch(fetchReservations(pg, shift_id, subject_id, is_sms_sent, is_called, is_registered)),
        editReservation: (id) => dispatch(editReservation(id)),
        removeReservation: (id) => dispatch(removeReservation(id)),
        reservationInfo: (id) => dispatch(reservationInfo(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id)),
        fetchApplicantInfo: (id) => dispatch(fetchApplicantInfo(id)),
        toggleReservationSMS: (reservation) => dispatch(toggleReservationSMS(reservation)),
        toggleReservationIsCalled: (reservation) => dispatch(toggleReservationIsCalled(reservation)),
        toggleReservationIsRegistered: (reservation) => dispatch(toggleReservationIsRegistered(reservation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations)

