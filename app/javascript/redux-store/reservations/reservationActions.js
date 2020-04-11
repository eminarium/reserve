import axios from 'axios'
import settings from '../settings'

import { 
    FETCH_RESERVATIONS_REQUEST,
    FETCH_RESERVATIONS_SUCCESS,
    FETCH_RESERVATIONS_FAILURE,

    POST_RESERVATION_REQUEST,
    POST_RESERVATION_SUCCESS,
    POST_RESERVATION_FAILURE,

    UPDATE_RESERVATION_REQUEST,
    UPDATE_RESERVATION_SUCCESS,
    UPDATE_RESERVATION_FAILURE,

    EDIT_RESERVATION,
    RESERVATION_INFO,

    REMOVE_RESERVATION_REQUEST,
    REMOVE_RESERVATION_SUCCESS,
    REMOVE_RESERVATION_FAILURE

} from "./reservationTypes"

const fetchReservationsRequest = () => {
    return {
        type: FETCH_RESERVATIONS_REQUEST
    }
}

const fetchReservationsSuccess = (reservations) => {
    return {
        type: FETCH_RESERVATIONS_SUCCESS,
        payload: reservations
    }
}

const fetchReservationsFailure = (error) => {
    return {
        type: FETCH_RESERVATIONS_FAILURE,
        payload: error
    }
}

const postReservationRequest = () => {
    return {
        type: POST_RESERVATION_REQUEST,
    }
}

const postReservationSuccess = (reservation) => {
    return {
        type: POST_RESERVATION_SUCCESS,
        payload: reservation
    }
}
const postReservationFailure = (error) => {
    return {
        type: POST_RESERVATION_FAILURE,
        payload: error
    }
}

const updateReservationRequest = () => {
    return {
        type: UPDATE_RESERVATION_REQUEST,
    }
}

const updateReservationSuccess = (reservation) => {
    return {
        type: UPDATE_RESERVATION_SUCCESS,
        payload: reservation
    }
}
const updateReservationFailure = (error) => {
    return {
        type: UPDATE_RESERVATION_FAILURE,
        payload: error
    }
}

export const editReservation = (id) => {
    return {
        type: EDIT_RESERVATION,
        payload: id
    }
}

export const reservationInfo = (id) => {
    return {
        type: RESERVATION_INFO,
        payload: id
    }
}

export const removeReservationRequest = () => {
    return {
        type: REMOVE_RESERVATION_REQUEST,
    }
}

export const removeReservationSuccess = (id) => {
    return {
        type: REMOVE_RESERVATION_SUCCESS,
        payload: id
    }
}

export const removeReservationFailure = (error) => {
    return {
        type: REMOVE_RESERVATION_FAILURE,
        payload: error
    }
}

export const fetchReservations = () => {
    return (dispatch) => {

        dispatch(fetchReservationsRequest)

        axios.get(settings.rootUrl + 'api/v1/reservations', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const reservations = response.data
            dispatch(fetchReservationsSuccess(reservations))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchReservationsFailure(errorMsg))
        })
    }
}

export const postReservation = (reservation) => {
    return (dispatch) => {

        dispatch(postReservationRequest)

        axios.post(settings.rootUrl + 'api/v1/reservations', JSON.stringify({
            title: reservation.title,
            level: reservation.level,
            subject_category_id: reservation.subject_category_id,
            language_id: reservation.language_id,
            passing_points: reservation.passing_points,
            notes: reservation.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postReservationSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(postReservationFailure(errorMsg))
        })
    }
}


export const updateReservation = (reservation) => {
    return (dispatch) => {

        dispatch(updateReservationRequest)

        axios.put(settings.rootUrl + 'api/v1/reservations/' + reservation.id, JSON.stringify({
            title: reservation.title,
            level: reservation.level,
            subject_category_id: reservation.subject_category_id,
            language_id: reservation.language_id,
            passing_points: reservation.passing_points,
            notes: reservation.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateReservationSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(updateReservationFailure(errorMsg))
        })
    }
}

export const removeReservation = (id) => {
    return (dispatch) => {

        dispatch(removeReservationRequest)

        axios.delete(settings.rootUrl + 'api/v1/reservations/'+id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeReservationSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.response.message
            dispatch(removeReservationFailure(errorMsg))
        })
    }
}