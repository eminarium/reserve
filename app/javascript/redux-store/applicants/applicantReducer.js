import {
    FETCH_APPLICANTS_REQUEST,
    FETCH_APPLICANTS_SUCCESS,
    FETCH_APPLICANTS_FAILURE,

    FETCH_SEARCH_APPLICANTS_REQUEST,
    FETCH_SEARCH_APPLICANTS_SUCCESS,
    FETCH_SEARCH_APPLICANTS_FAILURE,

    POST_APPLICANT_REQUEST,
    POST_APPLICANT_SUCCESS,
    POST_APPLICANT_FAILURE,

    UPDATE_APPLICANT_REQUEST,
    UPDATE_APPLICANT_SUCCESS,
    UPDATE_APPLICANT_FAILURE,

    EDIT_APPLICANT,
    APPLICANT_INFO,
    EMPTY_APPLICANTS,
    FETCH_APPLICANT_INFO,

    REMOVE_APPLICANT_REQUEST,
    REMOVE_APPLICANT_SUCCESS,
    REMOVE_APPLICANT_FAILURE

} from "./applicantTypes"

const initialState = {
    loading: false,
    applicants: [],
    pages: 0,
    error: '',
    editingApplicantId: '',
    currentApplicant: ''
}

const applicantReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APPLICANTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case FETCH_APPLICANTS_SUCCESS:
            return {
                loading: false,
                applicants: action.payload.applicants,
                pages: action.payload.pages,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case FETCH_APPLICANTS_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: ''
            }

        case FETCH_SEARCH_APPLICANTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case FETCH_SEARCH_APPLICANTS_SUCCESS:
            return {
                loading: false,
                applicants: action.payload.applicants,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case FETCH_SEARCH_APPLICANTS_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: ''
            }

        case POST_APPLICANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case POST_APPLICANT_SUCCESS:
            return {
                loading: false,
                applicants: state.applicants.concat(action.payload),
                error: '',
                editingApplicantId: '',
                currentApplicant: state.applicants.find(applicant => applicant.id === action.payload.id)
            }
        case POST_APPLICANT_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: ''
            }

        case UPDATE_APPLICANT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingApplicantId: state.editingApplicantId,
                currentApplicant: state.currentApplicant
            }
        case UPDATE_APPLICANT_SUCCESS:
            return {
                loading: false,
                applicants: [...state.applicants.filter(applicant => (applicant.id != action.payload.id)), action.payload],
                error: '',
                editingApplicantId: state.editingApplicantId,
                currentApplicant: state.currentApplicant
            }
        case UPDATE_APPLICANT_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: state.currentApplicant
            }

        case EDIT_APPLICANT:
            return {
                loading: false,
                applicants: state.applicants,
                error: '',
                editingApplicantId: action.payload,
                currentApplicant: state.applicants.find(applicant => applicant.id === action.payload)
            }

        case APPLICANT_INFO:
            return {
                loading: false,
                applicants: state.applicants,
                error: '',
                editingApplicantId: '',
                currentApplicant: state.applicants.find(applicant => applicant.id === action.payload)
            }

        case FETCH_APPLICANT_INFO:
            return {
                loading: false,
                applicants: state.applicants,
                error: '',
                editingApplicantId: '',
                currentApplicant: action.payload
            }

        case EMPTY_APPLICANTS:
            return {
                loading: false,
                applicants: [],
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }

        case REMOVE_APPLICANT_REQUEST:
            return {
                loading: true,
                applicants: state.applicants,
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case REMOVE_APPLICANT_SUCCESS:
            return {
                loading: false,
                applicants: state.applicants.filter(applicant => (applicant.id != action.payload)),
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case REMOVE_APPLICANT_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: ''
            }

        default: return state
    }
}

export default applicantReducer