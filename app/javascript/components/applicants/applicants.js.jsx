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
                            <th scope="col" colSpan="9">
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
                            <th scope="col">Suraty</th>                            
                            <th scope="col">Ady</th>
                            <th scope="col">Familiýasy</th>
                            <th scope="col">Atasynyň Ady</th>
                            <th scope="col">Doglan senesi</th>
                            <th scope="col">Öý Tel. Belgisi</th>
                            <th scope="col">Mobil Tel. Belgisi</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                            (
                                <tr>
                                    <td colSpan="10">
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
                                    <td colSpan="10">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.applicants.map( (applicant, index) => {

                                var bd = new Date(applicant.birth_date)

                                return (
                                    <tr key={applicant.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{applicant.photo_url}</td>
                                        <td>{applicant.first_name}</td>
                                        <td>{applicant.last_name}</td>
                                        <td>{applicant.patronymic}</td>
                                        <td>
                                            {bd.getDate() < 9 ? "0" : ""}{bd.getDate()}-
                                            {bd.getMonth() < 9 ? "0" : ""}{bd.getMonth() + 1}-
                                            {bd.getFullYear()} 
                                        </td>
                                        <td>{applicant.home_phone}</td>
                                        <td>{applicant.mobile_phone}</td>
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

