import axios from 'axios'
import settings from '../settings'
import { push } from 'connected-react-router'

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

const fetchSearchApplicantsRequest = () => {
    return {
        type: FETCH_SEARCH_APPLICANTS_REQUEST
    }
}

const fetchSearchApplicantsSuccess = (applicants) => {
    return {
        type: FETCH_SEARCH_APPLICANTS_SUCCESS,
        payload: applicants
    }
}

const fetchSearchApplicantsFailure = (error) => {
    return {
        type: FETCH_SEARCH_APPLICANTS_FAILURE,
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

export const emptyApplicants = () => {
    return {
        type: EMPTY_APPLICANTS
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

export const fetchApplicants = (page = 0) => {
    return (dispatch) => {

        dispatch(fetchApplicantsRequest)

        var pageString = (page != 0) ? ("/?page=" + page) : ""

        axios.get(settings.rootUrl + 'api/v1/applicants' + pageString, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
            //.then(response => response.json())
            .then(response => {
                const res = response.data
                dispatch(fetchApplicantsSuccess(res))
            })
            .catch(error => {
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


export const fetchSearchApplicants = (search_params) => {
    return (dispatch) => {

        dispatch(fetchSearchApplicantsRequest)

        axios.get(settings.rootUrl + 'api/v1/applicants?first_name=' + search_params.first_name + '&last_name=' + search_params.last_name + '&patronymic=' + search_params.patronymic, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
            //.then(response => response.json())
            .then(response => {
                const applicants = response.data
                dispatch(fetchSearchApplicantsSuccess(applicants))
            })
            .catch(error => {
                if (error.response.status === 401) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('Token');
                }

                console.log(error.error)
                const errorMsg = error.message
                dispatch(fetchSearchApplicantsFailure(errorMsg))
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
            age: applicant.age,
            school_grade: applicant.school_grade,
            notes: applicant.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
            .then(response => {
                var applicant = response.data
                console.log(applicant)
                dispatch(postApplicantSuccess(applicant))
                dispatch(applicantInfo(applicant.id))
                dispatch(push('/applicants/' + applicant.id))
                //browserHistory.push('/applicants/'+response.data)
            }
            )
            .catch(error => {
                //if (error.response.status === 401) {
                //    localStorage.removeItem('currentUser');
                //    localStorage.removeItem('Token');
                //}

                //console.log(error.error)
                //const errorMsg = error.response.message
                //dispatch(postApplicantFailure(errorMsg))
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
            age: applicant.age,
            school_grade: applicant.school_grade,
            notes: applicant.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
            .then(response => {
                console.log(response)
                dispatch(updateApplicantSuccess(response.data))
                dispatch(push('/applicants/' + response.data.id))
                dispatch(applicantInfo(response.data.id))
                //dispatch(push('/applicants/'+applicant.id))
                //var applicant = response.data
                //console.log(applicant)
                //dispatch(updateApplicantSuccess(applicant))
                //dispatch(applicantInfo(applicant.id))
                //dispatch(push('/applicants/' + applicant.id))            
                //var applicant = response.data
                //console.log(response.data)
                //dispatch(push('/applicants/' + response.data.id))
            })
            .catch(error => {
                /*
                if (error.response.status === 401) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('Token');
                }
    
                console.log(error.error)
                const errorMsg = error.response.message
                dispatch(updateApplicantFailure(errorMsg))
                */
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
