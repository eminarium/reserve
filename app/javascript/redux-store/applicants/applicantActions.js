import axios from 'axios'
import settings from '../settings'

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



const fetchApplicantsRequest = () => {
    return {
        type: FETCH_APPLICANTS_REQUEST
    }
}

const fetchApplicantsSuccess = (applicants) => {
    return {
        type: FETCH_APPLICANTS_SUCCESS,
        payload: applicants
    }
}

const fetchApplicantsFailure = (error) => {
    return {
        type: FETCH_APPLICANTS_FAILURE,
        payload: error
    }
}



const postApplicantRequest = () => {
    return {
        type: POST_APPLICANT_REQUEST,
    }
}

const postApplicantSuccess = (applicant) => {
    return {
        type: POST_APPLICANT_SUCCESS,
        payload: applicant
    }
}
const postApplicantFailure = (error) => {
    return {
        type: POST_APPLICANT_FAILURE,
        payload: error
    }
}

const updateApplicantRequest = () => {
    return {
        type: UPDATE_APPLICANT_REQUEST,
    }
}

const updateApplicantSuccess = (applicant) => {
    return {
        type: UPDATE_APPLICANT_SUCCESS,
        payload: applicant
    }
}
const updateApplicantFailure = (error) => {
    return {
        type: UPDATE_APPLICANT_FAILURE,
        payload: error
    }
}

export const editApplicant = (id) => {
    return {
        type: EDIT_APPLICANT,
        payload: id
    }
}

export const applicantInfo = (id) => {
    return {
        type: APPLICANT_INFO,
        payload: id
    }
}

export const removeApplicantRequest = () => {
    return {
        type: REMOVE_APPLICANT_REQUEST,
    }
}

export const removeApplicantSuccess = (id) => {
    return {
        type: REMOVE_APPLICANT_SUCCESS,
        payload: id
    }
}

export const removeApplicantFailure = (error) => {
    return {
        type: REMOVE_APPLICANT_FAILURE,
        payload: error
    }
}

export const fetchApplicants = () => {
    return (dispatch) => {

        dispatch(fetchApplicantsRequest)

        axios.get(settings.rootUrl + 'api/v1/applicants', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const applicants = response.data
            dispatch(fetchApplicantsSuccess(applicants))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchApplicantsFailure(errorMsg))
        })
    }
}



export const postApplicant = (applicant) => {
    return (dispatch) => {

        dispatch(postApplicantRequest)

        axios.post(settings.rootUrl + 'api/v1/applicants', JSON.stringify({
            first_name: applicant.first_name,
            last_name: applicant.last_name,
            patronymic: applicant.patronymic,
            home_phone: applicant.home_phone,
            mobile_phone: applicant.mobile_phone,
            birth_date: applicant.birth_date,
            photo_url: applicant.photo_url,
            notes: applicant.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postApplicantSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(postApplicantFailure(errorMsg))
        })
    }
}


export const updateApplicant = (applicant) => {
    return (dispatch) => {

        dispatch(updateApplicantRequest)

        axios.put(settings.rootUrl + 'api/v1/applicants/' + applicant.id, JSON.stringify({
            first_name: applicant.first_name,
            last_name: applicant.last_name,
            patronymic: applicant.patronymic,
            home_phone: applicant.home_phone,
            mobile_phone: applicant.mobile_phone,
            birth_date: applicant.birth_date,
            photo_url: applicant.photo_url,
            notes: applicant.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateApplicantSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(updateApplicantFailure(errorMsg))
        })
    }
}

export const removeApplicant = (id) => {
    return (dispatch) => {

        dispatch(removeApplicantRequest)

        axios.delete(settings.rootUrl + 'api/v1/applicants/' + id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeApplicantSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(removeApplicantFailure(errorMsg))
        })
    }
}
