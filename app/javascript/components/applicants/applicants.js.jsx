import React from 'react'
import { connect } from 'react-redux'
import {
    fetchApplicants,
    editApplicant,
    applicantInfo,
    removeApplicant
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Applicants extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchApplicants()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="11">
                                Müşderiler
                            </th>
                            <th>
                                <Link to={"/applicants/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ady</th>
                            <th scope="col">Familiýasy</th>
                            <th scope="col">Atasynyň Ady</th>
                            <th scope="col">Synpy</th>
                            <th scope="col">Ýaşy</th>
                            <th scope="col"><i className="fa fa-phone" style={{ fontSize: 24 }}></i></th>
                            <th scope="col"><i className="fa fa-mobile" style={{ fontSize: 24 }}></i></th>
                            <th scope="col"><i className="fa fa-calendar" style={{ fontSize: 24 }}></i></th>
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
                                        <td colSpan="12">
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
                                        <td colSpan="12">
                                            <h3>
                                                {this.props.error}
                                            </h3>
                                        </td>
                                    </tr>
                                ) :
                                this.props.applicants.map((applicant, index) => {

                                    var reg_date = new Date(applicant.created_at)

                                    return (
                                        <tr key={applicant.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{applicant.first_name}</td>
                                            <td>{applicant.last_name}</td>
                                            <td>{applicant.patronymic}</td>
                                            <td>{applicant.school_grade}</td>
                                            <td>{applicant.age}</td>
                                            <td>{applicant.home_phone}</td>
                                            <td>{applicant.mobile_phone}</td>
                                            <td>
                                                {reg_date.getDate() < 9 ? "0" : ""}{reg_date.getDate()}-
                                                {reg_date.getMonth() < 9 ? "0" : ""}{reg_date.getMonth() + 1}-
                                                {reg_date.getFullYear()}                                         
                                            </td>
                                            <td>{applicant.user.username}</td>
                                            <td>{applicant.notes}</td>
                                            <td>
                                                <Link to={"/applicants/" + applicant.id}>
                                                    <button className="btn btn-primary"
                                                        onClick={() => this.props.applicantInfo(applicant.id)}
                                                    >
                                                        <i className="fa fa-info"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/applicants/" + applicant.id + "/edit"}>
                                                    <button className="btn btn-warning"
                                                        onClick={() => this.props.editApplicant(applicant.id)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                </Link>
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                    onClick={() => { if (window.confirm("Müşderini bozmalymy ?")) this.props.removeApplicant(applicant.id) }}
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
        applicants: state.applicants.applicants,
        loading: state.applicants.loading,
        error: state.applicants.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchApplicants: () => dispatch(fetchApplicants()),
        editApplicant: (id) => dispatch(editApplicant(id)),
        removeApplicant: (id) => dispatch(removeApplicant(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applicants)

