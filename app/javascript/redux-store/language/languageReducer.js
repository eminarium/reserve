import { 
    FETCH_LANGUAGES_REQUEST, 
    FETCH_LANGUAGES_SUCCESS, 
    FETCH_LANGUAGES_FAILURE,

    POST_LANGUAGE_REQUEST,
    POST_LANGUAGE_SUCCESS,
    POST_LANGUAGE_FAILURE, 

    UPDATE_LANGUAGE_REQUEST,
    UPDATE_LANGUAGE_SUCCESS,
    UPDATE_LANGUAGE_FAILURE, 

    EDIT_LANGUAGE,
    LANGUAGE_INFO,

    REMOVE_LANGUAGE_REQUEST,
    REMOVE_LANGUAGE_SUCCESS,
    REMOVE_LANGUAGE_FAILURE

} from "./languageTypes"

const initialState = {
    loading: false,
    languages: [],
    error: '',
    editingLanguageId: '',
    currentLanguage: ''
}

const languageReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LANGUAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case FETCH_LANGUAGES_SUCCESS:
            return {
                loading: false,
                languages: action.payload,
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case FETCH_LANGUAGES_FAILURE:
            return {
                loading: false,
                languages: state.languages,
                error: action.payload,
                editingLanguageId: '',
                currentLanguage: ''
            }

        case POST_LANGUAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case POST_LANGUAGE_SUCCESS:
            return {
                loading: false,
                languages: state.languages.concat(action.payload),
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case POST_LANGUAGE_FAILURE:
            return {
                loading: false,
                languages: state.languages,
                error: action.payload,
                editingLanguageId: '',
                currentLanguage: ''
            }

        case UPDATE_LANGUAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case UPDATE_LANGUAGE_SUCCESS:
            return {
                loading: false,
                languages: [...state.languages.filter(lang => (lang.id != action.payload.id)), action.payload],
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case UPDATE_LANGUAGE_FAILURE:
            return {
                loading: false,
                languages: state.languages,
                error: action.payload,
                editingLanguageId: '',
                currentLanguage: ''
            }

        case EDIT_LANGUAGE:
            return {
                loading: false,
                languages: state.languages,
                error: '',
                editingLanguageId: action.payload,
                currentLanguage: ''
            }


        case LANGUAGE_INFO:
            return {
                loading: false,
                languages: state.languages,
                error: '',
                editingLanguageId: '',
                currentLanguage: state.languages.find(lang => lang.id === action.payload)
            }            
        
        case REMOVE_LANGUAGE_REQUEST:
            return {
                loading: true,
                languages: state.languages,
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case REMOVE_LANGUAGE_SUCCESS:
            return {
                loading: false,
                languages: state.languages.filter(lang => (lang.id != action.payload)),
                error: '',
                editingLanguageId: '',
                currentLanguage: ''
            }
        case REMOVE_LANGUAGE_FAILURE:
            return {
                loading: false,
                languages: state.languages,
                error: action.payload,
                editingLanguageId: '',
                currentLanguage: ''
            }

        default: return state
    }
}

export default languageReducer