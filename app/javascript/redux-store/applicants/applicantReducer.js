import { 
    FETCH_APPLICANTS_REQUEST, 
    FETCH_APPLICANTS_SUCCESS, 
    FETCH_APPLICANTS_FAILURE,

    POST_APPLICANT_REQUEST,
    POST_APPLICANT_SUCCESS,
    POST_APPLICANT_FAILURE,

    UPDATE_APPLICANT_REQUEST,
    UPDATE_APPLICANT_SUCCESS,
    UPDATE_APPLICANT_FAILURE,

    EDIT_APPLICANT,
    APPLICANT_INFO,

    REMOVE_APPLICANT_REQUEST,
    REMOVE_APPLICANT_SUCCESS,
    REMOVE_APPLICANT_FAILURE

} from "./applicantTypes"

const initialState = {
    loading: false,
    applicants: [],
    error: '',
    editingApplicantId: '',
    currentApplicant: ''
}

const applicantReducer = (state = initialState, action) => {
    switch(action.type) {
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
                applicants: action.payload,
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
                currentApplicant: ''
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
                editingApplicantId: '',
                currentApplicant: ''
            }
        case UPDATE_APPLICANT_SUCCESS:
            return {
                loading: false,
                applicants: [...state.applicants.filter(applicant => (applicant.id != action.payload.id)), action.payload],
                error: '',
                editingApplicantId: '',
                currentApplicant: ''
            }
        case UPDATE_APPLICANT_FAILURE:
            return {
                loading: false,
                applicants: state.applicants,
                error: action.payload,
                editingApplicantId: '',
                currentApplicant: ''
            }

        case EDIT_APPLICANT:
            return {
                loading: false,
                applicants: state.applicants,
                error: '',
                editingApplicantId: action.payload,
                currentApplicant: ''
            }

        case APPLICANT_INFO:
            return {
                loading: false,
                applicants: state.applicants,
                error: '',
                editingApplicantId: '',
                currentApplicant: state.applicants.find(applicant => applicant.id === action.payload)
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