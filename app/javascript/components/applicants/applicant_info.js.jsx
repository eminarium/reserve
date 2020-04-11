import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import {
    editApplicant,
} from '../../redux-store'

import ApplicantData from './applicant_data.js'
import ApplicantSubjectTests from '../subject_tests/applicant_subject_tests.js'
import ApplicantReservations from '../reservations/applicant_reservations.js'


class ApplicantInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
                    <Tab eventKey="info" title="Umumy Maglumatlar">
                        <ApplicantData   
                            applicant  = {this.props.applicant} 
                            editApplicant = {this.props.editApplicant}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantInfo)