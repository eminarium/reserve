//import { combineReducers } from '../../../node_modules/redux'
import { combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import shiftReducer from './shift/shiftReducer'

const rootReducer = combineReducers({
    languages: languageReducer,
    shifts: shiftReducer
})

export default rootReducer