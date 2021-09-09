import {HYDRATE} from 'next-redux-wrapper';
import {combineReducers} from 'redux';

import userReducer from './user-reducer';

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return {
                ...state,
                ...action.payload,
            };
        default: {
            const combineReducer = combineReducers({
                userReducer
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;