//import { combineReducers } from '../../../node_modules/redux'
import { combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import shiftReducer from './shift/shiftReducer'
import seasonReducer from './season/seasonReducer'
import subjectCategoryReducer from './subject_categories/subjectCategoryReducer'
import subjectReducer from './subjects/subjectReducer'
import applicantReducer from './applicants/applicantReducer'
import subjectTestReducer from './subject_tests/subjectTestReducer'
import reservationReducer from './reservations/reservationReducer'

const rootReducer = combineReducers({
    languages: languageReducer,
    shifts: shiftReducer,
    seasons: seasonReducer,
    subject_categories: subjectCategoryReducer,
    subjects: subjectReducer,
    applicants: applicantReducer,
    subject_tests: subjectTestReducer,
    reservations: reservationReducer
})

export default rootReducer