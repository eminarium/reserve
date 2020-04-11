import axios from 'axios'
import settings from '../settings'

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

const fetchLanguagesRequest = () => {
    return {
        type: FETCH_LANGUAGES_REQUEST
    }
}

const fetchLanguagesSuccess = (languages) => {
    return {
        type: FETCH_LANGUAGES_SUCCESS,
        payload: languages
    }
}

const fetchLanguagesFailure = (error) => {
    return {
        type: FETCH_LANGUAGES_FAILURE,
        payload: error
    }
}

const postLanguageRequest = () => {
    return {
        type: POST_LANGUAGE_REQUEST,
    }
}

const postLanguageSuccess = (language) => {
    return {
        type: POST_LANGUAGE_SUCCESS,
        payload: language
    }
}
const postLanguageFailure = (error) => {
    return {
        type: POST_LANGUAGE_FAILURE,
        payload: error
    }
}

const updateLanguageRequest = () => {
    return {
        type: UPDATE_LANGUAGE_REQUEST,
    }
}

const updateLanguageSuccess = (language) => {
    return {
        type: UPDATE_LANGUAGE_SUCCESS,
        payload: language
    }
}
const updateLanguageFailure = (error) => {
    return {
        type: UPDATE_LANGUAGE_FAILURE,
        payload: error
    }
}

export const editLanguage = (id) => {
    return {
        type: EDIT_LANGUAGE,
        payload: id
    }
}

export const languageInfo = (id) => {
    return {
        type: LANGUAGE_INFO,
        payload: id
    }
}

export const removeLanguageRequest = () => {
    return {
        type: REMOVE_LANGUAGE_REQUEST,
    }
}

export const removeLanguageSuccess = (id) => {
    return {
        type: REMOVE_LANGUAGE_SUCCESS,
        payload: id
    }
}

export const removeLanguageFailure = (error) => {
    return {
        type: REMOVE_LANGUAGE_FAILURE,
        payload: error
    }
}

export const fetchLanguages = () => {
    return (dispatch) => {

        dispatch(fetchLanguagesRequest)

        axios.get(settings.rootUrl + 'api/v1/languages', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const languages = response.data
            dispatch(fetchLanguagesSuccess(languages))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchLanguagesFailure(errorMsg))
        })
    }
}

export const postLanguage = (language) => {
    return (dispatch) => {

        dispatch(postLanguageRequest)

        axios.post(settings.rootUrl + 'api/v1/languages', JSON.stringify({
            title: language.title,
            notes: language.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postLanguageSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(postLanguageFailure(errorMsg))
        })
    }
}


export const updateLanguage = (language) => {
    return (dispatch) => {

        dispatch(updateLanguageRequest)

        axios.put(settings.rootUrl + 'api/v1/languages/'+language.id, JSON.stringify({
            title: language.title,
            notes: language.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateLanguageSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(updateLanguageFailure(errorMsg))
        })
    }
}

export const removeLanguage = (id) => {
    return (dispatch) => {

        dispatch(removeLanguageRequest)

        axios.delete(settings.rootUrl + 'api/v1/languages/'+id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeLanguageSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(removeLanguageFailure(errorMsg))
        })
    }
}
