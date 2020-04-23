import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux'
import {
    fetchSubjectTests,
    editSubjectTest,
    subjectTestInfo,
    removeSubjectTest,
    applicantInfo,
    fetchApplicantInfo
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class SubjectTests extends React.Component {
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
        this.props.fetchSubjectTests(this.state.page)
    }


    handlePageChange(page) {
        this.setState({ page: page })
        this.props.fetchSubjectTests(page)
    }

    loadPrevPage() {
        var currentPage = this.state.page
        var prevPage = (currentPage > 1) ? (currentPage - 1) : currentPage
        this.setState({ page: prevPage })
        this.props.fetchSubjectTests(prevPage)
    }

    loadNextPage() {
        var currentPage = this.state.page
        var nextPage = (currentPage < this.props.pages) ? (currentPage + 1) : currentPage
        this.setState({ page: nextPage })
        this.props.fetchSubjectTests(nextPage)
    }

    loadLastPage() {
        this.setState({ page: this.props.pages })
        this.props.fetchSubjectTests(this.props.pages)
    }

    loadFirstPage() {
        this.setState({ page: 1 })
        this.props.fetchSubjectTests(1)
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
                for (let number = totalPages - 3; number <= totalPages; number++) {
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
                            <th scope="col" colSpan="8">
                                Synaglar
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
                                        <td colSpan="8">
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
                                        <td colSpan="8">
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
                                            <th scope="row">{(this.state.page - 1) * 10 + (index + 1)}</th>
                                            <td>
                                                <Link onClick={() => this.props.fetchApplicantInfo(subject_test.applicant.id)} to={"/applicants/" + subject_test.applicant.id} >
                                                    {subject_test.applicant.first_name} &nbsp;
                                                {subject_test.applicant.last_name} &nbsp;
                                                {subject_test.applicant.patronymic}
                                                </Link>
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
        subject_tests: state.subject_tests.subject_tests,
        pages: state.subject_tests.pages,
        loading: state.subject_tests.loading,
        error: state.subject_tests.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSubjectTests: (pg) => dispatch(fetchSubjectTests(pg)),
        editSubjectTest: (id) => dispatch(editSubjectTest(id)),
        removeSubjectTest: (id) => dispatch(removeSubjectTest(id)),
        subjectTestInfo: (id) => dispatch(subjectTestInfo(id)),
        applicantInfo: (id) => dispatch(applicantInfo(id)),
        fetchApplicantInfo: (id) => dispatch(fetchApplicantInfo(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTests)

