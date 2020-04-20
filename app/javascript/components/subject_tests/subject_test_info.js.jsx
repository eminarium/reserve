import React from 'react'
import { connect } from 'react-redux'

import {
    editSubjectTest,
    applicantInfo
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class SubjectTestInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

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
                                        <Link onClick={() => this.props.applicantInfo(this.props.subject_test.applicant.id)} to={"/applicants/" + this.props.subject_test.applicant.id} >
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
                                    <th scope="row">Synag Dersi</th>
                                    <td>{this.props.subject_test.subject.title}</td>
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
                                    <th scope="row">Ýazga alan ulanyjy</th>
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
        applicantInfo: (id) => dispatch(applicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTestInfo)
