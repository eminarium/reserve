import React from 'react'
import { connect } from 'react-redux'
import {
    updateSubjectTest,
    fetchSubjectCategories,
    fetchSubjects,
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

class SubjectTestEditForm extends React.Component {
    constructor(props) {
        super(props);

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
        this.setResult = this.setResult.bind(this);
        this.checkSubjectTestValidity = this.checkSubjectTestValidity.bind(this)
        this.setNotes = this.setNotes.bind(this)
    }

    componentDidMount() {
        this.props.fetchSubjectCategories()
        this.props.fetchSubjects()

        this.setState({
            applicant: this.props.subject_test.applicant,
            season: this.props.activeSeason,
            result: this.props.subject_test.result,
            subject: this.props.subject_test.subject
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

    setResult(e) {
        this.setState({
            result: e.target.result.value
        })
    }

    setNotes(e) {
        this.setState({
            notes: e.target.notes.value
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
            this.props.updateSubjectTest({
                id: this.props.subject_test.id,
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
                            Synag Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
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

                                                <div className="card" key={sc.id}>
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
                                                                        <button id={sub.id} key={sub.title} type="button" className="btn btn-secondary" style={{ margin: 3 }} onClick={() => this.setSubject(sub)}>
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

                        <form noValidate>
                            <div className="form-group row">
                                <label htmlFor="result" className="col-sm-10 col-form-label">Netijesi</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="result" name="result" className="form-control"
                                        defaultValue={this.props.subject_test.result}
                                        //onChange={() => this.setState({ notes: this.value })}
                                        ref={(input) => this.getResult = input}
                                    />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control"
                                        defaultValue={this.props.subject_test.notes}
                                        //onChange={() => this.setState({ notes: this.value })}
                                        ref={(input) => this.getNotes = input}
                                    />
                                </div>
                            </div>
                        </form>

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
        seasons: state.seasons.seasons,
        activeSeason: state.seasons.activeSeason,
        subject_test: state.subject_tests.subject_tests.find(subject_test => subject_test.id == state.subject_tests.editingSubjectTestId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSubjectTest: (subject_test) => dispatch(updateSubjectTest(subject_test)),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTestEditForm)