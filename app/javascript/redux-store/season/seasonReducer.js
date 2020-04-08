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

const initialState = {
    loading: false,
    seasons: [],
    error: '',
    editingSeasonId: '',
    currentSeason: ''
}

const seasonReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SEASONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case FETCH_SEASONS_SUCCESS:
            return {
                loading: false,
                seasons: action.payload,
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case FETCH_SEASONS_FAILURE:
            return {
                loading: false,
                seasons: [],
                error: action.payload,
                editingSeasonId: '',
                currentSeason: ''
            }

        case POST_SEASON_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case POST_SEASON_SUCCESS:
            return {
                loading: false,
                seasons: state.seasons.concat(action.payload),
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case POST_SEASON_FAILURE:
            return {
                loading: false,
                seasons: state.seasons,
                error: action.payload,
                editingSeasonId: '',
                currentSeason: ''
            }

        case UPDATE_SEASON_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case UPDATE_SEASON_SUCCESS:
            return {
                loading: false,
                seasons: [...state.seasons.filter(season => (season.id != action.payload.id)), action.payload],
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case UPDATE_SEASON_FAILURE:
            return {
                loading: false,
                seasons: state.seasons,
                error: action.payload,
                editingSeasonId: '',
                currentSeason: ''
            }

        case EDIT_SEASON:
            return {
                loading: false,
                seasons: state.seasons,
                error: '',
                editingSeasonId: action.payload,
                currentSeason: ''
            }

        case SEASON_INFO:
            return {
                loading: false,
                seasons: state.seasons,
                error: '',
                editingSeasonId: '',
                currentSeason: state.seasons.find(season => season.id === action.payload)
            }                

        case REMOVE_SEASON_REQUEST:
            return {
                loading: true,
                seasons: state.seasons,
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case REMOVE_SEASON_SUCCESS:
            return {
                loading: false,
                seasons: state.seasons.filter(season => (season.id != action.payload)),
                error: '',
                editingSeasonId: '',
                currentSeason: ''
            }
        case REMOVE_SEASON_FAILURE:
            return {
                loading: false,
                seasons: state.seasons,
                error: action.payload,
                editingSeasonId: '',
                currentSeason: ''
            }

        default: return state
    }
}

export default seasonReducer