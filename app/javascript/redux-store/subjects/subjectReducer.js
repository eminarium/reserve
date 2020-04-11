import { 
    FETCH_SUBJECTS_REQUEST, 
    FETCH_SUBJECTS_SUCCESS, 
    FETCH_SUBJECTS_FAILURE,

    POST_SUBJECT_REQUEST,
    POST_SUBJECT_SUCCESS,
    POST_SUBJECT_FAILURE, 

    UPDATE_SUBJECT_REQUEST,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_FAILURE, 

    EDIT_SUBJECT,
    SUBJECT_INFO,

    REMOVE_SUBJECT_REQUEST,
    REMOVE_SUBJECT_SUCCESS,
    REMOVE_SUBJECT_FAILURE

} from "./subjectTypes"

const initialState = {
    loading: false,
    subjects: [],
    error: '',
    editingSubjectId: '',
    currentSubject: ''
}

const subjectReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SUBJECTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case FETCH_SUBJECTS_SUCCESS:
            return {
                loading: false,
                subjects: action.payload,
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case FETCH_SUBJECTS_FAILURE:
            return {
                loading: false,
                subjects: state.subjects,
                error: action.payload,
                editingSubjectId: '',
                currentSubject: ''
            }

        case POST_SUBJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case POST_SUBJECT_SUCCESS:
            return {
                loading: false,
                subjects: state.subjects.concat(action.payload),
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case POST_SUBJECT_FAILURE:
            return {
                loading: false,
                subjects: state.subjects,
                error: action.payload,
                editingSubjectId: '',
                currentSubject: ''
            }

        case UPDATE_SUBJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case UPDATE_SUBJECT_SUCCESS:
            return {
                loading: false,
                subjects: [...state.subjects.filter(subject => (subject.id != action.payload.id)), action.payload],
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case UPDATE_SUBJECT_FAILURE:
            return {
                loading: false,
                subjects: state.subjects,
                error: action.payload,
                editingSubjectId: '',
                currentSubject: ''
            }

        case EDIT_SUBJECT:
            return {
                loading: false,
                subjects: state.subjects,
                error: '',
                editingSubjectId: action.payload,
                currentSubject: ''
            }


        case SUBJECT_INFO:
            return {
                loading: false,
                subjects: state.subjects,
                error: '',
                editingSubjectId: '',
                currentSubject: state.subjects.find(subject => subject.id === action.payload)
            }            
        
        case REMOVE_SUBJECT_REQUEST:
            return {
                loading: true,
                subjects: state.subjects,
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case REMOVE_SUBJECT_SUCCESS:
            return {
                loading: false,
                subjects: state.subjects.filter(subject => (subject.id != action.payload)),
                error: '',
                editingSubjectId: '',
                currentSubject: ''
            }
        case REMOVE_SUBJECT_FAILURE:
            return {
                loading: false,
                subjects: state.subjects,
                error: action.payload,
                editingSubjectId: '',
                currentSubject: ''
            }

        default: return state
    }
}

export default subjectReducer