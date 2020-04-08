import axios from 'axios'

import { 
    FETCH_SHIFTS_REQUEST,
    FETCH_SHIFTS_SUCCESS,
    FETCH_SHIFTS_FAILURE,

    POST_SHIFT_REQUEST,
    POST_SHIFT_SUCCESS,
    POST_SHIFT_FAILURE,

    UPDATE_SHIFT_REQUEST,
    UPDATE_SHIFT_SUCCESS,
    UPDATE_SHIFT_FAILURE,

    EDIT_SHIFT,
    SHIFT_INFO,

    REMOVE_SHIFT_REQUEST,
    REMOVE_SHIFT_SUCCESS,
    REMOVE_SHIFT_FAILURE

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



const postShiftRequest = () => {
    return {
        type: POST_SHIFT_REQUEST,
    }
}

const postShiftSuccess = (shift) => {
    return {
        type: POST_SHIFT_SUCCESS,
        payload: shift
    }
}
const postShiftFailure = (error) => {
    return {
        type: POST_SHIFT_FAILURE,
        payload: error
    }
}

const updateShiftRequest = () => {
    return {
        type: UPDATE_SHIFT_REQUEST,
    }
}

const updateShiftSuccess = (shift) => {
    return {
        type: UPDATE_SHIFT_SUCCESS,
        payload: shift
    }
}
const updateShiftFailure = (error) => {
    return {
        type: UPDATE_SHIFT_FAILURE,
        payload: error
    }
}

export const editShift = (id) => {
    return {
        type: EDIT_SHIFT,
        payload: id
    }
}

export const shiftInfo = (id) => {
    return {
        type: SHIFT_INFO,
        payload: id
    }
}

export const removeShiftRequest = () => {
    return {
        type: REMOVE_SHIFT_REQUEST,
    }
}

export const removeShiftSuccess = (id) => {
    return {
        type: REMOVE_SHIFT_SUCCESS,
        payload: id
    }
}

export const removeShiftFailure = (error) => {
    return {
        type: REMOVE_SHIFT_FAILURE,
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



export const postShift = (shift) => {
    return (dispatch) => {

        dispatch(postShiftRequest)

        axios.post('api/v1/shifts', JSON.stringify({
            title: shift.title,
            start_time: shift.start_time,
            end_time: shift.end_time,
            notes: shift.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(postShiftSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(postShiftFailure(errorMsg))
        })
    }
}


export const updateShift = (shift) => {
    return (dispatch) => {

        dispatch(updateShiftRequest)

        axios.put('api/v1/shifts/' + shift.id, JSON.stringify({
            title: shift.title,
            start_time: shift.start_time,
            end_time: shift.end_time,
            notes: shift.notes
        }), {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            //console.log(response.data)
            dispatch(updateShiftSuccess(response.data))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(updateShiftFailure(errorMsg))
        })
    }
}

export const removeShift = (id) => {
    return (dispatch) => {

        dispatch(removeShiftRequest)

        axios.delete('api/v1/shifts/' + id, {
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('Token')
            }
        })
        .then(response => {
            dispatch(removeShiftSuccess(id))
        })
        .catch(error => {
            if (error.response.status === 401) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('Token');
            }

            console.log(error.error)
            const errorMsg = error.message
            dispatch(removeShiftFailure(errorMsg))
        })
    }
}
