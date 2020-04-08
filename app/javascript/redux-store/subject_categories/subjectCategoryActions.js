import axios from 'axios'

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

const fetchSubjectCategoriesRequest = () => {
    return {
        type: FETCH_SUBJECT_CATEGORIES_REQUEST
    }
}

const fetchSubjectCategoriesSuccess = (subject_categories) => {
    return {
        type: FETCH_SUBJECT_CATEGORIES_SUCCESS,
        payload: subject_categories
    }
}

const fetchSubjectCategoriesFailure = (error) => {
    return {
        type: FETCH_SUBJECT_CATEGORIES_FAILURE,
        payload: error
    }
}

const postSubjectCategoryRequest = () => {
    return {
        type: POST_SUBJECT_CATEGORY_REQUEST,
    }
}

const postSubjectCategorySuccess = (subject_category) => {
    return {
        type: POST_SUBJECT_CATEGORY_SUCCESS,
        payload: subject_category
    }
}
const postSubjectCategoryFailure = (error) => {
    return {
        type: POST_SUBJECT_CATEGORY_FAILURE,
        payload: error
    }
}

const updateSubjectCategoryRequest = () => {
    return {
        type: UPDATE_SUBJECT_CATEGORY_REQUEST,
    }
}

const updateSubjectCategorySuccess = (subject_category) => {
    return {
        type: UPDATE_SUBJECT_CATEGORY_SUCCESS,
        payload: subject_category
    }
}
const updateSubjectCategoryFailure = (error) => {
    return {
        type: UPDATE_SUBJECT_CATEGORY_FAILURE,
        payload: error
    }
}

export const editSubjectCategory = (id) => {
    return {
        type: EDIT_SUBJECT_CATEGORY,
        payload: id
    }
}

export const subjectCategoryInfo = (id) => {
    return {
        type: SUBJECT_CATEGORY_INFO,
        payload: id
    }
}

export const removeSubjectCategoryRequest = () => {
    return {
        type: REMOVE_SUBJECT_CATEGORY_REQUEST,
    }
}

export const removeSubjectCategorySuccess = (id) => {
    return {
        type: REMOVE_SUBJECT_CATEGORY_SUCCESS,
        payload: id
    }
}

export const removeSubjectCategoryFailure = (error) => {
    return {
        type: REMOVE_SUBJECT_CATEGORY_FAILURE,
        payload: error
    }
}

export const fetchSubjectCategories = () => {
    return (dispatch) => {

        dispatch(fetchSubjectCategoriesRequest)

        axios.get('api/v1/subject_categories', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const subject_categories = response.data
            dispatch(fetchSubjectCategoriesSuccess(subject_categories))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchSubjectCategoriesFailure(errorMsg))
        })
    }
}

export const postSubjectCategory = (subject_category) => {
    return (dispatch) => {

        dispatch(postSubjectCategoryRequest)

        axios.post('api/v1/subject_categories', JSON.stringify({
            title: subject_category.title,
            is_kids: subject_category.is_kids,
            notes: subject_category.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postSubjectCategorySuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(postSubjectCategoryFailure(errorMsg))
        })
    }
}


export const updateSubjectCategory = (subject_category) => {
    return (dispatch) => {

        dispatch(updateSubjectCategoryRequest)

        axios.put('api/v1/subject_categories/' + subject_category.id, JSON.stringify({
            title: subject_category.title,
            is_kids: subject_category.is_kids,
            notes: subject_category.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateSubjectCategorySuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(updateSubjectCategoryFailure(errorMsg))
        })
    }
}

export const removeSubjectCategory = (id) => {
    return (dispatch) => {

        dispatch(removeSubjectCategoryRequest)

        axios.delete('api/v1/subject_categories/'+id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeSubjectCategorySuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(removeSubjectCategoryFailure(errorMsg))
        })
    }
}
