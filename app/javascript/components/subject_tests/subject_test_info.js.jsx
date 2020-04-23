import React from 'react'
import { connect } from 'react-redux'

import {
    editSubjectTest,
    applicantInfo,
    fetchApplicantInfo
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class SubjectTestInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var reg_date = new Date(this.props.subject_test.created_at)

        return (
            <div>
                <br />

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Synag Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Diňleýji</th>
                                    <td>
                                        <Link onClick={() => this.props.fetchApplicantInfo(this.props.subject_test.applicant.id)} to={"/applicants/" + this.props.subject_test.applicant.id} >
                                            {this.props.subject_test.applicant.first_name} &nbsp;
                                            {this.props.subject_test.applicant.last_name} &nbsp;
                                            {this.props.subject_test.applicant.patronymic}
                                        </Link>

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Tapgyry</th>
                                    <td>{this.props.subject_test.season.order_no}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dersi</th>
                                    <td>
                                        {this.props.subject_test.subject.title} &nbsp;
                                        ({this.props.subject_test.subject.language.title})
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="fa fa-calendar" style={{ fontSize: 24 }}></i></th>
                                    <td>
                                        {reg_date.getDate() < 9 ? "0" : ""}{reg_date.getDate()}-
                                        {reg_date.getMonth() < 9 ? "0" : ""}{reg_date.getMonth() + 1}-
                                        {reg_date.getFullYear()}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Netijesi</th>
                                    <td>{this.props.subject_test.result}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.subject_test.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="fa fa-user" style={{ fontSize: 24 }}></i></th>
                                    <td>{this.props.subject_test.user.username}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/subject_tests/" + this.props.subject_test.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editSubjectTest(this.props.subject_test.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/subject_tests"}>
                                            <button className="btn btn-primary">
                                                <i className="fa fa-list"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subject_test: state.subject_tests.currentSubjectTest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editSubjectTest: (id) => dispatch(editSubjectTest(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id)),
        fetchApplicantInfo: (id) => dispatch(fetchApplicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTestInfo)
