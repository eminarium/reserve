import axios from 'axios'

import { 
    FETCH_SHIFTS_REQUEST,
    FETCH_SHIFTS_SUCCESS,
    FETCH_SHIFTS_FAILURE
} from "./shiftTypes"

const fetchShiftsRequest = () => {
    return {
        type: FETCH_SHIFTS_REQUEST
    }
}

const fetchShiftsSuccess = (shifts) => {
    return {
        type: FETCH_SHIFTS_SUCCESS,
        payload: shifts
    }
}

const fetchShiftsFailure = (error) => {
    return {
        type: FETCH_SHIFTS_FAILURE,
        payload: error
    }
}

export const fetchShifts = () => {
    return (dispatch) => {

        dispatch(fetchShiftsRequest)

        axios.get('api/v1/shifts', {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        //.then(response => response.json())
        .then( response => {
            const shifts = response.data
            dispatch(fetchShiftsSuccess(shifts))
        })
        .catch( error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(fetchShiftsFailure(errorMsg))
        })
    }
}