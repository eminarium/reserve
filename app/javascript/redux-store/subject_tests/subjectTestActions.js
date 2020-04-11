import axios from 'axios'
import settings from '../settings'

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

const fetchSubjectTestsRequest = () => {
    return {
        type: FETCH_SUBJECT_TESTS_REQUEST
    }
}

const fetchSubjectTestsSuccess = (subject_tests) => {
    return {
        type: FETCH_SUBJECT_TESTS_SUCCESS,
        payload: subject_tests
    }
}

const fetchSubjectTestsFailure = (error) => {
    return {
        type: FETCH_SUBJECT_TESTS_FAILURE,
        payload: error
    }
}

const postSubjectTestRequest = () => {
    return {
        type: POST_SUBJECT_TEST_REQUEST,
    }
}

const postSubjectTestSuccess = (subject_test) => {
    return {
        type: POST_SUBJECT_TEST_SUCCESS,
        payload: subject_test
    }
}
const postSubjectTestFailure = (error) => {
    return {
        type: POST_SUBJECT_TEST_FAILURE,
        payload: error
    }
}

const updateSubjectTestRequest = () => {
    return {
        type: UPDATE_SUBJECT_TEST_REQUEST,
    }
}

const updateSubjectTestSuccess = (subject_test) => {
    return {
        type: UPDATE_SUBJECT_TEST_SUCCESS,
        payload: subject_test
    }
}
const updateSubjectTestFailure = (error) => {
    return {
        type: UPDATE_SUBJECT_TEST_FAILURE,
        payload: error
    }
}

export const editSubjectTest = (id) => {
    return {
        type: EDIT_SUBJECT_TEST,
        payload: id
    }
}

export const subjectTestInfo = (id) => {
    return {
        type: SUBJECT_TEST_INFO,
        payload: id
    }
}

export const removeSubjectTestRequest = () => {
    return {
        type: REMOVE_SUBJECT_TEST_REQUEST,
    }
}

export const removeSubjectTestSuccess = (id) => {
    return {
        type: REMOVE_SUBJECT_TEST_SUCCESS,
        payload: id
    }
}

export const removeSubjectTestFailure = (error) => {
    return {
        type: REMOVE_SUBJECT_TEST_FAILURE,
        payload: error
    }
}

export const fetchSubjectTests = () => {
    return (dispatch) => {

        dispatch(fetchSubjectTestsRequest)

        axios.get(settings.rootUrl + 'api/v1/subject_tests', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const subject_tests = response.data
            dispatch(fetchSubjectTestsSuccess(subject_tests))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchSubjectTestsFailure(errorMsg))
        })
    }
}

export const postSubjectTest = (subject_test) => {
    return (dispatch) => {

        dispatch(postSubjectTestRequest)

        axios.post(settings.rootUrl + 'api/v1/subject_tests', JSON.stringify({
            title: subject_test.title,
            level: subject_test.level,
            subject_category_id: subject_test.subject_category_id,
            language_id: subject_test.language_id,
            passing_points: subject_test.passing_points,
            notes: subject_test.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postSubjectTestSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(postSubjectTestFailure(errorMsg))
        })
    }
}


export const updateSubjectTest = (subject_test) => {
    return (dispatch) => {

        dispatch(updateSubjectTestRequest)

        axios.put(settings.rootUrl + 'api/v1/subject_tests/' + subject_test.id, JSON.stringify({
            title: subject_test.title,
            level: subject_test.level,
            subject_category_id: subject_test.subject_category_id,
            language_id: subject_test.language_id,
            passing_points: subject_test.passing_points,
            notes: subject_test.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateSubjectTestSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(updateSubjectTestFailure(errorMsg))
        })
    }
}

export const removeSubjectTest = (id) => {
    return (dispatch) => {

        dispatch(removeSubjectTestRequest)

        axios.delete(settings.rootUrl + 'api/v1/subject_tests/'+id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeSubjectTestSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(removeSubjectTestFailure(errorMsg))
        })
    }
}
