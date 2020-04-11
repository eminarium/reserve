import axios from 'axios'
import settings from '../settings'

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

const fetchSubjectsRequest = () => {
    return {
        type: FETCH_SUBJECTS_REQUEST
    }
}

const fetchSubjectsSuccess = (subjects) => {
    return {
        type: FETCH_SUBJECTS_SUCCESS,
        payload: subjects
    }
}

const fetchSubjectsFailure = (error) => {
    return {
        type: FETCH_SUBJECTS_FAILURE,
        payload: error
    }
}

const postSubjectRequest = () => {
    return {
        type: POST_SUBJECT_REQUEST,
    }
}

const postSubjectSuccess = (subject) => {
    return {
        type: POST_SUBJECT_SUCCESS,
        payload: subject
    }
}
const postSubjectFailure = (error) => {
    return {
        type: POST_SUBJECT_FAILURE,
        payload: error
    }
}

const updateSubjectRequest = () => {
    return {
        type: UPDATE_SUBJECT_REQUEST,
    }
}

const updateSubjectSuccess = (subject) => {
    return {
        type: UPDATE_SUBJECT_SUCCESS,
        payload: subject
    }
}
const updateSubjectFailure = (error) => {
    return {
        type: UPDATE_SUBJECT_FAILURE,
        payload: error
    }
}

export const editSubject = (id) => {
    return {
        type: EDIT_SUBJECT,
        payload: id
    }
}

export const subjectInfo = (id) => {
    return {
        type: SUBJECT_INFO,
        payload: id
    }
}

export const removeSubjectRequest = () => {
    return {
        type: REMOVE_SUBJECT_REQUEST,
    }
}

export const removeSubjectSuccess = (id) => {
    return {
        type: REMOVE_SUBJECT_SUCCESS,
        payload: id
    }
}

export const removeSubjectFailure = (error) => {
    return {
        type: REMOVE_SUBJECT_FAILURE,
        payload: error
    }
}

export const fetchSubjects = () => {
    return (dispatch) => {

        dispatch(fetchSubjectsRequest)

        axios.get(settings.rootUrl + 'api/v1/subjects', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const subjects = response.data
            dispatch(fetchSubjectsSuccess(subjects))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchSubjectsFailure(errorMsg))
        })
    }
}

export const postSubject = (subject) => {
    return (dispatch) => {

        dispatch(postSubjectRequest)

        axios.post(settings.rootUrl + 'api/v1/subjects', JSON.stringify({
            title: subject.title,
            level: subject.level,
            subject_category_id: subject.subject_category_id,
            language_id: subject.language_id,
            passing_points: subject.passing_points,
            notes: subject.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postSubjectSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(postSubjectFailure(errorMsg))
        })
    }
}


export const updateSubject = (subject) => {
    return (dispatch) => {

        dispatch(updateSubjectRequest)

        axios.put(settings.rootUrl + 'api/v1/subjects/' + subject.id, JSON.stringify({
            title: subject.title,
            level: subject.level,
            subject_category_id: subject.subject_category_id,
            language_id: subject.language_id,
            passing_points: subject.passing_points,
            notes: subject.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateSubjectSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(updateSubjectFailure(errorMsg))
        })
    }
}

export const removeSubject = (id) => {
    return (dispatch) => {

        dispatch(removeSubjectRequest)

        axios.delete(settings.rootUrl + 'api/v1/subjects/'+id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeSubjectSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(removeSubjectFailure(errorMsg))
        })
    }
}
