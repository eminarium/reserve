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

                    </Switch>
                </main>
        );
    }
}

export default Content;