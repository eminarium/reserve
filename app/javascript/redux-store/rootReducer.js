//import { combineReducers } from '../../../node_modules/redux'
import { combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import shiftReducer from './shift/shiftReducer'
import seasonReducer from './season/seasonReducer'
import subjectCategoryReducer from './subject_categories/subjectCategoryReducer'

const rootReducer = combineReducers({
    languages: languageReducer,
    shifts: shiftReducer,
    seasons: seasonReducer,
    subject_categories: subjectCategoryReducer
})

export default rootReducer