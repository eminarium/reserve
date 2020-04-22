import React from 'react'

import {
    Link
} from "react-router-dom"

class ApplicantData extends React.Component {

    render() {

        var reg_date = new Date(this.props.applicant.created_at)

        return (
            <div>
                <br />

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Müşderi Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.applicant.first_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Familiýasy</th>
                                    <td>{this.props.applicant.last_name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Atasynyň Ady</th>
                                    <td>{this.props.applicant.patronymic}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="fa fa-phone" style={{ fontSize: 24 }}></i></th>
                                    <td>{this.props.applicant.home_phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><i className="fa fa-mobile" style={{ fontSize: 24 }}></i></th>
                                    <td>{this.props.applicant.mobile_phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Synpy</th>
                                    <td>{this.props.applicant.school_grade}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ýaşy</th>
                                    <td>{this.props.applicant.age}</td>
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
                                    <th scope="row"><i className="fa fa-user" style={{ fontSize: 24 }}></i></th>
                                    <td>
                                        {
                                            this.props.applicant.user ?
                                                this.props.applicant.user.username :
                                                ""
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.applicant.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/applicants/" + this.props.applicant.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editApplicant(this.props.applicant.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/applicants"}>
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

export default ApplicantData
