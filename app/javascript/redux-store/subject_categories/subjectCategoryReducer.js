import { 
    FETCH_SUBJECT_CATEGORIES_REQUEST, 
    FETCH_SUBJECT_CATEGORIES_SUCCESS, 
    FETCH_SUBJECT_CATEGORIES_FAILURE,

    POST_SUBJECT_CATEGORY_REQUEST,
    POST_SUBJECT_CATEGORY_SUCCESS,
    POST_SUBJECT_CATEGORY_FAILURE, 

    UPDATE_SUBJECT_CATEGORY_REQUEST,
    UPDATE_SUBJECT_CATEGORY_SUCCESS,
    UPDATE_SUBJECT_CATEGORY_FAILURE, 

    EDIT_SUBJECT_CATEGORY,
    SUBJECT_CATEGORY_INFO,

    REMOVE_SUBJECT_CATEGORY_REQUEST,
    REMOVE_SUBJECT_CATEGORY_SUCCESS,
    REMOVE_SUBJECT_CATEGORY_FAILURE

} from "./subjectCategoryTypes"

const initialState = {
    loading: false,
    subject_categories: [],
    error: '',
    editingSubjectCategoryId: '',
    currentSubjectCategory: ''
}

const subjectCategoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SUBJECT_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case FETCH_SUBJECT_CATEGORIES_SUCCESS:
            return {
                loading: false,
                subject_categories: action.payload,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case FETCH_SUBJECT_CATEGORIES_FAILURE:
            return {
                loading: false,
                subject_categories: [],
                error: action.payload,
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }

        case POST_SUBJECT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case POST_SUBJECT_CATEGORY_SUCCESS:
            return {
                loading: false,
                subject_categories: state.subject_categories.concat(action.payload),
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case POST_SUBJECT_CATEGORY_FAILURE:
            return {
                loading: false,
                subject_categories: state.subject_categories,
                error: action.payload,
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }

        case UPDATE_SUBJECT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case UPDATE_SUBJECT_CATEGORY_SUCCESS:
            return {
                loading: false,
                subject_categories: [...state.subject_categories.filter(sc => (sc.id != action.payload.id)), action.payload],
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case UPDATE_SUBJECT_CATEGORY_FAILURE:
            return {
                loading: false,
                subject_categories: state.subject_categories,
                error: action.payload,
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }

        case EDIT_SUBJECT_CATEGORY:
            return {
                loading: false,
                subject_categories: state.subject_categories,
                error: '',
                editingSubjectCategoryId: action.payload,
                currentSubjectCategory: ''
            }


        case SUBJECT_CATEGORY_INFO:
            return {
                loading: false,
                subject_categories: state.subject_categories,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: state.subject_categories.find(sc => sc.id === action.payload)
            }            
        
        case REMOVE_SUBJECT_CATEGORY_REQUEST:
            return {
                loading: true,
                subject_categories: state.subject_categories,
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case REMOVE_SUBJECT_CATEGORY_SUCCESS:
            return {
                loading: false,
                subject_categories: state.subject_categories.filter(sc => (sc.id != action.payload)),
                error: '',
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }
        case REMOVE_SUBJECT_CATEGORY_FAILURE:
            return {
                loading: false,
                subject_categories: state.subject_categories,
                error: action.payload,
                editingSubjectCategoryId: '',
                currentSubjectCategory: ''
            }

        default: return state
    }
}

export default subjectCategoryReducer