import React from 'react'
import { connect } from 'react-redux'
import {
    fetchApplicantSubjectTests,
    editSubjectTest,
    subjectTestInfo,
    removeSubjectTest
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class ApplicantSubjectTests extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchApplicantSubjectTests(this.props.applicant.id)
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="8">
                                Synaglar
                            </th>
                            <th>
                                <Link to={{ pathname: "/applicants/" + this.props.applicant.id + "/subject_tests/new", state: { applicant: this.props.applicant } }}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link>
                                &nbsp;
                                <button className="btn btn-warning" onClick={() => this.props.fetchSubjectTests()}>
                                    <i className="fa fa-refresh"></i>
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diňleýji</th>
                            <th scope="col">Dersi</th>
                            <th scope="col"><i className="fa fa-calendar" style={{ fontSize: 24 }}></i></th>
                            <th scope="col">Netijesi</th>
                            <th scope="col">Tapgyry</th>
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
                                        <td colSpan="9">
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
                                        <td colSpan="9">
                                            <h3>
                                                {this.props.error}
                                            </h3>
                                        </td>
                                    </tr>
                                ) :
                                this.props.subject_tests.map((subject_test, index) => {

                                    var reg_date = new Date(subject_test.created_at)

                                    return (
                                        <tr key={subject_test.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {subject_test.applicant.first_name} &nbsp;
                                            {subject_test.applicant.last_name} &nbsp;
                                            {subject_test.applicant.patronymic}
                                            </td>
                                            <td>
                                                {subject_test.subject.title} &nbsp;
                                            ({subject_test.subject.language.title})
                                        </td>
                                            <td>
                                                {reg_date.getDate() < 9 ? "0" : ""}{reg_date.getDate()}-
                                            {reg_date.getMonth() < 9 ? "0" : ""}{reg_date.getMonth() + 1}-
                                            {reg_date.getFullYear()}
                                            </td>
                                            <td>{subject_test.result}</td>
                                            <td>{subject_test.season.order_no}</td>
                                            <td>{subject_test.user.username}</td>
                                            <td>{subject_test.notes}</td>
                                            <td>
                                                <Link to={"/subject_tests/" + subject_test.id}>
                                                    <button className="btn btn-primary"
                                                        onClick={() => this.props.subjectTestInfo(subject_test.id)}
                                                    >
                                                        <i className="fa fa-info"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/subject_tests/" + subject_test.id + "/edit"}>
                                                    <button className="btn btn-warning"
                                                        onClick={() => this.props.editSubjectTest(subject_test.id)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                    onClick={() => { if (window.confirm("Synagy bozmalymy ?")) this.props.removeSubjectTest(subject_test.id) }}
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
        subject_tests: state.subject_tests.subject_tests.filter(subject_test => subject_test.applicant.id === state.applicants.currentApplicant.id),
        loading: state.subject_tests.loading,
        error: state.subject_tests.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchApplicantSubjectTests: (applicant_id) => dispatch(fetchApplicantSubjectTests(applicant_id)),
        editSubjectTest: (id) => dispatch(editSubjectTest(id)),
        removeSubjectTest: (id) => dispatch(removeSubjectTest(id)),
        subjectTestInfo: (id) => dispatch(subjectTestInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantSubjectTests)

