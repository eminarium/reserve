import React from 'react'
//import { Pagination } from 'semantic-ui-react'
import Pagination from 'react-bootstrap/Pagination'
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

        this.state = {
            page: 1,
        }

        this.handlePageChange = this.handlePageChange.bind(this)
        this.loadFirstPage = this.loadFirstPage.bind(this)
        this.loadLastPage = this.loadLastPage.bind(this)
        this.loadNextPage = this.loadNextPage.bind(this)
        this.loadPrevPage = this.loadPrevPage.bind(this)

    }

    componentDidMount() {
        this.props.fetchApplicants()
        this.setState({
            page: 1,
        })
    }

    handlePageChange(page) {
        this.setState({ page: page })
        this.props.fetchApplicants(page)
    }

    loadPrevPage() {
        var currentPage = this.state.page
        var prevPage = (currentPage > 1) ? (currentPage - 1) : currentPage
        this.setState({ page: prevPage })
        this.props.fetchApplicants(prevPage)
    }

    loadNextPage() {
        var currentPage = this.state.page
        var nextPage = (currentPage < this.props.pages) ? (currentPage + 1) : currentPage
        this.setState({ page: nextPage })
        this.props.fetchApplicants(nextPage)
    }

    loadLastPage() {
        this.setState({ page: this.props.pages })
        this.props.fetchApplicants(this.props.pages)
    }

    loadFirstPage() {
        this.setState({ page: 1 })
        this.props.fetchApplicants(1)
    }

    render() {

        let items = []
        let activePage = this.state.page
        let totalPages = this.props.pages


        if (totalPages <= 10) {
            for (let number = 1; number <= totalPages; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                )
            }
        } else {

            if (activePage <= 3 || activePage >= totalPages - 2) {

                for (let number = 1; number <= 3; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }
                items.push(
                    <Pagination.Ellipsis key="middle" disabled />
                )
                for (let number = totalPages-3; number <= totalPages; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }
            }
            else {

                items.push(
                    <Pagination.Ellipsis key="start" disabled />
                )

                for (let number = activePage - 2; number <= activePage + 2; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} onClick={() => this.handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    )
                }

                items.push(
                    <Pagination.Ellipsis key="end" disabled />
                )
            }

        }


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
                                            <th scope="row">{(this.state.page-1)*10 + (index + 1)}</th>
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

                <Pagination>
                    <Pagination.First onClick={() => this.loadFirstPage()} />
                    <Pagination.Prev onClick={() => this.loadPrevPage()} />
                    {items}
                    <Pagination.Next onClick={() => this.loadNextPage()} />
                    <Pagination.Last onClick={() => this.loadLastPage()} />
                </Pagination>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applicants: state.applicants.applicants,
        pages: state.applicants.pages,
        loading: state.applicants.loading,
        error: state.applicants.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchApplicants: (pg) => dispatch(fetchApplicants(pg)),
        editApplicant: (id) => dispatch(editApplicant(id)),
        removeApplicant: (id) => dispatch(removeApplicant(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applicants)

