import axios from 'axios'

import { 
    FETCH_SEASONS_REQUEST,
    FETCH_SEASONS_SUCCESS,
    FETCH_SEASONS_FAILURE,

    POST_SEASON_REQUEST,
    POST_SEASON_SUCCESS,
    POST_SEASON_FAILURE,

    UPDATE_SEASON_REQUEST,
    UPDATE_SEASON_SUCCESS,
    UPDATE_SEASON_FAILURE,

    EDIT_SEASON,
    SEASON_INFO,

    REMOVE_SEASON_REQUEST,
    REMOVE_SEASON_SUCCESS,
    REMOVE_SEASON_FAILURE

} from "./seasonTypes"



const fetchSeasonsRequest = () => {
    return {
        type: FETCH_SEASONS_REQUEST
    }
}

const fetchSeasonsSuccess = (seasons) => {
    return {
        type: FETCH_SEASONS_SUCCESS,
        payload: seasons
    }
}

const fetchSeasonsFailure = (error) => {
    return {
        type: FETCH_SEASONS_FAILURE,
        payload: error
    }
}



const postSeasonRequest = () => {
    return {
        type: POST_SEASON_REQUEST,
    }
}

const postSeasonSuccess = (season) => {
    return {
        type: POST_SEASON_SUCCESS,
        payload: season
    }
}
const postSeasonFailure = (error) => {
    return {
        type: POST_SEASON_FAILURE,
        payload: error
    }
}

const updateSeasonRequest = () => {
    return {
        type: UPDATE_SEASON_REQUEST,
    }
}

const updateSeasonSuccess = (season) => {
    return {
        type: UPDATE_SEASON_SUCCESS,
        payload: season
    }
}
const updateSeasonFailure = (error) => {
    return {
        type: UPDATE_SEASON_FAILURE,
        payload: error
    }
}

export const editSeason = (id) => {
    return {
        type: EDIT_SEASON,
        payload: id
    }
}

export const seasonInfo = (id) => {
    return {
        type: SEASON_INFO,
        payload: id
    }
}

export const removeSeasonRequest = () => {
    return {
        type: REMOVE_SEASON_REQUEST,
    }
}

export const removeSeasonSuccess = (id) => {
    return {
        type: REMOVE_SEASON_SUCCESS,
        payload: id
    }
}

export const removeSeasonFailure = (error) => {
    return {
        type: REMOVE_SEASON_FAILURE,
        payload: error
    }
}

export const fetchSeasons = () => {
    return (dispatch) => {

        dispatch(fetchSeasonsRequest)

        axios.get('api/v1/seasons', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const seasons = response.data
            dispatch(fetchSeasonsSuccess(seasons))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchSeasonsFailure(errorMsg))
        })
    }
}



export const postSeason = (season) => {
    return (dispatch) => {

        dispatch(postSeasonRequest)

        axios.post('api/v1/seasons', JSON.stringify({
            title: season.title,
            order_no: season.order_no,
            start_date: season.start_date,
            end_date: season.end_date,
            return_deadline: season.return_deadline,
            notes: season.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postSeasonSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(postSeasonFailure(errorMsg))
        })
    }
}


export const updateSeason = (season) => {
    return (dispatch) => {

        dispatch(updateSeasonRequest)

        axios.put('api/v1/seasons/' + season.id, JSON.stringify({
            title: season.title,
            order_no: season.order_no,
            start_date: season.start_date,
            end_date: season.end_date,
            return_deadline: season.return_deadline,
            notes: season.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateSeasonSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(updateSeasonFailure(errorMsg))
        })
    }
}

export const removeSeason = (id) => {
    return (dispatch) => {

        dispatch(removeSeasonRequest)

        axios.delete('api/v1/seasons/' + id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeSeasonSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(removeSeasonFailure(errorMsg))
        })
    }
}
