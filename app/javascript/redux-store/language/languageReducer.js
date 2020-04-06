import { 
    FETCH_LANGUAGES_REQUEST, 
    FETCH_LANGUAGES_SUCCESS, 
    FETCH_LANGUAGES_FAILURE,

    POST_LANGUAGE_REQUEST,
    POST_LANGUAGE_SUCCESS,
    POST_LANGUAGE_FAILURE   

} from "./languageTypes"

const initialState = {
    loading: false,
    languages: [],
    error: ''
}

const languageReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LANGUAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case FETCH_LANGUAGES_SUCCESS:
            return {
                loading: false,
                languages: action.payload,
                error: ''
            }
        case FETCH_LANGUAGES_FAILURE:
            return {
                loading: false,
                languages: [],
                error: action.payload
            }

        case POST_LANGUAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case POST_LANGUAGE_SUCCESS:
            return {
                loading: false,
                languages: state.languages.concat(action.payload),
                error: ''
            }
        case POST_LANGUAGE_FAILURE:
            return {
                loading: false,
                languages: state.languages,
                error: action.payload
            }
        default: return state
    }
}

export default languageReducer