import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
//import rootReducer from './rootReducer'
import createRootReducer from './rootReducer'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                logger,
                thunk
            ),
        ),
    )

    return store
}

/*
const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
*/