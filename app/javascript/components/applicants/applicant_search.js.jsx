import React from 'react'
import { connect } from 'react-redux'
import {
    fetchSearchApplicants,
    editApplicant,
    applicantInfo,
    removeApplicant,
    emptyApplicants
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class ApplicantSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            no_params_error: ''
        }

        this.getSearchApplicants = this.getSearchApplicants.bind(this)
        this.clearSearchParams = this.clearSearchParams.bind(this)
    }

    componentDidMount() {
        this.props.emptyApplicants()
    }

    clearSearchParams() {
        this.getFirstName.value = ""
        this.getLastName.value = ""
        this.getPatronymic.value = ""
    }

    getSearchApplicants(event) {

        event.preventDefault()

        if (this.getFirstName.value == "" && this.getLastName.value == "" && this.getPatronymic.value == "") {
            this.props.emptyApplicants()
            this.setState({ no_params_error: "Gözleg maglumatlary girizilmedi ..." })
            return false;
        }
        else {
            this.setState({ no_params_error: '' })
            this.props.fetchSearchApplicants({
                first_name: this.getFirstName.value,
                last_name: this.getLastName.value,
                patronymic: this.getPatronymic.value
            })
        }
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="10">
                                Müşderi Gözlegi &nbsp; &nbsp; &nbsp;
                                {
                                    this.state.no_params_error != '' ?
                                        <span style={{ color: 'red', fontStyle: 'italic' }}>
                                            {" : " + this.state.no_params_error}
                                        </span>
                                        : ""
                                }
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan="9">
                                <form noValidate onSubmit={this.getSearchApplicants} >
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" id="first_name" name="first_name" className="form-control" placeholder="Ady"
                                                ref={(input) => this.getFirstName = input}
                                            />
                                        </div>
                                        <div className="col">
                                            <input type="text" id="last_name" name="last_name" className="form-control" placeholder="Familiýasy"
                                                ref={(input) => this.getLastName = input}
                                            />
                                        </div>
                                        <div className="col">
                                            <input type="text" id="patronymic" name="patronymic" className="form-control" placeholder="Atasynyň Ady"
                                                ref={(input) => this.getPatronymic = input}
                                            />
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-info">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </th>
                            <th scope="col">
                                <button className="btn btn-warning"
                                    onClick={this.clearSearchParams}
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ady</th>
                            <th scope="col">Familiýasy</th>
                            <th scope="col">Atasynyň Ady</th>
                            <th scope="col">Synpy</th>
                            <th scope="col">Ýaşy</th>
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
                                this.props.applicants.map((applicant, index) => {
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
        fetchSearchApplicants: (search_params) => dispatch(fetchSearchApplicants(search_params)),
        editApplicant: (id) => dispatch(editApplicant(id)),
        removeApplicant: (id) => dispatch(removeApplicant(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id)),
        emptyApplicants: () => dispatch(emptyApplicants())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantSearch)

