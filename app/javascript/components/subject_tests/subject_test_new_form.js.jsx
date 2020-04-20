import React from 'react'
import { connect } from 'react-redux'
import {
    postSubjectTest,
    fetchSubjectCategories,
    fetchSubjects,
    fetchLanguages
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class SubjectTestNewForm extends React.Component {
    constructor() {
        super();

        this.state = {
            applicant: '',
            season: '',
            subject: '',
            result: '',
            notes: '',
            errorMsg: ''
        }

        this.submitSubjectTest = this.submitSubjectTest.bind(this);
        this.setSubject = this.setSubject.bind(this);
        this.checkSubjectTestValidity = this.checkSubjectTestValidity.bind(this)
    }

    componentDidMount() {
        this.props.fetchSubjectCategories()
        this.props.fetchSubjects()

        this.setState({
            applicant: this.props.location.state.applicant,
            season: this.props.activeSeason
        })
    }

    checkSubjectTestValidity() {
        if (this.state.applicant == '' || this.state.season == '' || this.state.subject == '')
            return false;

        return true;
    }

    setSubject(subject) {
        this.setState({
            subject: subject
        })
    }

    submitSubjectTest() {

        if (!this.checkSubjectTestValidity()) {
            console.log("Form is invalid!");
            this.setState({
                errorMsg: "Ähli Maglumatlary Giriziň..."
            })
            return;
        }
        else {
            this.props.postSubjectTest({
                applicant_id: this.state.applicant.id,
                season_id: this.state.season.id,
                subject_id: this.state.subject.id,
                result: this.getResult.value,
                notes: this.getNotes.value,
            })
        }
    }


    render() {
        return (
            <div>

                <div className="card" style={{ width: '65rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Synag Goş &nbsp; &nbsp; &nbsp;
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
                                    <br />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.submitSubjectTest()}
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

                                                <div className="card" key={sc.title}>
                                                    <div className="card-header" id={`heading-${index}`}>
                                                        <h2 className="mb-0">
                                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                                                {sc.title}
                                                            </button>
                                                        </h2>
                                                    </div>

                                                    <div key={sc} id={`collapse-${index}`} className="collapse" aria-labelledby={`heading-${index}`} data-parent="#subjects-accordion">
                                                        <div className="card-body">
                                                            {
                                                                subjects.map(sub => {
                                                                    return (
                                                                        <button id={sub.id} key={`subject-${sub.title}`} type="button" className="btn btn-secondary" style={{ margin: 3 }} onClick={() => this.setSubject(sub)}>
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

                        <div className="form-group row">
                            <label htmlFor="result" className="col-sm-10 col-form-label">Netijesi</label>
                            <div className="col-sm-10">
                                <textarea type="text" id="result" name="result" className="form-control"
                                    ref={(input) => this.getResult = input}
                                />
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
        subjects: state.subjects.subjects,
        subject_categories: state.subject_categories.subject_categories,
        languages: state.languages.languages,
        activeSeason: state.seasons.activeSeason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postSubjectTest: (subject_test) => dispatch(postSubjectTest(subject_test)),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        fetchLanguages: () => dispatch(fetchLanguages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTestNewForm)