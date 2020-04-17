import React from 'react'
import { connect } from 'react-redux'
import {
    postReservation,
    fetchSubjectCategories,
    fetchSubjects,
    fetchShifts
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';


class ReservationNewForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            applicant: '',
            season: '',
            shift: '',
            subject: '',
            is_registered: false,
            is_sms_sent: false,
            is_called: false,
            notes: '',
            errorMsg: ''
        }

        this.submitReservation = this.submitReservation.bind(this);
        this.setSubject = this.setSubject.bind(this);
        this.setShift = this.setShift.bind(this);
        this.checkReservationValidity = this.checkReservationValidity.bind(this)
    }

    componentDidMount() {
        this.props.fetchSubjectCategories()
        this.props.fetchSubjects()
        this.props.fetchShifts()

        this.setState({
            applicant: this.props.location.state.applicant,
            season: this.props.activeSeason
        })
    }

    checkReservationValidity() {
        if (this.state.applicant == '' || this.state.season == '' || this.state.subject == '' || this.state.shift == '')
            return false;

        return true;
    }

    setSubject(subject) {
        this.setState({
            subject: subject
        })
    }

    setShift(shift) {
        this.setState({
            shift: shift
        })
    }

    submitReservation() {

        if (!this.checkReservationValidity()) {
            console.log("Form is invalid!");
            this.setState({
                errorMsg: "Ähli Maglumatlary Giriziň..."
            })
            return;
        }
        else {
            this.props.postReservation({
                applicant_id: this.state.applicant.id,
                season_id: this.state.season.id,
                shift_id: this.state.shift.id,
                subject_id: this.state.subject.id,
                is_registered: this.state.is_registered,
                is_sms_sent: this.state.is_sms_sent,
                is_called: this.state.is_called,
                //notes: this.state.notes,
                notes: this.getNotes.value,
            })
        }

        if (!this.props.loading)
            this.props.history.push('/applicants/' + this.state.applicant.id)
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '65rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Rezerw Goş &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>

                        <br />
                        <div style={{ color: "red" }}>
                            {this.state.errorMsg}
                        </div>

                        <div className="card" style={{ marginBottom: "5px" }}>
                            <div className="card-body">
                                <ul>
                                    <li>
                                        Diňleýji : {this.state.applicant.first_name}  {this.state.applicant.last_name}
                                    </li>
                                    <li>
                                        Tapgyry : {this.state.season.title ? this.state.season.order_no : "*********"}
                                    </li>
                                    <li>
                                        Dersi : {
                                            this.state.subject.title ?
                                                this.state.subject.title :
                                                <span style={{ color: 'red', fontStyle: 'italic' }}>SAÝLANMADY...</span>
                                        }
                                    </li>
                                    <li>
                                        Wagty (Seans) : {
                                            this.state.shift.title ?
                                                this.state.shift.title :
                                                <span style={{ color: 'red', fontStyle: 'italic' }}>SAÝLANMADY...</span>
                                        }
                                    </li>
                                    <br />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.submitReservation()}
                                    >
                                        KABUL ET
                                    </button>
                                </ul>
                            </div>
                        </div>

                        <div className="card" style={{ float: "left", width: "25rem" }}>
                            <div className="card-header">
                                Dersler
                            </div>

                            <div className="card-body">
                                <div className="accordion" id='subjects-accordion'>
                                    {
                                        this.props.subject_categories.map((sc, index) => {

                                            var subjects = this.props.subjects.filter(subject => subject.subject_category.id == sc.id)

                                            return (

                                                <div className="card">
                                                    <div className="card-header" id={`heading-${index}`}>
                                                        <h2 className="mb-0">
                                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                                {sc.title}
                                                            </button>
                                                        </h2>
                                                    </div>

                                                    <div id={`collapse-${index}`} className="collapse" aria-labelledby={`heading-${index}`} data-parent="#subjects-accordion">
                                                        <div className="card-body">
                                                            {
                                                                subjects.map(sub => {
                                                                    return (
                                                                        <button id={sub.id} key={index} type="button" className="btn btn-secondary" style={{ margin: 3 }} onClick={() => this.setSubject(sub)}>
                                                                            {sub.title}
                                                                        </button>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="card" style={{ width: "15rem", float: "left", marginLeft: "5px", marginRight: "5px" }}>
                            <div className="card-header">
                                Wagtlar (Smenalar)
                            </div>

                            <div className="card-body">
                                <div className="btn-group-vertical">
                                    {
                                        this.props.shifts.map((shift, index) => {

                                            return (
                                                <button id={shift.id} key={index} type="button" className="btn btn-secondary" style={{ margin: 3 }} onClick={() => this.setShift(shift)}>
                                                    {shift.title}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                            <div className="col-sm-10">
                                <textarea type="text" id="notes" name="notes" className="form-control"
                                    ref={(input) => this.getNotes = input}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.subjects.loading,
        error: state.subjects.error,
        shifts: state.shifts.shifts,
        subjects: state.subjects.subjects,
        subject_categories: state.subject_categories.subject_categories,
        seasons: state.seasons.seasons,
        activeSeason: state.seasons.activeSeason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postReservation: (reservation) => dispatch(postReservation(reservation)),
        //fetchSeasons: () => dispatch(fetchSeasons()),
        fetchShifts: () => dispatch(fetchShifts()),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationNewForm)