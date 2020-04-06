import { 
    FETCH_SHIFTS_REQUEST, 
    FETCH_SHIFTS_SUCCESS, 
    FETCH_SHIFTS_FAILURE 
} from "./shiftTypes"

const initialState = {
    loading: false,
    shifts: [],
    error: ''
}

const shiftReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SHIFTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SHIFTS_SUCCESS:
            return {
                loading: false,
                shifts: action.payload,
                error: ''
            }
        case FETCH_SHIFTS_FAILURE:
            return {
                loading: false,
                shifts: [],
                error: action.payload
            }
        default: return state
    }
}

export default shiftReducer