import React from 'react'
import { connect } from 'react-redux'
import {
    fetchApplicants,
    fetchSubjectCategories,
    fetchSubjects,
    fetchReservations,
    fetchShifts,
    fetchLanguages
} from '../../redux-store'

import LoaderImage from 'images/loader.gif'

class ReservationsReportDetailed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.fetchApplicants()
        this.props.fetchReservations()
        this.props.fetchSubjectCategories()
        this.props.fetchSubjects()
        this.props.fetchShifts()
        //this.props.fetchLanguages()
    }

    render() {

        return (
            <div>

                <table className="table table-hover" id="reservations">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="13">
                                REZERWLER | Jemi (SMS Ugradylan / Jaň Edilen / Ýazylan)
                            </th>
                        </tr>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ders</th>
                            <th scope="col">Jemi</th>
                            {
                                this.props.shifts.map(shift => {
                                    return (
                                        <th scope="col">{shift.title}</th>
                                    )
                                })
                            }
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
                            (this.props.loading) ?
                                (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )
                                :
                                this.props.subject_categories.map(sc => {
                                    return (
                                        <React.Fragment>
                                            <tr><th colSpan="8">{sc.title}</th></tr>
                                            {
                                                this.props.subjects.filter(subject => subject.subject_category.id == sc.id).map((subject, index) => {
                                                    var total = this.props.reservations.filter(reservation => reservation.subject.id == subject.id)
                                                    var is_sms_sent = total.filter(reservation => reservation.is_sms_sent == true)
                                                    var is_called = total.filter(reservation => reservation.is_called == true)
                                                    var is_registered = total.filter(reservation => reservation.is_registered == true)
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{subject.title}</td>
                                                            <td>
                                                                <span class="badge badge-primary">
                                                                    {total.length} &nbsp;
                                                                    ({is_sms_sent.length} / {is_called.length} / {is_registered.length})
                                                                </span>
                                                            </td>
                                                            {
                                                                this.props.shifts.map(shift => {
                                                                    var shift_total = this.props.reservations.filter(reservation => (reservation.subject.id == subject.id && reservation.shift.id == shift.id))
                                                                    var is_sms_sent = shift_total.filter(reservation => reservation.is_sms_sent == true)
                                                                    var is_called = shift_total.filter(reservation => reservation.is_called == true)
                                                                    var is_registered = shift_total.filter(reservation => reservation.is_registered == true)
                                                                    return (
                                                                        <td>
                                                                            {shift_total.length} &nbsp;
                                                                            ({is_sms_sent.length} / {is_called.length} / {is_registered.length})
                                                                        </td>
                                                                    )
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </React.Fragment>
                                    )
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
        //applicants: state.applicants.applicants,
        reservations: state.reservations.reservations,
        loading: state.reservations.loading,
        subject_categories: state.subject_categories.subject_categories,
        subjects: state.subjects.subjects,
        shifts: state.shifts.shifts,
        //languages: state.languages.languages,
        //activeSeason: state.seasons.activeSeason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchApplicants: () => dispatch(fetchApplicants()),
        fetchReservations: () => dispatch(fetchReservations()),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchShifts: () => dispatch(fetchShifts()),
        //fetchLanguages: () => dispatch(fetchLanguages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsReportDetailed)

