import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Dashboard from './dashboard.js.jsx'

import Languages from './languages/languages.js'
import LanguageNewForm from './languages/language_new_form.js'
import LanguageEditForm from './languages/language_edit_form.js'
import LanguageInfo from './languages/language_info.js'

import Shifts from './shifts/shifts.js'
import ShiftNewForm from './shifts/shift_new_form.js'
import ShiftEditForm from './shifts/shift_edit_form.js'
import ShiftInfo from './shifts/shift_info.js'

import Seasons from './seasons/seasons.js'
import SeasonNewForm from './seasons/season_new_form.js'
import SeasonEditForm from './seasons/season_edit_form.js'
import SeasonInfo from './seasons/season_info.js'

import SubjectCategories from './subject_categories/subject_categories.js'
import SubjectCategoryNewForm from './subject_categories/subject_category_new_form.js'
import SubjectCategoryEditForm from './subject_categories/subject_category_edit_form.js'
import SubjectCategoryInfo from './subject_categories/subject_category_info.js'

import Subjects from './subjects/subjects.js'
import SubjectNewForm from './subjects/subject_new_form.js'
import SubjectEditForm from './subjects/subject_edit_form.js'
import SubjectInfo from './subjects/subject_info.js'

import Applicants from './applicants/applicants.js'
import ApplicantNewForm from './applicants/applicant_new_form.js'
import ApplicantEditForm from './applicants/applicant_edit_form.js'
import ApplicantInfo from './applicants/applicant_info.js'

import SubjectTests from './subject_tests/subject_tests.js'
import SubjectTestNewForm from './subject_tests/subject_test_new_form.js'
import SubjectTestEditForm from './subject_tests/subject_test_edit_form.js'
import SubjectTestInfo from './subject_tests/subject_test_info.js'

import Reservations from './reservations/reservations.js'
import ReservationNewForm from './reservations/reservation_new_form.js'
import ReservationEditForm from './reservations/reservation_edit_form.js'
import ReservationInfo from './reservations/reservation_info.js'


class Content extends React.Component  {
    render() {
        return (
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Switch>
                        <Route exact path="/" 
                            render={ ({location}) => {
                                    { if (location.pathname == '/') return <Dashboard /> }
                                }
                            }
                        
                        />

                        <Route exact path="/languages" component={Languages} />
                        <Route exact path="/languages/new" component={LanguageNewForm} />
                        <Route exact path="/languages/:languageId" component={LanguageInfo} />
                        <Route exact path="/languages/:languageId/edit" component={LanguageEditForm} />

                        <Route exact path="/shifts" component={Shifts} />
                        <Route exact path="/shifts/new" component={ShiftNewForm} />
                        <Route exact path="/shifts/:shiftId" component={ShiftInfo} />
                        <Route exact path="/shifts/:shiftId/edit" component={ShiftEditForm} />

                        <Route exact path="/seasons" component={Seasons} />
                        <Route exact path="/seasons/new" component={SeasonNewForm} />
                        <Route exact path="/seasons/:seasonId" component={SeasonInfo} />
                        <Route exact path="/seasons/:seasonId/edit" component={SeasonEditForm} />

                        <Route exact path="/subject_categories" component={SubjectCategories} />
                        <Route exact path="/subject_categories/new" component={SubjectCategoryNewForm} />
                        <Route exact path="/subject_categories/:subjectCategoryId" component={SubjectCategoryInfo} />
                        <Route exact path="/subject_categories/:subjectCategoryId/edit" component={SubjectCategoryEditForm} />

                        <Route exact path="/subjects" component={Subjects} />
                        <Route exact path="/subjects/new" component={SubjectNewForm} />
                        <Route exact path="/subjects/:subjectId" component={SubjectInfo} />
                        <Route exact path="/subjects/:subjectId/edit" component={SubjectEditForm} />

                        <Route exact path="/applicants" component={Applicants} />
                        <Route exact path="/applicants/new" component={ApplicantNewForm} />
                        <Route exact path="/applicants/:applicantId" component={ApplicantInfo} />
                        <Route exact path="/applicants/:applicantId/edit" component={ApplicantEditForm} />

                        <Route exact path="/reservations" component={Reservations} />
                        <Route exact path="/reservations/new" component={ReservationNewForm} />
                        <Route exact path="/reservations/:reservationId" component={ReservationInfo} />
                        <Route exact path="/reservations/:reservationId/edit" component={ReservationEditForm} />

                        <Route exact path="/subject_tests" component={SubjectTests} />
                        <Route exact path="/subject_tests/new" component={SubjectTestNewForm} />
                        <Route exact path="/subject_tests/:subjectTestId" component={SubjectTestInfo} />
                        <Route exact path="/subject_tests/:subjectTestId/edit" component={SubjectTestEditForm} />

                    </Switch>
                </main>
        );
    }
}

export default Content;