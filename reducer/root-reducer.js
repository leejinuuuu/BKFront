import {HYDRATE} from 'next-redux-wrapper';
import {combineReducers} from 'redux';

import userReducer from './user-reducer';
import modalReducer from "./modal-reducer";
import postReducer from "./post-reducer";

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
                userReducer,
                modalReducer,
                postReducer
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;