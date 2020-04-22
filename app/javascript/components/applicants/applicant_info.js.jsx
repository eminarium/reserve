import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import {
    editApplicant,
    fetchApplicantInfo,
    fetchApplicantReservations,
    fetchApplicantSubjectTests
} from '../../redux-store'

import ApplicantData from './applicant_data.js'
import ApplicantSubjectTests from '../subject_tests/applicant_subject_tests.js'
import ApplicantReservations from '../reservations/applicant_reservations.js'


class ApplicantInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchApplicantInfo(this.props.match.params.applicantId)
        this.props.fetchApplicantReservations(this.props.match.params.applicantId)
        this.props.fetchApplicantSubjectTests(this.props.match.params.applicantId)
    }

    render() {

        return (
            <div>
                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
                    <Tab eventKey="info" title="Umumy Maglumatlar">
                        <ApplicantData
                            applicant={this.props.applicant}
                            editApplicant={this.props.editApplicant}
                        />
                    </Tab>
                    <Tab eventKey="reservations" title="Rezerwler">
                        <br />
                        <ApplicantReservations
                            applicant={this.props.applicant}
                            editApplicant={this.props.editApplicant}
                        />
                    </Tab>
                    <Tab eventKey="subject_tests" title="Synaglar">
                        <br />
                        <ApplicantSubjectTests
                            applicant={this.props.applicant}
                            editApplicant={this.props.editApplicant}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applicant: state.applicants.currentApplicant,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editApplicant: (id) => dispatch(editApplicant(id)),
        fetchApplicantInfo: (id) => dispatch(fetchApplicantInfo(id)),
        fetchApplicantReservations: (id) => dispatch(fetchApplicantReservations(id)),
        fetchApplicantSubjectTests: (id) => dispatch(fetchApplicantSubjectTests(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantInfo)