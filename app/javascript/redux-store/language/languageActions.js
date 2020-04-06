import axios from 'axios'

import { 
    FETCH_LANGUAGES_REQUEST,
    FETCH_LANGUAGES_SUCCESS,
    FETCH_LANGUAGES_FAILURE,

    POST_LANGUAGE_REQUEST,
    POST_LANGUAGE_SUCCESS,
    POST_LANGUAGE_FAILURE

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

export const fetchLanguages = () => {
    return (dispatch) => {

        dispatch(fetchLanguagesRequest)

        axios.get('api/v1/languages', {
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

        axios.post('api/v1/languages', JSON.stringify({
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
            dispatch(postLanguageSuccess(language))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(postLanguageFailure(errorMsg))
        })
    }
}