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

const initialState = {
    loading: false,
    reservations: [],
    error: '',
    editingReservationId: '',
    currentReservation: ''
}

const reservationReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_RESERVATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case FETCH_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload,
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case FETCH_RESERVATIONS_FAILURE:
            return {
                loading: false,
                reservations: state.reservations,
                error: action.payload,
                editingReservationId: '',
                currentReservation: ''
            }

        case POST_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case POST_RESERVATION_SUCCESS:
            return {
                loading: false,
                reservations: state.reservations.concat(action.payload),
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case POST_RESERVATION_FAILURE:
            return {
                loading: false,
                reservations: state.reservations,
                error: action.payload,
                editingReservationId: '',
                currentReservation: ''
            }

        case UPDATE_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case UPDATE_RESERVATION_SUCCESS:
            return {
                loading: false,
                reservations: [...state.reservations.filter(reservation => (reservation.id != action.payload.id)), action.payload],
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case UPDATE_RESERVATION_FAILURE:
            return {
                loading: false,
                reservations: state.reservations,
                error: action.payload,
                editingReservationId: '',
                currentReservation: ''
            }

        case EDIT_RESERVATION:
            return {
                loading: false,
                reservations: state.reservations,
                error: '',
                editingReservationId: action.payload,
                currentReservation: ''
            }


        case RESERVATION_INFO:
            return {
                loading: false,
                reservations: state.reservations,
                error: '',
                editingReservationId: '',
                currentReservation: state.reservations.find(reservation => reservation.id === action.payload)
            }            
        
        case REMOVE_RESERVATION_REQUEST:
            return {
                loading: true,
                reservations: state.reservations,
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case REMOVE_RESERVATION_SUCCESS:
            return {
                loading: false,
                reservations: state.reservations.filter(reservation => (reservation.id != action.payload)),
                error: '',
                editingReservationId: '',
                currentReservation: ''
            }
        case REMOVE_RESERVATION_FAILURE:
            return {
                loading: false,
                reservations: state.reservations,
                error: action.payload,
                editingReservationId: '',
                currentReservation: ''
            }

        default: return state
    }
}

export default reservationReducer