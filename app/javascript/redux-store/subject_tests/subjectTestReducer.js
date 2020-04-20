import {
    FETCH_SUBJECT_TESTS_REQUEST,
    FETCH_SUBJECT_TESTS_SUCCESS,
    FETCH_SUBJECT_TESTS_FAILURE,

    POST_SUBJECT_TEST_REQUEST,
    POST_SUBJECT_TEST_SUCCESS,
    POST_SUBJECT_TEST_FAILURE,

    UPDATE_SUBJECT_TEST_REQUEST,
    UPDATE_SUBJECT_TEST_SUCCESS,
    UPDATE_SUBJECT_TEST_FAILURE,

    EDIT_SUBJECT_TEST,
    SUBJECT_TEST_INFO,

    REMOVE_SUBJECT_TEST_REQUEST,
    REMOVE_SUBJECT_TEST_SUCCESS,
    REMOVE_SUBJECT_TEST_FAILURE

} from "./subjectTestTypes"

const initialState = {
    loading: false,
    subject_tests: [],
    error: '',
    editingSubjectTestId: '',
    currentSubjectTest: ''
}

const subjectTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBJECT_TESTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case FETCH_SUBJECT_TESTS_SUCCESS:
            return {
                loading: false,
                subject_tests: action.payload,
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case FETCH_SUBJECT_TESTS_FAILURE:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: action.payload,
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }

        case POST_SUBJECT_TEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case POST_SUBJECT_TEST_SUCCESS:
            return {
                loading: false,
                subject_tests: state.subject_tests.concat(action.payload),
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case POST_SUBJECT_TEST_FAILURE:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: action.payload,
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }

        case UPDATE_SUBJECT_TEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSubjectTestId: state.editingSubjectTestId,
                currentSubjectTest: state.currentSubjectTest
            }
        case UPDATE_SUBJECT_TEST_SUCCESS:
            return {
                loading: false,
                subject_tests: [...state.subject_tests.filter(subject_test => (subject_test.id != action.payload.id)), action.payload],
                error: '',
                editingSubjectTestId: state.editingSubjectTestId,
                currentSubjectTest: state.currentSubjectTest
            }
        case UPDATE_SUBJECT_TEST_FAILURE:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: action.payload,
                editingSubjectTestId: '',
                currentSubjectTest: state.currentSubjectTest
            }

        case EDIT_SUBJECT_TEST:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: '',
                editingSubjectTestId: action.payload,
                currentSubjectTest: state.subject_tests.find(subject_test => subject_test.id === action.payload)
            }


        case SUBJECT_TEST_INFO:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: state.subject_tests.find(subject_test => subject_test.id === action.payload)
            }

        case REMOVE_SUBJECT_TEST_REQUEST:
            return {
                loading: true,
                subject_tests: state.subject_tests,
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case REMOVE_SUBJECT_TEST_SUCCESS:
            return {
                loading: false,
                subject_tests: state.subject_tests.filter(subject_test => (subject_test.id != action.payload)),
                error: '',
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }
        case REMOVE_SUBJECT_TEST_FAILURE:
            return {
                loading: false,
                subject_tests: state.subject_tests,
                error: action.payload,
                editingSubjectTestId: '',
                currentSubjectTest: ''
            }

        default: return state
    }
}

export default subjectTestReducer