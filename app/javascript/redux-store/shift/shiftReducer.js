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

const initialState = {
    loading: false,
    shifts: [],
    error: '',
    editingShiftId: '',
    currentShift: ''
}

const shiftReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SHIFTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case FETCH_SHIFTS_SUCCESS:
            return {
                loading: false,
                shifts: action.payload,
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case FETCH_SHIFTS_FAILURE:
            return {
                loading: false,
                shifts: state.shifts,
                error: action.payload,
                editingShiftId: '',
                currentShift: ''
            }

        case POST_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case POST_SHIFT_SUCCESS:
            return {
                loading: false,
                shifts: state.shifts.concat(action.payload),
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case POST_SHIFT_FAILURE:
            return {
                loading: false,
                shifts: state.shifts,
                error: action.payload,
                editingShiftId: '',
                currentShift: ''
            }

        case UPDATE_SHIFT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case UPDATE_SHIFT_SUCCESS:
            return {
                loading: false,
                shifts: [...state.shifts.filter(shift => (shift.id != action.payload.id)), action.payload],
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case UPDATE_SHIFT_FAILURE:
            return {
                loading: false,
                shifts: state.shifts,
                error: action.payload,
                editingShiftId: '',
                currentShift: ''
            }

        case EDIT_SHIFT:
            return {
                loading: false,
                shifts: state.shifts,
                error: '',
                editingShiftId: action.payload,
                currentShift: ''
            }

        case SHIFT_INFO:
            return {
                loading: false,
                shifts: state.shifts,
                error: '',
                editingShiftId: '',
                currentShift: state.shifts.find(shift => shift.id === action.payload)
            }                

        case REMOVE_SHIFT_REQUEST:
            return {
                loading: true,
                shifts: state.shifts,
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case REMOVE_SHIFT_SUCCESS:
            return {
                loading: false,
                shifts: state.shifts.filter(shift => (shift.id != action.payload)),
                error: '',
                editingShiftId: '',
                currentShift: ''
            }
        case REMOVE_SHIFT_FAILURE:
            return {
                loading: false,
                shifts: state.shifts,
                error: action.payload,
                editingShiftId: '',
                currentShift: ''
            }

        default: return state
    }
}

export default shiftReducer