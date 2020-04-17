import React from 'react'
import { connect } from 'react-redux'

import {
    fetchApplicants,
    fetchSubjectCategories,
    fetchSubjects,
    fetchReservations,
    fetchShifts,
    fetchLanguages
} from '../redux-store'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchApplicants()
        this.props.fetchSubjectCategories()
        this.props.fetchSubjects()
        this.props.fetchReservations()
        this.props.fetchShifts()
        this.props.fetchLanguages()
    }

    render() {
        return (
            <div>
                <h1>WELCOME ABOARD !</h1>
                <br /><br /><br />

                <div className="container">
                    <div className="row">

                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Aktiw Tapgyr
                                    <span className="badge badge-primary badge-pill">{this.props.activeSeason.order_no}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Jemi Müşderi
                                    {
                                        (this.props.applicants.length == 0) ?
                                            (
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            )
                                            :
                                            <span className="badge badge-primary badge-pill">{this.props.applicants.length}</span>
                                    }
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Jemi Rezerw
                                    {
                                        (this.props.reservations.length == 0) ?
                                            (
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            )
                                            :
                                            <span className="badge badge-primary badge-pill">{this.props.reservations.length}</span>
                                    }
                                </li>
                            </ul>
                        </div>

                        <div className="col">
                            <ul className="list-group">
                                {
                                    (this.props.shifts.length == 0 || this.props.reservations.length == 0) ?
                                        (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        )
                                        :
                                        this.props.shifts.map(shift => {
                                            return (
                                                <li key={shift.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {shift.title}
                                                    <span className="badge badge-primary badge-pill">
                                                        {
                                                            this.props.reservations.filter(reservation => reservation.shift.id == shift.id).length
                                                        }
                                                    </span>
                                                </li>
                                            )
                                        })
                                }
                            </ul>
                        </div>

                        <div className="col">
                            <ul className="list-group">
                                {
                                    (this.props.subjects.length == 0 || this.props.reservations.length == 0) ?
                                        (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        )
                                        :
                                        this.props.subjects.map(subject => {
                                            return (
                                                <li key={subject.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {subject.title}
                                                    <span className="badge badge-primary badge-pill">
                                                        {
                                                            this.props.reservations.filter(reservation => reservation.subject.id == subject.id).length
                                                        }
                                                    </span>
                                                </li>
                                            )
                                        })
                                }
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applicants: state.applicants.applicants,
        reservations: state.reservations.reservations,
        subject_categories: state.subject_categories.subject_categories,
        subjects: state.subjects.subjects,
        shifts: state.shifts.shifts,
        languages: state.languages.languages,
        activeSeason: state.seasons.activeSeason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchApplicants: () => dispatch(fetchApplicants()),
        fetchReservations: () => dispatch(fetchReservations()),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchShifts: () => dispatch(fetchShifts()),
        fetchLanguages: () => dispatch(fetchLanguages())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)